class Painter
{
private:
	Converter converter;

	GLuint program;
	GLint atrPos;
	GLint atrColor;

	Splines* sp;

	//std::vector<Color> colors;
	std::vector<Buffer> buffers;
	//std::vector< Object > objects;

	int width, height;
	int gridStep;
	float stepSpline;
	float scale;
	float stepGridHeight, stepGridWidth;

	bool flagReBuild;

	void initBuffers(int indexBuffer);
	void clearBuffer(int indexBuffer);

public:
	Painter() {};
	Painter(GLuint programValue, GLint atrPosValue, GLint atrColorValue, int width, int height, int gridStepValue);
	~Painter() {};

	Construction construction;

	//virtual void Paint(){};
	void buildPolygon(int indexBuffer, std::vector<int> indices);
	void buildSpline(int indexBuffer, int spline, std::vector<int> indices, int tag);
	void paint();
	void Clear();
	void lightPoints(std::vector<int> indices);
	
	void initPointGrid();
	void setGridStep(int size);
	int getGridStep();
	float getStepGridHeight();
	float getStepGridWidth();
	void addIndex(int indexBuffer, int indexStart, int indexEnd);
	void fillIndicesPolygon(int indexBuffer);
	void initBaseIndices(int indexBuffer, std::vector<int> indices);
	void reBuildObjects(int indexPoint);

	int addNewBuffers(GLenum typeObject, GLuint typeLine);
	void addPoint(int k, Point p);
	int searchPointInBuffers(int indexPoint);
	void deletePoint(int index);
	void deleteSet(int indexBuffer);
	//void setColorObject(std::vector<int> bufferIndices, Color color);
	void setLineWidthForBuffers(std::vector<int> indicesBuffers);
	void hideBuffers(std::vector<int> indicesBuffers);

	std::string printBufferInfo(int indexBuffer);
	Json::Value getJsonBuffer(int indexBuffer);
	Json::Value getJsonBuffers();
	Buffer* getBuffer(int indexBuffer);
	//Json::Value getJsonObjects();

	int getWidth();
	int getHeight();

	bool checkClosedFigure(std::vector<int> bufferIndices);

	void scaling(float scale);
	float getScale();
	int searchPoint(float eps, Point p);
	void movePoint(int index, Point p);
	bool comparePoints(Point p1, Point p2);
	Point definePoint(Point p, int tag);

	//void createObject(std::vector<int> bufferIndices);
	//void deleteObject(int indexObject);
	//int searchBufferInObjects(int indexBuffer);
	//void updatePointsInObjects();

	//Object getObject(int index);

	void drawCircle(Point p, float r);
	void printText();
};

Painter::Painter(GLuint programValue, GLint atrPosValue, GLint atrColorValue, int widthValue, int heightValue, int gridStepValue)
{
	flagReBuild = false;
	program = programValue;
	atrPos = atrPosValue;
	atrColor = atrColorValue;
	gridStep = gridStepValue;
	stepSpline = EPS_BUILD_SPLINE;
	width = widthValue;
	height = heightValue;
	scale = 1.0;
	converter.setSize(widthValue, heightValue);

	for (int i = 0; i < COUNT_DEFAULT_OBJECTS; ++i) // init buffes for default objects
		addNewBuffers(typeObjects[i], typeLines[i]);
}

void Painter::Clear()
{
	glClearColor(1.0, 1.0, 1.0, 1);
	glClearDepthf(1.0f);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glEnable(GL_DEPTH_TEST);
}

int Painter::getWidth()
{
	return width;
}

int Painter::getHeight()
{
	return height;
}

void Painter::setGridStep(int size)
{
	gridStep = size;
}

int Painter::getGridStep()
{
	return gridStep;
}

float Painter::getStepGridHeight()
{
	return stepGridHeight;
}

float Painter::getStepGridWidth()
{
	return stepGridWidth;
}

int Painter::addNewBuffers(GLenum typeObject, GLuint typeLine)
{
	int newIndex = buffers.size() + 1;
	Buffer buf;
	buf.vertexBuffer = newIndex;
	buf.indexBuffer = newIndex;
	buf.colorBuffer = newIndex;
	buf.typeObject = typeObject;
	buf.typeLine = typeLine;
	buf.lineWidth = DEFAULT_LINE_WIDTH;
	buf.flagVisible = true;
	buffers.push_back(buf);

	//glGenBuffers(1, &buffers[newIndex].vertexBuffer);
	//glGenBuffers(1, &buffers[newIndex].colorBuffer);
	//glGenBuffers(1, &buffers[newIndex].indexBuffer);

	return newIndex;
}

void Painter::initPointGrid()
{
	buffers[GRID].vertices.clear();
	buffers[GRID].indices.clear();
	int k = 0;
	//stepGridHeight = 2.0 / ((float)height / (float)gridStep);
	stepGridHeight = ((float)gridStep / RATIO_STEP_SIZE) * GL_STEP;
	for (float i = -1.0; i < 1.0; i+=stepGridHeight)
	{
		Point p[2] = { Point( -1.0, i ), Point( 1.0, i ) };
		buffers[GRID].vertices.push_back(p[0]);
		buffers[GRID].vertices.push_back(p[1]);

		buffers[GRID].indices.push_back(k);
		buffers[GRID].indices.push_back(k + 1);
		k+=2;
	}

	k = buffers[GRID].vertices.size();
	//stepGridWidth = 2.0 / ((float)width / (float)gridStep);
	stepGridWidth = ((float)gridStep / RATIO_STEP_SIZE) * GL_STEP;
	for (float i = -1.0; i < 1.0; i+=stepGridWidth)
	{
		Point p[2] = { Point( i, -1.0 ), Point( i, 1.0 ) };
		buffers[GRID].vertices.push_back(p[0]);
		buffers[GRID].vertices.push_back(p[1]);

		buffers[GRID].indices.push_back(k);
		buffers[GRID].indices.push_back(k + 1);
		k+=2;
	}
	buffers[GRID].colors = std::vector<Color>(k, colors[GRID_COLOR_INDEX]);
}

void Painter::initBuffers(int indexBuffer)
{
	glGenBuffers(1, &buffers[indexBuffer].vertexBuffer);
	glBindBuffer(GL_ARRAY_BUFFER, buffers[indexBuffer].vertexBuffer);
	glBufferData(GL_ARRAY_BUFFER, buffers[indexBuffer].vertices.size() * sizeof(Point), &buffers[indexBuffer].vertices[0], GL_STATIC_DRAW);
	//glDeleteBuffers(1, &buffers[indexBuffer].vertexBuffer);

	glGenBuffers(1, &buffers[indexBuffer].colorBuffer);
  	glBindBuffer(GL_ARRAY_BUFFER, buffers[indexBuffer].colorBuffer);
  	glBufferData(GL_ARRAY_BUFFER, buffers[indexBuffer].colors.size() * sizeof(Color), &buffers[indexBuffer].colors[0], GL_STATIC_DRAW);
  	//glDeleteBuffers(1, &buffers[indexBuffer].colorBuffer);
	
	glGenBuffers(1, &buffers[indexBuffer].indexBuffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffers[indexBuffer].indexBuffer);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, buffers[indexBuffer].indices.size() * sizeof(int), &buffers[indexBuffer].indices[0], GL_STATIC_DRAW);
	//glDeleteBuffers(1, &buffers[indexBuffer].indexBuffer);
}

void Painter::clearBuffer(int indexBuffer)
{
	glDeleteBuffers(1, &buffers[indexBuffer].vertexBuffer);
	glDeleteBuffers(1, &buffers[indexBuffer].colorBuffer);
	glDeleteBuffers(1, &buffers[indexBuffer].indexBuffer);
}

void Painter::paint()
{
	Clear();
	int n = buffers.size();
	for (int i = n - 1; i >= 0; i--)
	{
		if(!buffers[i].flagVisible) continue;

		glLineWidth(buffers[i].lineWidth);

	  	initBuffers(i);

		glUseProgram(program);

		glEnableVertexAttribArray(atrColor);

		glBindBuffer(GL_ARRAY_BUFFER, buffers[i].colorBuffer);
		glVertexAttribPointer(atrColor, 3, GL_FLOAT, GL_FALSE, 0, 0);

		glEnableVertexAttribArray(atrPos);
		glBindBuffer(GL_ARRAY_BUFFER, buffers[i].vertexBuffer);
		glVertexAttribPointer(atrPos, 2, GL_FLOAT, GL_FALSE, 0, 0);

		if(buffers[i].indices.size() == 0)
			glDrawArrays( buffers[i].typeObject, 0, buffers[i].vertices.size() );
		else
			glDrawElements(buffers[i].typeObject, buffers[i].indices.size(), GL_UNSIGNED_INT, (void*)0);

		glDisableVertexAttribArray(atrColor);
		glDisableVertexAttribArray(atrPos);
		clearBuffer(i);
	}
}

void Painter::addPoint(int indexBuffer, Point p)
{
	Point pScale(p.x / scale, p.y / scale);
	buffers[indexBuffer].vertices.push_back(p);
	buffers[indexBuffer].colors.push_back(colors[POINT_COLOR_INDEX]);
}

int Painter::searchPointInBuffers(int indexPoint)
{
	int n = buffers.size();

	for (int i = n - 1; i > 1; i--)
		if(find(buffers[i].baseIndices.begin(), buffers[i].baseIndices.end(), indexPoint)
			!= buffers[i].baseIndices.end())
		return i;

	return -1;
}

void Painter::deletePoint(int index)
{
	if(searchPointInBuffers(index) == -1)
		buffers[POINTS].vertices.erase(buffers[POINTS].vertices.begin() + index, buffers[POINTS].vertices.begin() + index + 1);
}

void Painter::deleteSet(int indexBuffer)
{
	if(construction.searchBufferInObjects(indexBuffer) == -1)
		buffers.erase(buffers.begin() + indexBuffer, buffers.begin() + indexBuffer + 1);
}

void Painter::fillIndicesPolygon(int indexBuffer)
{
	int n = buffers[indexBuffer].vertices.size();
	//buffers[newIndex].indices.push_back(0);
	
	for (int i = 0; i < n - 1; ++i)
		addIndex(indexBuffer, i, i + 1);


	if(!flagReBuild)
		buffers[indexBuffer].colors = std::vector<Color>(n * 2, colors[POINT_COLOR_INDEX]);
}

void Painter::initBaseIndices(int indexBuffer, std::vector<int> indices)
{
	buffers[indexBuffer].baseIndices.clear();
	buffers[indexBuffer].baseIndices.insert(buffers[indexBuffer].baseIndices.end(), indices.begin(), indices.end());
}

void Painter::buildPolygon(int indexBuffer, std::vector<int> indices)
{
	initBaseIndices(indexBuffer, indices);
	int n = indices.size();

	for (int i = 0; i < n; ++i)
		buffers[indexBuffer].vertices.push_back(buffers[POINTS].vertices[indices[i]]);

	/*for(int i = 0; i <= 360; i++)
    {
	    float angle = 2 * M_PI * i / 300;
	    float x = buffers[POINTS].vertices[indices[0]].x + 0.2*cos(angle);
	    float y = buffers[POINTS].vertices[indices[0]].y + 0.2*sin(angle);
	    buffers[indexBuffer].vertices.push_back(Point(x, y));
    }*/

	fillIndicesPolygon(indexBuffer);
}

Point Painter::definePoint(Point p, int tag)
{
	if(tag)
		return Point(p.y, p.x);
	else return Point(p.x, p.y);
}

Splines* Splines::createSpline(int type)
{
    switch(type)
    {
        case CUBIC_SPLINE:      return new CubicSpline();
                                break;

        case AKIMA_SPLINE:      return new AkimaSpline();
                                break;

        case CURVE:             return new Curve();
                                break;
    }

    return NULL;
}

void Painter::buildSpline(int indexBuffer, int spline, std::vector<int> indices, int tag)
{
	initBaseIndices(indexBuffer, indices);
	int n = indices.size();

	std::vector<Point> points;

	for (int i = 0; i < n; ++i)
		points.push_back(definePoint(buffers[POINTS].vertices[indices[i]], tag));

	std::sort(points.begin(), points.begin() + points.size(), compareX());

	
	sp = sp->createSpline(spline);

	sp->buildSpline(points);

	for (float x = points[0].x; x <= points[n - 1].x; x+=stepSpline)
	{
		//Point p(sp->f(valStep), valStep);
		Point p(x, sp->f(x));
		buffers[indexBuffer].vertices.push_back(definePoint(p, tag));
	}

	fillIndicesPolygon(indexBuffer);
	buffers[indexBuffer].tag = tag;
}

Json::Value Painter::getJsonBuffers()
{
	Json::Value res;
	int n = buffers.size();

	for (int i = COUNT_DEFAULT_OBJECTS; i < n; ++i)
		res[i - COUNT_DEFAULT_OBJECTS] = getJsonBuffer(i);

	return res;
}

Json::Value Painter::getJsonBuffer(int indexBuffer)
{
	Json::Value res;

	int nVertices = buffers[indexBuffer].vertices.size();
	int nIndices = buffers[indexBuffer].indices.size();
	int nBaseIndices = buffers[indexBuffer].baseIndices.size();
	int nColors = buffers[indexBuffer].colors.size();

	res["index"] = indexBuffer;
	res["vertexBuffer"] = buffers[indexBuffer].vertexBuffer;
	res["indexBuffer"] = buffers[indexBuffer].indexBuffer;

	for(int i = 0; i < nVertices; i++)
	{
    	res["vertices"][i]["x"] = buffers[indexBuffer].vertices[i].x;
    	res["vertices"][i]["y"] = buffers[indexBuffer].vertices[i].y;
	}

	for(int i = 0; i < nIndices; i++)
	{
    	res["indices"][i] = buffers[indexBuffer].indices[i];
	}

	for(int i = 0; i < nBaseIndices; i++)
	{
    	res["baseIndices"][i] = buffers[indexBuffer].baseIndices[i];
	}

	for(int i = 0; i < nColors; i++)
	{
    	res["colors"][i]["r"] = buffers[indexBuffer].colors[i].r;
    	res["colors"][i]["g"] = buffers[indexBuffer].colors[i].g;
    	res["colors"][i]["b"] = buffers[indexBuffer].colors[i].b;
	}

	return res;
}

std::string Painter::printBufferInfo(int indexBuffer)
{
	std::string sizeBuffer = converter.numberToString(buffers.size());
	std::string strVertexBuffer = converter.numberToString(buffers[indexBuffer].vertexBuffer);
	std::string strIndexBuffer = converter.numberToString(buffers[indexBuffer].indexBuffer);
	std::string strVertices = converter.vectorToString(buffers[indexBuffer].vertices);
	std::string strIndices = converter.vectorToString(buffers[indexBuffer].indices);
	return "size buffer = " + sizeBuffer + "\nvertexBuffer = " + strVertexBuffer + "\nindexBuffer = " + strIndexBuffer
			+ "\nvertices = " + strVertices + "\nstrIndices = " + strIndices + "\n";
}

void Painter::addIndex(int indexBuffer, int indexStart, int indexEnd)
{
	buffers[indexBuffer].indices.push_back(indexStart);
	buffers[indexBuffer].indices.push_back(indexEnd);
}

void Painter::lightPoints(std::vector<int> indices)
{
	int n = buffers[POINTS].vertices.size();

	buffers[POINTS].colors.clear();

	for (int i = 0; i < n; ++i)
	{
		if(find(indices.begin(), indices.end(), i) != indices.end())
			buffers[POINTS].colors.push_back(arrColor[POINT_COLOR_LIGHT_INDEX]);
		else
			buffers[POINTS].colors.push_back(arrColor[POINT_COLOR_INDEX]);
	}
}

int Painter::searchPoint(float eps, Point p)
{
	//Point target = converter.round(p, eps);
	int n = buffers[POINTS].vertices.size();
	for (int i = 0; i < n; ++i)
	{
		if(std::abs(p.x - buffers[POINTS].vertices[i].x) <= EPS_MOVE_POINT &&
			std::abs(p.y - buffers[POINTS].vertices[i].y) <= EPS_MOVE_POINT)
			return i;
		//if(converter.comparePoints(target, converter.round(buffers[POINTS].vertices[i], eps) ) )
			//return i;
	}

	return -1;
}

void Painter::movePoint(int index, Point p)
{
	//int index = searchPoint(EPS_MOVE_POINT, p);
	if(index == -1)
		return;
	else
	{
		buffers[POINTS].vertices[index].x = p.x;
		buffers[POINTS].vertices[index].y = p.y;
	}

	reBuildObjects(index);
}

void Painter::reBuildObjects(int indexPoint)
{
	flagReBuild = !flagReBuild;
	int n = buffers.size();

	for (int i = n - 1; i > 1; i--)
		if(find(buffers[i].baseIndices.begin(), buffers[i].baseIndices.end(), indexPoint)
			!= buffers[i].baseIndices.end())
		{
			buffers[i].vertices.clear();
			buffers[i].indices.clear();
			switch(buffers[i].typeLine)
			{
				case POINT_TYPE:	
										break;

				case POLYGON_TYPE:		buildPolygon(i, buffers[i].baseIndices);
										break;

				case CUBIC_SPLINE_TYPE:	buildSpline(i, CUBIC_SPLINE, buffers[i].baseIndices,  buffers[i].tag);
										break;

				case AKIMA_SPLINE_TYPE:	buildSpline(i, AKIMA_SPLINE, buffers[i].baseIndices, buffers[i].tag);
										break;

				case CURVE_TYPE:		buildSpline(i, CURVE, buffers[i].baseIndices, buffers[i].tag);
										break;

				case ERMIT_SPLINE_TYPE:
										break;

			}
		}

	construction.updatePointsInObjects();
	flagReBuild = !flagReBuild;
}

void Painter::setLineWidthForBuffers(std::vector<int> indicesBuffers)
{
	int n = buffers.size();

	for (int i = 0; i < n; ++i)
	{
		if(find(indicesBuffers.begin(), indicesBuffers.end(), i)
			!= indicesBuffers.end())
			buffers[i].lineWidth = BOLD_LINE_WIDTH;
		else buffers[i].lineWidth = DEFAULT_LINE_WIDTH;
	}
}

void Painter::hideBuffers(std::vector<int> indicesBuffers)
{
	int n = buffers.size();

	for (int i = 0; i < n; ++i)
	{
		if(find(indicesBuffers.begin(), indicesBuffers.end(), i)
			!= indicesBuffers.end())
			buffers[i].flagVisible = false;
		else buffers[i].flagVisible = true;
	}
}

void Painter::scaling(float scale)
{
	int n = buffers[POINTS].vertices.size();

	for (int i = 0; i < n; ++i)
	{
		buffers[POINTS].vertices[i].x /= scale;
		buffers[POINTS].vertices[i].y /= scale;
		reBuildObjects(i);
	}

	this->scale /= scale;
}

float Painter::getScale()
{
	return scale;
}

void Painter::drawCircle(Point p, float r)
{
	std::vector<Point> points;

    for(int i = 0; i <= 360; i++)
    {
	    float angle = 2 * M_PI * i / 300;
	    float x = p.x + r*cos(angle);
	    float y = p.y + r*sin(angle);
	    points.push_back(Point(x, y));
    }
}

/*void Painter::printText()
{
		// 2D - буквы
	GLuint nFontList;
	 
	// Создание
	//nFontList = glGenLists(256);
	wglUseFontBitmaps(hDC, 0, 256, nFontList); //(hDC - Devece Context с выбранным шрифтом)
	 
	// Использование
	glRasterPos2i(0, 200);
	glListBase(nFontList);
	glCallLists (13, GL_UNSIGNED_BYTE, "Hello, world!");
	 
	//---------------------------------------------------
	// Клёвые 3D-буквы
	GLuint nFontList;
	GLYPHMETRICSFLOAT agmf[256];
	 
	// Создание
	nFontList = glGenLists(256);
	wglUseFontOutlines(hDC, 0, 256, nFontList, 0.0f, 0.5f, WGL_FONT_POLYGONS, agmf);
	 
	// Использование
	glPushMatrix();
	glListBase(nFontList);
	glCallLists (6, GL_UNSIGNED_BYTE, "OpenGL");    
	glPopMatrix();
}*/

void Painter::printText()
{
	glMatrixMode(GL_PROJECTION);
  	glGenLists(5);
	//glMatrixMode(0x1701);
	//double *matrix = new double[16];
	//glGetDoublev(0x0BA7, matrix);
}

Buffer* Painter::getBuffer(int indexBuffer)
{
	return &buffers[indexBuffer];
}

bool Painter::checkClosedFigure(std::vector<int> bufferIndices)
{
	int n = bufferIndices.size();

	for (int i = 0; i < n - 1; ++i)
	{
		if(buffers[bufferIndices[i + 1]].baseIndices[0] != buffers[bufferIndices[i]].baseIndices[buffers[bufferIndices[i]].baseIndices.size() - 1])
			return false;
	}

	return true;
}