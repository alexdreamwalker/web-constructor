#ifndef MULTILAYER_CC
#define MULTILAYER_CC

#include "verticallayer.cc"

class MultiLayer: public VerticalLayer
{
public:
    MultiLayer(int ww, int hh, int ms) : VerticalLayer(ww, hh, ms) {}
    virtual float calculate()
    {
        float result = 0;
        float s = width * height / 1000;
        float maxPrice = 0;
        std::cout << "colors:" << '\n';
        for (std::map<float, int>::iterator it = colors.begin(); it != colors.end(); ++it) 
        {
            std::cout << it->first << " => " << it->second << '\n';
        	float percent = it->second / getLamellas().size();
        	float price = s * percent * it->first;
        	result += price;
        	if(price > maxPrice) maxPrice = price;
        }
        std::cout << '\n';
        if(result < maxPrice * minSquare) result = maxPrice * minSquare;

        return result;
    }
};

#endif
