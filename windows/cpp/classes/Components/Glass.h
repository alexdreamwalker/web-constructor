#ifndef GLASS
#define GLASS

class Glass : public Object
{
public:
	Glass(){};
	Glass(std::vector<int> bufferIndices, Painter* painter, int index)
		: Object(bufferIndices, painter, index) {};
	~Glass();
	
	//std::vector<Buffer> buffers;
	int checkRestriction();
	int checkConvexPolygon(int indexBuffer);
	float vectorMult(Point p1, Point p2);
};

int Glass::checkRestriction()
{
	int n = this->bufferIndices.size();

	for (int i = 0; i < n; ++i)
	{
		int indexPoint = checkConvexPolygon(i);
		if(indexPoint != -1)
			painter->drawCircle(painter->getBuffer(i)->vertices[indexPoint], 0.2);
	}
	return -1;
}

int Glass::checkConvexPolygon(int indexBuffer)
{
	Buffer* buf = painter->getBuffer(indexBuffer);
	int n = painter->getBuffer(indexBuffer)->vertices.size() - 1;

	if(n < 4)
		return 1;

	float oldVec = vectorMult(Point(buf->vertices[1].x - buf->vertices[0].x,
		 buf->vertices[1].y - buf->vertices[0].y),
		Point(buf->vertices[2].x - buf->vertices[1].x,
		 buf->vertices[2].y - buf->vertices[1].y));

	for (int i = 1; i < n; ++i)
	{
		int j = (i + 1) % n;
		int k = (i + 2) % n;

		Point p1(buf->vertices[j].x - buf->vertices[i].x,
		 painter->getBuffer(indexBuffer)->vertices[j].y - painter->getBuffer(indexBuffer)->vertices[i].y);

		Point p2(buf->vertices[k].x - buf->vertices[j].x,
		 buf->vertices[k].y - buf->vertices[j].y);

		float newVec = vectorMult(p1, p2);
		if(oldVec * newVec < 0.0)
			return j;

		oldVec = newVec;
	}

	return -1;
}

float Glass::vectorMult(Point p1, Point p2)
{
	return p1.x*p2.y - p2.x*p1.y;
}

#endif