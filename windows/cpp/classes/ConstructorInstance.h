#ifndef CONSTINST
#define CONSTINST

using namespace std;

	const char fsSource[] = 
			"precision mediump float;\n"
			"varying vec4 color;"
			//"uniform vec4 color;\n"
		    "void main() {\n"
		    "  gl_FragColor = color;\n"
		    "}\n";

	const char vsSource[] =
		    "attribute vec4 aPosition;\n"
		    "attribute vec4 aColor;\n"
		    "varying vec4 color;"
		    "void main() {\n"
		    "	gl_Position = aPosition;\n"
		    "	gl_PointSize = 10.0;\n"
		    "	color = aColor;"
		    "}\n";

class ConstructorInstance : public pp::Instance
{
	public:	
		Converter converter;

		pp::Graphics3D context;

		GLuint program;
		GLuint gVertexShader;
		GLuint gFragmentShader;

		GLuint atrVertex;
		GLuint unifColor;

		char *gVShaderData;
		char *gFShaderData;
		int gLoadCnt;

		int viewWidth, viewHeight;

		int width, height;

		GLint  atrPos;
		GLint  atrColor;

		pp::Rect rect;
		pp::View view;

		pp::CompletionCallbackFactory<ConstructorInstance> callbackFactory;

		//EventHandler listener;

		explicit ConstructorInstance(PP_Instance instance)
		: pp::Instance(instance),
        callbackFactory(this),
        width(0),
        height(0),
        gFragmentShader(0),
        gVertexShader(0),
        program(0),
        gVShaderData(NULL),
        gFShaderData(NULL)
        {}

  		virtual ~ConstructorInstance() {}

  		GLuint getProgram() {return program;}
  		GLint getAtrPos() {return atrPos;}
  		GLint getAtrColor() {return atrColor;}
  		int getWidth() {return width;}
  		int getHeight() {return height;}

		GLuint linkProgram(GLuint fragShader, GLuint vertShader)
		{
		  GLuint program = glCreateProgram();
		  glAttachShader(program, fragShader);
		  glAttachShader(program, vertShader);
		  glLinkProgram(program);

		  GLint linkStatus;
		  glGetProgramiv(program, GL_LINK_STATUS, &linkStatus);
		  if (linkStatus != GL_TRUE)
		  {
		    // Program failed to link, let's see what the error is.
		    char buffer[4096];
		    GLsizei length;
		    glGetProgramInfoLog(program, sizeof(buffer), &length, &buffer[0]);
		    printLog("Program failed to link: " + std::string(buffer));
		    return 0;
		  }

		  return program;
		}

		GLuint compileShader(GLenum type, const char* data)
		{
		  GLuint shader = glCreateShader(type);
		  glShaderSource(shader, 1, &data, NULL);
		  glCompileShader(shader);

		  GLint compileStatus;
		  glGetShaderiv(shader, GL_COMPILE_STATUS, &compileStatus);
		  if (compileStatus != GL_TRUE)
		  {
		    char buffer[1024];
		    GLsizei length;
		    glGetShaderInfoLog(shader, sizeof(buffer), &length, &buffer[0]);
		    printLog("Shader failed to compile: " + std::string(buffer));
		    return 0;
		  }

		  return shader;
		}

		/*void initProgram( void )
		{
		  initShaders();
		  //initBuffers();
		}*/

		void initShaders()
		{
		    gFragmentShader = compileShader(GL_FRAGMENT_SHADER, fsSource);
		    if (!gFragmentShader)
		      return;

		    gVertexShader = compileShader(GL_VERTEX_SHADER, vsSource);
		    if (!gVertexShader)
		      return;

		    program = linkProgram(gFragmentShader, gVertexShader);
		    if (!program)
		      return;


			/*const char* unifName = "color";
			atrColor = glGetUniformLocation(program, unifName);
			if(atrColor == -1)
			{
				printLog("could not bind attrib " + std::string(unifName));
			    return;
			}*/

		    const char* attrName = "aPosition";
			atrPos = glGetAttribLocation(program, attrName);
			if(atrPos == -1)
			{
				printLog("could not bind attrib " + std::string(attrName));
			    return;
			}

		    const char* attrColor = "aColor";
			atrColor = glGetAttribLocation(program, attrColor);
			if(atrColor == -1)
			{
				printLog("could not bind attrib " + std::string(attrColor));
			    return;
			}
	  	}

  		bool initGL(int32_t newWidth, int32_t newHeight)
  		{
		  if (!glInitializePPAPI(pp::Module::Get()->get_browser_interface()))
		  {
		    printLog("Unable to initialize GL PPAPI!\n");
		    return false;
		  }

	      //printLog("Unable to resize buffers to " + std::to_string(newWidth) + "x" + std::to_string(newHeight) + "\n");

		  const int32_t attribList[] = {
		    PP_GRAPHICS3DATTRIB_ALPHA_SIZE, 8,
		    PP_GRAPHICS3DATTRIB_DEPTH_SIZE, 24,
		    PP_GRAPHICS3DATTRIB_STENCIL_SIZE, 8,
		    PP_GRAPHICS3DATTRIB_SAMPLES, 20,
    		PP_GRAPHICS3DATTRIB_SAMPLE_BUFFERS, 20,
		    PP_GRAPHICS3DATTRIB_WIDTH, newWidth,
		    PP_GRAPHICS3DATTRIB_HEIGHT, newHeight,
		    PP_GRAPHICS3DATTRIB_NONE
		  };

		  context = pp::Graphics3D(this, attribList);
		  if (!BindGraphics(context))
		  {
		    printLog("Unable to initialize GL PPAPI!");
		    context = pp::Graphics3D();
		    glSetCurrentContextPPAPI(0);
		    return false;
		  }

		  glSetCurrentContextPPAPI(context.pp_resource());

		  // init FreeType library

		  /*FT_Library ft;

		  if(FT_Init_FreeType(&ft)) 
		  	printLog("Could not init freetype library\n");
		  else
		  	printLog("FreeType library inited successfully!");*/

		  return true;
		}

		virtual bool init(uint32_t argc, const char* argn[], const char* argv[])
		{
			return true;
		}

		void printLog(std::string msg)
		{
			this->LogToConsole(PP_LOGLEVEL_ERROR, pp::Var(msg));
		}

		void printInfoAttrib()
		{
			printLog("Start");
  			printLog("Prog start - " + converter.numberToString(program));
    		printLog("Atr pos - " + converter.numberToString(atrPos));
    		printLog("Atr color - " + converter.numberToString(atrColor));
		}

		void MainLoop(int32_t)
  		{
  			if(gLoadCnt == 0)
  			{
  				//initProgram();
  				initShaders();
  				gLoadCnt++;
  				MainLoop(0);
  				printInfoAttrib();
  			}
  			else
  			{
	    		context.SwapBuffers(callbackFactory.NewCallback(&ConstructorInstance::MainLoop));
  			}
  			//glEnable( GL_POINT_SMOOTH );
  			//glEnable( 0x0B10 );
  			//glEnable( 0x0B20 );
  			//glEnable( 0x0B41 );
  			//glEnable( GL_POLYGON_SMOOTH );
  			//glEnable(GL_BLEND);
			//glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
  		}
};
#endif