#ifndef DECORPLANK_CC
#define DECORPLANK_CC

#include "../complectation.cc"

class DecorPlank
{
public:
    DecorPlank() : width(0), price(0) {}
    DecorPlank(int ww, float pp)
    {
    	width = ww;
    	price = pp;
    } 

    virtual float calculate()
    {
        float result = 0;

        result = width / 1000 * price;

        return result;
    }

private:
	int width;
	float price;
};

#endif
