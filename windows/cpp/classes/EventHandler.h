#ifndef EVENTHANDLER
#define EVENTHANDLER

class ConstructorInstance;

//#include "ConstructorInstance.h"
//#include "Painter.h"

class EventHandler : public ConstructorInstance
{
  private:
      unsigned char* img;
  public:

  	Json::Value root;   			    // will contains the root value after parsing.
  	Json::Reader reader; 			     // will read JSON data
  	Json::StyledWriter writer; 		// will write JSON data

  	int indexPoint;
    int lastBtnMouse, selectedSet;
  	bool flagRoundClick;
    Painter painter;

    explicit EventHandler(PP_Instance instance)
    : ConstructorInstance(instance)
    {
    	//glEnable(0x809D);
    	flagRoundClick = true;

        indexPoint = -1;
        lastBtnMouse = BTN_MOUSE_NONE;
        selectedSet = -1;
      	RequestInputEvents(PP_INPUTEVENT_CLASS_MOUSE | PP_INPUTEVENT_CLASS_WHEEL | PP_INPUTEVENT_CLASS_TOUCH);
      	RequestFilteringInputEvents(PP_INPUTEVENT_CLASS_KEYBOARD);
      	//printLog(converter.vectorToString(colors));
    }

    //EventHandler() {}

    GLubyte* getImg()
    {
      GLubyte* file;
      glReadPixels(0, 0, viewWidth, viewHeight, GL_RGB, GL_UNSIGNED_BYTE, file);
      return file;
    }

    void sendMessage(std::string action, Json::Value data)
    {
      Json::Value msg;
      msg["action"] = action;
      msg["data"] = data;
      std::string output = writer.write(msg);
      pp::Var var_reply;
      var_reply = pp::Var(output);
      PostMessage(var_reply);
    }

    std::vector<int> fillIndices(Json::Value val)
    {
      std::vector<int> indicesVector;
      int n = val.size();

      for (int i = 0; i < n; ++i)
        indicesVector.push_back(val[i].asInt());

      return indicesVector;
    }

    Color getColor(Json::Value val)
    {
      int n = val.size();

      float r = float(val[0].asInt()) / 255.00;
      float g = float(val[1].asInt()) / 255.00;
      float b = float(val[2].asInt()) / 255.00;

      return Color(r, g, b);
    }

  	virtual void HandleMessage(const pp::Var& varMessage)
  	{
	    if(!varMessage.is_string())
	      return; 

	    std::string message = varMessage.AsString();
	    reader.parse(message, root);
	    int idAction = converter.stringToInt(root.get("action", ACTION_NONE).asString());

	    printLog("idAction - " + converter.numberToString(idAction) + "\n" + "message = " + message);
	    switch(idAction)
	    {

        case ACTION_GET_IMG:
          {
            //printLog("befor init");
            Json::Value data;
            //img = getImg();
            //GLubyte* tmp = img;

            //int len = strlen(reinterpret_cast<const char*>(img));

            /*for(int i = 0; *(tmp + i) != 0; i++)
            {
              data["img"][i] = *(tmp + i);
            }*/

            //std::string dataImg(reinterpret_cast<char const*>(img));
            //data[0] = 1;
           // printLog("after init");
            //glReadBuffer(GL_FRONT);
            //glReadPixels(0, 0, viewWidth, viewHeight, GL_RGB, GL_UNSIGNED_BYTE, img);
            /*int n = 0;
            for (n; img != 0; ++n)
            {
               printLog("n = " + converter.numberToString(n));
            }
            printLog("n = " + converter.numberToString(n));
            if(img)
              printLog("NULL");
            else
              printLog("NOT NULL");*/

            //printLog(converter.numberToString(char(img[0])));
            //data["0"] = img[0];
            //sendMessage("img", data);
            //sendMessage(converter.numberToString(ACTION_GET_IMG), data);
            //printLog("afterSend");

            //free(img);
            break;
          }

	    	case ACTION_PAINT_GRID:
          {
                              printLog("gridPaint");
        			    						painter.Clear();
        			    						painter.setGridStep(root["0"].asInt());
                              //break;
                              painter.initPointGrid();
        			    						painter.paint();
        			    						break;
          }

        case ACTION_SET_COLOR:
          {
              //int indexBuffer = root["0"].asInt();
              //if(!indexBuffer) break;
              
              std::vector<int> indicesVector(fillIndices(root["0"]));

              Color col = getColor(root["1"]);

              painter.construction.setColorObject(indicesVector, col);

              sendMessage("objects", painter.construction.getJsonObjects());

              painter.paint();
              break;
          }

        case ACTION_SET_FLAG_ROUND:
          {
                                flagRoundClick = !flagRoundClick;
                                break;
          }

        case ACTION_SET_LINE_WIDTH:
          {
                                std::vector<int> selectedSet(fillIndices(root["0"]));
                                painter.setLineWidthForBuffers(selectedSet);

                                painter.paint();
                                break;
          }

	    	case ACTION_POLYGON:
          {
                                std::vector<int> indicesVector(fillIndices(root["0"]));
                                if(indicesVector.size() == 0)
                                  break;
                                int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, POLYGON_TYPE) - 1;
                                GLuint test = 4;

                                printLog("before tst - " + converter.numberToString(test));
                                   glGenBuffers(1, &test);
                                   printLog("after tst - " + converter.numberToString(test));


                                painter.buildPolygon(indexBuffer, indicesVector);
                                for (int i = 0; i < painter.buffers.size(); ++i)
                                  {
                                   printLog("before - " + converter.numberToString(painter.buffers.at(i)->indexBuffer));
                                   glGenBuffers(1, &painter.buffers[i]->indexBuffer);
                                   printLog("after - " + converter.numberToString(painter.buffers.at(i)->indexBuffer));
                                  }
                                painter.paint();
                                //sendMessage("indexBuffer", converter.numberToString(indexBuffer));
                                sendMessage("sets", painter.getJsonBuffers());
                                /*if( painter.checkConvexPolygon(indexBuffer))
                                  printLog("Polygon Converx");
                                else
                                  printLog("Polygon No Converx");*/
                                //printLog(converter.numberToString(painter.checkConvexPolygon(indexBuffer)));
                                break;
          }

        case ACTION_HIDE_SETS:
          {
                                std::vector<int> indicesBuffers(fillIndices(root["0"]));
                                //int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, POINT_TYPE) - 1;
                                painter.hideBuffers(indicesBuffers);
                                painter.paint();
                                break;
          }

        case ACTION_CURVE:
          {
                                std::vector<int> indicesVector(fillIndices(root["0"]));
                                if(indicesVector.size() < MIN_COUNT_SPLINE_POINT)
                                  break;
                                int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, CURVE_TYPE) - 1;
                                painter.buildSpline(indexBuffer, CURVE, indicesVector, root["1"].asInt());
                                painter.paint();
                                //sendMessage("indexBuffer", converter.numberToString(indexBuffer));
                                sendMessage("sets", painter.getJsonBuffers());
                                break;
          }

        case ACTION_CUBIC_SPLINE:
          {
                                  std::vector<int> indicesVector(fillIndices(root["0"]));
                                  if(indicesVector.size() < MIN_COUNT_SPLINE_POINT)
                                    break;
                                  int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, CUBIC_SPLINE_TYPE) - 1;
                                  painter.buildSpline(indexBuffer, CUBIC_SPLINE, indicesVector, root["1"].asInt());
                                  painter.paint();
                                  //sendMessage("indexBuffer", converter.numberToString(indexBuffer));
                                  sendMessage("sets", painter.getJsonBuffers());
                                  break;
          }
        
        case ACTION_AKIMA_SPLINE: 
          {
                                  std::vector<int> indicesVector(fillIndices(root["0"]));
                                  if(indicesVector.size() < MIN_COUNT_SPLINE_POINT)
                                    break;
                                  int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, AKIMA_SPLINE_TYPE) - 1;
                                  painter.buildSpline(indexBuffer, AKIMA_SPLINE, indicesVector, root["1"].asInt());
                                  painter.paint();
                                  //sendMessage("indexBuffer", converter.numberToString(indexBuffer));
                                  sendMessage("sets", painter.getJsonBuffers());
                                  break;
          }

        case ACTION_LIGHT_POINTS:
          {
                                std::vector<int> indicesVector(fillIndices(root["0"]));
                                //int indexBuffer = painter.addNewBuffers(GL_LINE_STRIP, POINT_TYPE) - 1;
                                painter.lightPoints(indicesVector);
                                painter.paint();
                                //sendMessage("InfoPoints", painter.getJsonBuffer(POINTS));
                                break;
          }

        case ACTION_DELETE_SET:
          {
              int indexBuffer = root["0"].asInt();
              if(!indexBuffer) break;

              printLog("indexBuffer = " + converter.numberToString(indexBuffer));
              //break;
              //printLog("Find - " + converter.numberToString(painter.searchBufferInObjects(indexBuffer)));
              painter.deleteSet(indexBuffer);
              painter.paint();
              sendMessage("sets", painter.getJsonBuffers());
              break;
          }

        case ACTION_CREATE_OBJECT:
        {
          //printLog("createObject");
          std::vector<int> indicesVector(fillIndices(root["0"]));
          if(indicesVector.size() == 0 && !painter.checkClosedFigure(indicesVector)) break;
          //printLog(converter.numberToString(root["1"][0].asInt()));
          //printLog(converter.numberToString(root["1"][1].asInt()));
          //printLog(converter.vectorToString(indicesVector));
          //if(!painter.checkClosedFigure(indicesVector))
          //  break;
          int type = root["1"][0].asInt();
          int price = root["1"][1].asInt();
          painter.construction.createObject(indicesVector, &painter, type, price);
          sendMessage("objects", painter.construction.getJsonObjects());        
          break;
        }

        case ACTION_DELETE_OBJECT:
        {
          int indexObject = root["0"].asInt();
          //if(!indexObject) break;

          painter.construction.deleteObject(indexObject);
          sendMessage("objects", painter.construction.getJsonObjects());
          break;
        }

        case ACTION_AREA_REC:   
          {
            int indexObject = root["0"].asInt();
            printLog("start area");
            printLog("Area = " + converter.numberToString(painter.construction.getObject(indexObject).getArea()));
            break;
          }

        case ACTION_ERROR_ANALYSIS:   
          {
            painter.construction.checkRestrictions();
            break;
          }

        case ACTION_NONE:       break;

	    	default:                break;
	    }
	}

    Point getPointGL(const pp::InputEvent &event)
    {
          pp::MouseInputEvent mouseEvent(event);
          pp::Point p(mouseEvent.GetPosition());
          Point pGL = converter.convertToGL(p);
          return pGL;
    }

    int defineMouseButton(const pp::InputEvent &event)
    {
          pp::MouseInputEvent mouseEvent(event);
          PP_InputEvent_MouseButton ppButton = mouseEvent.GetButton();

          switch (ppButton)
          {
            case PP_INPUTEVENT_MOUSEBUTTON_NONE:
              return BTN_MOUSE_NONE;

            case PP_INPUTEVENT_MOUSEBUTTON_LEFT:
              return BTN_MOUSE_LEFT;

            case PP_INPUTEVENT_MOUSEBUTTON_MIDDLE:
              return BTN_MOUSE_MIDDLE;

            case PP_INPUTEVENT_MOUSEBUTTON_RIGHT:
              return BTN_MOUSE_RIGHT;
          }
    }


    virtual bool HandleInputEvent (const pp::InputEvent &event)
    {
      switch(event.GetType())
      {
        case PP_INPUTEVENT_TYPE_WHEEL:
        {
          pp::WheelInputEvent wheel_event(event);
          
          if((int)wheel_event.GetTicks().y() == 1)
          {
            printLog("Up");
            painter.scaling(2.0);
          }
          else
          {
            painter.scaling(0.5);
            printLog("Down");
          }
          
          painter.paint();
          sendMessage("scale", painter.getScale());
          return true;
        }

        case  PP_INPUTEVENT_TYPE_MOUSEDOWN:
        {
              int btn = defineMouseButton(event);
              indexPoint = painter.searchPoint(EPS_MOVE_POINT, getPointGL(event));
              lastBtnMouse = btn;
              return true;
        }

        case PP_INPUTEVENT_TYPE_MOUSEMOVE:
        {
          Point pGL = getPointGL(event);

          if(indexPoint != -1 && lastBtnMouse == BTN_MOUSE_LEFT)
            painter.movePoint(indexPoint, pGL);
          painter.paint();

          return true;
        }

        case PP_INPUTEVENT_TYPE_MOUSEUP:
        {
          int btn = defineMouseButton(event);

          if(btn == BTN_MOUSE_LEFT)
          {
            if(indexPoint != -1)
            {
              indexPoint = -1;
              lastBtnMouse = BTN_MOUSE_NONE;
              //reBuildObjects(index, p);
              return true;
            }
            else
            {
              Point pGL;
              pGL = (flagRoundClick) ? pGL = converter.roundPoint(getPointGL(event), painter.getStepGridWidth(), painter.getStepGridHeight())
                        : pGL = getPointGL(event);
              painter.addPoint(POINTS, pGL);
            }
          }
          else if(btn == BTN_MOUSE_RIGHT)
          {
            //printLog("deletePoint - " + converter.numberToString(indexPoint));
            if(indexPoint != -1)
              painter.deletePoint(indexPoint);
          }

          painter.paint();
          sendMessage("points", painter.getJsonBuffer(POINTS));
          return true;
        }
       
       default:
        return false;
      }
    }

    void changeFlagRoundClick()
    {
    	flagRoundClick = !flagRoundClick;
    }

    void DidChangeFocus(bool focus)
    {
      if (focus == true) 
      {
        printLog("focus");
        printInfoAttrib();
      }
      else
      {
        printLog("lost");
      }
    }

	virtual void DidChangeView(const pp::View &view)
	{
		int32_t newWidth = view.GetRect().width();
		int32_t newHeight = view.GetRect().height();
	
		if(context.is_null())
		{
			if(!initGL(newWidth, newHeight))
			{
				printLog("Error iniGL in didChangeView");
				return;
			}

			MainLoop(0);
			//printLog("Atr color tut - " + converter.numberToString(getAtrColor()));
    		//printLog("Width - " + converter.numberToString(width));

			//square = Square(getProgram(), getAtrPos());
			painter = Painter(getProgram(), getAtrPos(), getAtrColor(), newWidth, newHeight, 25);
			converter.setSize(newWidth, newHeight);
		}
		else
		{
			// Resize the buffers to the new size of the module.
			int32_t result = context.ResizeBuffers(newWidth, newHeight);
			if(result < 0)
			{
				//std::string output = "Unable to resize buffers to " + std::to_string(newWidth) + "x" + std::to_string(newHeight) + "\n";
				//printLog("Unable to resize buffers to " + std::to_string(newWidth) + "x" + std::to_string(newHeight) + "\n");
				//fprintf(stderr, "Unable to resize buffers to %d x %d!\n", newWidth, newHeight);
				return;
			}
		}
		
		width = newWidth;
		height = newHeight;
		glViewport(0, 0, width, height);
	}
};
#endif