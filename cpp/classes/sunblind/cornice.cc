#ifndef CORNICE_CC
#define CORNICE_CC

#include "../complectation.cc"
#include "sunblind.cc"

class Cornice
{
public:
	Sunblind *sunblind;

    Cornice(ww, hh, pp)
    {
    	width = ww;
    	height = hh;
    	price = pp;
    } 

    virtual float calculate()
    {
        float result = 0;

        result = width / 1000 * price;
        if(result < sunblind->getMinCorniceLength() * price) result = sunblind->getMinCorniceLength() * price;

        return result;
    }

private:
	int width;
	int height;
	float price;
};

#endif
