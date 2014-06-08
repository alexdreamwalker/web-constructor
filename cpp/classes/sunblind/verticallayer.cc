#ifndef VERTICALLAYER_CC
#define VERTICALLAYER_CC

#include "layer.cc"

class VerticalLayer: public Layer
{
public:
    VerticalLayer(int ww, int hh, int ms) : Layer(ww, hh, ms) {}
    virtual float calculate()
    {
        float result = 0;
        float s = (float)(width / 1000) * (float)(height / 1000);
        float maxPrice = 0;
        for (std::map<float, int>::iterator it = colors.begin(); it != colors.end(); ++it) 
        {
            float percent = (float)it->second / (float)getLamellas().size();
        	float price = s * percent * it->first;
        	result += price;
        	if(price > maxPrice) maxPrice = price;
        }
        if(colors.size() >= 3) result *= 1.5;
        if(result < maxPrice * minSquare) result = maxPrice * minSquare;

        return result;
    }
};

#endif
