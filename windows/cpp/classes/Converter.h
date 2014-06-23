struct Point
{
	float x;
	float y;
	//Point(Point &p) : x(p->x), y(p->y){}
	Point() {}
	//Point(Point &p) : x(p.x), y(p.y) {}
	Point( float xVal, float yVal ) : x( xVal ), y( yVal ) {}
};

struct compareX
{
	bool operator() (const Point &left, const Point &right) { return left.x < right.x;}
};

struct compareY
{
	bool operator() (const Point &left, const Point &right) { return left.y < right.y;}
};

struct Color
{
	float r;
	float g;
	float b;
    Color( float rVal, float gVal, float bVal ) : r( rVal ), g( gVal ), b( bVal ) {}
};

/*struct Buffer
{
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
};*/

/*struct Object
{
	std::vector<int> bufferIndices;
	std::map<std::string, std::string> properties;
};*/

class Converter
{
private:
	int width, height;

public:
	Converter()
	{
		width = 0;
		height = 0;
	}

	void setSize(int valueWidth, int valueHeight)
	{
		width = valueWidth;
		height = valueHeight;
	}

	~Converter() {}
	
	Point convertToGL(pp::Point point)
	{
		float w = float(width) / 2;
		float h = float(height) / 2;

		Point newPoint;
		newPoint.x = (float)((point.x() - w) / w);
		newPoint.y = (float)(-(point.y() - h) / h);

		return newPoint;
	};

	static int stringToInt(std::string str)
	{
		if(!is_number(str))
			return -1;
		std::stringstream ss;
  		ss << str;

		int result;
		ss >> result;

		return result;
	}

	static bool is_number(const std::string& s)
	{
	    std::string::const_iterator it = s.begin();
	    while (it != s.end() && std::isdigit(*it)) ++it;
	    return !s.empty() && it == s.end();
	}

	Point convertToGL(Point point)
	{
		float w = float(width) / 2;
		float h = float(height) / 2;

		Point newPoint;
		newPoint.x = (float)((point.x - w) / w);
		newPoint.y = (float)(-(point.y - h) / h);

		return newPoint;
	};

	static std::string numberToString(float number)
	{
		std::string result;
		std::ostringstream convert;
		convert << number;
		result = convert.str();
		return result;
	}

	static std::string vectorToString(std::vector<Point> list)
	{
		std::string result = "Points:\n";
		for (std::vector<Point>::iterator it = list.begin() ; it != list.end(); ++it)
	    	result += "Point(" + numberToString(it->x) + ", " + numberToString(it->y) + ")\n";

	    return result;
	}

	static std::string vectorToString(std::vector<Color> list)
	{
		std::string result = "Colors:\n";
		for (std::vector<Color>::iterator it = list.begin() ; it != list.end(); ++it)
	    	result += "Color(" + numberToString(it->r) + ", " + numberToString(it->g) + ", " + numberToString(it->b) + ")\n";

	    return result;
	}

	static std::string vectorToString(std::vector<int> list)
	{
		std::string result = "Indices:\n";
		for (std::vector<int>::iterator it = list.begin() ; it != list.end(); ++it)
	    	result += numberToString(*it) + ", ";

	    return result;
	}

	static float round(float val, float eps)
	{
		 return floorf(val / eps) * eps;
	}

	static Point round(Point val, float eps)
	{
		 Point p;
		 p.x = floorf(val.x / eps) * eps;
		 p.y = floorf(val.y / eps) * eps;

		 return p;
	}

	static Point roundPoint(Point val, float stepGridWidth, float stepGridHeight)
	{
		Point p;

		p.x = (val.x < 0) ? -1.0 + stepGridWidth * ::round((1.0 - std::abs(val.x)) / stepGridWidth)
								: -1.0 + stepGridWidth * ::round((1 + val.x) / stepGridWidth);

		p.y = (val.y < 0) ? -1.0 + stepGridHeight * ::round((1.0 - std::abs(val.y)) / stepGridHeight)
								: -1.0 + stepGridHeight * ::round((1.0 + val.y) / stepGridHeight);
		return p;
	}

	bool comparePoints(Point p1, Point p2)
	{
		return p1.x == p2.x && p1.y == p2.y;
	}
};