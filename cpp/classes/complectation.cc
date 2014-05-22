#ifndef COMPLECTATION_CC
#define COMPLECTATION_CC

class Complectation
{
public:
	Complectation() : name(""), price(0) {}
	Complectation(std::string nn, float pp)
	{
		name = nn;
		price = pp;
	}

    virtual float calculate()
    {
    	return price;
    }

	std::string name;
	float price;
};

#endif
