#ifndef CORNICE_CC
#define CORNICE_CC

#include "../complectation.cc"

class Cornice
{
public:
    Cornice() : width(0), height(0), price(0), minLength(0) {}
    Cornice(int ww, int hh, float pp, int ml)
    {
    	width = ww;
    	height = hh;
    	price = pp;
        minLength = ml;
    } 

    virtual float calculate()
    {
        float result = 0;

        result = width / 1000 * price;
        if(result < minLength * price) result = minLength * price;

        return result;
    }

private:
	int width;
	int height;
	float price;
    int minLength;
};

#endif
