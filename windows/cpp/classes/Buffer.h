class Buffer
{
public:
	Buffer(){};
	Buffer(GLenum typeObject, GLuint typeLine, int index) :
	vertexBuffer(index), indexBuffer(index), colorBuffer(index), typeObject(typeObject), typeLine(typeLine),
	lineWidth(DEFAULT_LINE_WIDTH), flagVisible(true) {};
	~Buffer(){};

	Json::Value getJson();

	bool searchPoint(int indexPoint);
	void fillBuffer(GLenum typeObject, GLuint typeLine, int index);

	GLuint vertexBuffer;
	GLuint indexBuffer;
	GLuint colorBuffer;
	std::vector<Point> vertices;
	std::vector<int> baseIndices;
	std::vector<int> indices;
	std::vector<Color> colors;
	GLenum typeObject;
	GLuint typeLine;
	float lineWidth;
	bool flagVisible;
	int tag; // for spline: 0 - horizontal, 1- vertical
	
};

/*Buffer::Buffer(GLenum typeObject, GLuint typeLine, int index)
{
	vertexBuffer = index;
	indexBuffer = index;
	colorBuffer = index;
	typeObject = typeObject;
	typeLine = typeLine;
	lineWidth = DEFAULT_LINE_WIDTH;
	flagVisible = true;
}*/

void Buffer::fillBuffer(GLenum typeObject, GLuint typeLine, int index)
{
	vertexBuffer = index;
	indexBuffer = index;
	colorBuffer = index;
	typeObject = typeObject;
	typeLine = typeLine;
	lineWidth = DEFAULT_LINE_WIDTH;
	flagVisible = true;
}

bool Buffer::searchPoint(int indexPoint)
{
	if(find(baseIndices.begin(), baseIndices.end(), indexPoint)
			!= baseIndices.end())
		return true;

	return false;
}

Json::Value Buffer::getJson()
{
	Json::Value res;

	int nVertices = vertices.size();
	int nIndices = indices.size();
	int nBaseIndices = baseIndices.size();
	int nColors = colors.size();

	res["index"] = indexBuffer;
	res["vertexBuffer"] = vertexBuffer;
	res["indexBuffer"] = indexBuffer;

	for(int i = 0; i < nVertices; i++)
	{
    	res["vertices"][i]["x"] = vertices[i].x;
    	res["vertices"][i]["y"] = vertices[i].y;
	}

	for(int i = 0; i < nIndices; i++)
	{
    	res["indices"][i] = indices[i];
	}

	for(int i = 0; i < nBaseIndices; i++)
	{
    	res["baseIndices"][i] = baseIndices[i];
	}

	for(int i = 0; i < nColors; i++)
	{
    	res["colors"][i]["r"] = colors[i].r;
    	res["colors"][i]["g"] = colors[i].g;
    	res["colors"][i]["b"] = colors[i].b;
	}

	return res;
}

