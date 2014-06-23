#ifndef PROFILE
#define PROFILE

class Profile : public Object
{
public:
	Profile(){};
	Profile(std::vector<int> bufferIndices, Painter* painter, int index)
	: Object(bufferIndices, painter, index) {};
	~Profile();
	int checkRestriction();
	
};

int Profile::checkRestriction()
{
	return -1;
}

#endif