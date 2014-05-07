#ifndef LAMELLA_HPP
#define LAMELLA_HPP

#include "../complectation.cc"

class Lamella: public Complectation
{
public:
    Lamella() : price(0), width(0), height(0) {}
    Lamella(int ww, int hh, float pp)
    {
    	width = ww;
    	height = hh;
    	price = pp;
    }
    virtual float calculate()
    {
        return price;
    }

    int width;
    int height;
    float price;
};

#endif
