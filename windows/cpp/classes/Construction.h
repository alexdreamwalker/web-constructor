class Construction
{
public:
	Construction(){};
	~Construction(){};

	std::vector<Object*> objects;

	int checkRestrictions();	// return -1 if no errors, else index object
	float getPrice();			// get price for construction
	bool checkConvexPolygon(std::vector<Point> points);
	float vectorMult(Point p1, Point p2);

	void createObject(std::vector<int> bufferIndices, Painter* painter, int type, int price);
	void deleteObject(int indexObject);
	int searchBufferInObjects(int indexBuffer);
	void updatePointsInObjects();

	Object getObject(int index);

	void setColorObject(std::vector<int> bufferIndices, Color color);
	Json::Value getJsonObjects();

};

float Construction::getPrice()
{
	float res = 0.0;
	int n = objects.size();

	for (int i = 0; i < n; ++i)
	{
		res += objects[i].getPrice();
	}

	return res;
}

int Construction::checkRestrictions()
{
	int n = objects.size();

	for (int i = 0; i < n; ++i)
		if(objects[i].checkRestriction() != -1)
			return i;

	return -1;
}

float Construction::vectorMult(Point p1, Point p2)
{
	return p1.x*p2.y - p2.x*p1.y;
}

bool Construction::checkConvexPolygon(std::vector<Point> points)
{
	int n = points.size();

	float vec = vectorMult(points[0], points[1]);
	vec /= std::abs(vec);

	for (int i = 1; i < n - 1; ++i)
	{
		float newVec = vectorMult(points[i], points[i + 1]);
		newVec /= std::abs(newVec);

		if(vec != newVec)
			return 0;
	}

	return 1;
}

void Construction::createObject(std::vector<int> bufferIndices, Painter* painter, int type, int price)
{
	objects.push_back(Glass(bufferIndices, painter, objects.size()));
	objects[objects.size() - 1].setPrice(price);
}

void Construction::deleteObject(int indexObject)
{
	objects.erase(objects.begin() + indexObject, objects.begin() + indexObject + 1);
}

int Construction::searchBufferInObjects(int indexBuffer)
{
	int n = objects.size();

	for (int i = 0; i < n; ++i)
		if(objects[i].searchBuffer(indexBuffer) != -1)
			return i;

	return -1;
}

void Construction::updatePointsInObjects()
{
	int n = objects.size();

	for (int i = 0; i < n; ++i)
	{
		objects[i].defineBorderObject();
	}
}

Object Construction::getObject(int index)
{
	return objects[index];
}

void Construction::setColorObject(std::vector<int> objectIndices, Color color)
{
	int n = objectIndices.size();

	for (int i = 0; i < n; ++i)
	{
		objects[objectIndices[i]].setColor(color);
	}
}

Json::Value Construction::getJsonObjects()
{
	Json::Value res;
	int n = objects.size();

	for (int i = 0; i < n; ++i)
		res[i - 0] = objects[i].getJsonInfo();

	return res;
}