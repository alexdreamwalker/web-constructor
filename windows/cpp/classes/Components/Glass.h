class Glass : Object
{
public:
	Glass();
	~Glass();
	
	std::vector<Buffer> buffers;
	int checkConvexPolygon(int indexBuffer);
	float vectorMult(Point p1, Point p2);
};

int Glass::checkConvexPolygon(int indexBuffer)
{
	int n = buffers[indexBuffer].vertices.size() - 1;

	if(n < 4)
		return 1;

	float oldVec = vectorMult(Point(buffers[indexBuffer].vertices[1].x - buffers[indexBuffer].vertices[0].x,
		 buffers[indexBuffer].vertices[1].y - buffers[indexBuffer].vertices[0].y),
		Point(buffers[indexBuffer].vertices[2].x - buffers[indexBuffer].vertices[1].x,
		 buffers[indexBuffer].vertices[2].y - buffers[indexBuffer].vertices[1].y));

	for (int i = 1; i < n; ++i)
	{
		int j = (i + 1) % n;
		int k = (i + 2) % n;

		Point p1(buffers[indexBuffer].vertices[j].x - buffers[indexBuffer].vertices[i].x,
		 buffers[indexBuffer].vertices[j].y - buffers[indexBuffer].vertices[i].y);

		Point p2(buffers[indexBuffer].vertices[k].x - buffers[indexBuffer].vertices[j].x,
		 buffers[indexBuffer].vertices[k].y - buffers[indexBuffer].vertices[j].y);

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