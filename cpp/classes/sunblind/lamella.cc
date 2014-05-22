#ifndef LAMELLA_CC
#define LAMELLA_CC

#include "../complectation.cc"

class Lamella: public Complectation
{
public:
    Lamella() : price(0), width(0), height(0), material(0) {}
    Lamella(int ww, int hh, float pp, int mm)
    {
    	width = ww;
    	height = hh;
    	price = pp;
        material = mm;
    }
    virtual float calculate()
    {
        return price;
    }

    int width;
    int height;
    float price;
    int material;
};

#endif
