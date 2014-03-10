#ifndef MULTILAYER_CC
#define MULTILAYER_CC

#include "verticallayer.cc"

class MultiLayer: public VerticalLayer
{
public:
    MultiLayer(int ww, int hh) : VerticalLayer(ww, hh) {}
    virtual float calculate()
    {
        float result = 0;
        float s = width * height / 1000;
        float maxPrice = 0;

        for (std::map<float, int>::iterator it = colors.begin(); it != colors.end(); ++it) 
        {
        	float percent = it->second / lamellas.size();
        	float price = s * percent * it->first;
        	result += price;
        	if(price > maxPrice) maxPrice = price;
        }

        if(result < maxPrice * sunblind->getMinLayerSquare()) result = maxPrice * sunblind->getMinLayerSquare();

        return result;
    }
};

#endif