#ifndef HORIZONTALLAYER_CC
#define HORIZONTALLAYER_CC

#include "layer.cc"

class HorizontalLayer: public Layer
{
public:
    HorizontalLayer(int ww, int hh, int ms) : Layer(ww, hh, ms) {}
    virtual float calculate()
    {
        float result = 0;
        float s = (float)(width / 1000) * (float)(height / 1000);
        float maxPrice = 0;
        for (std::map<float, int>::iterator it = colors.begin(); it != colors.end(); ++it) 
        {
            float percent = (float)it->second / (float)getLamellas().size();
            std::cout << it->second << " / " << getLamellas().size() << " = " << percent << '\n';
        	float price = s * percent * it->first;
            std::cout << s << " * " << percent << " * " << it->first << '\n';
        	result += price;
        	if(price > maxPrice) maxPrice = price;
        }
        if(result < maxPrice * minSquare) result = maxPrice * minSquare;

        return result;
    }
};

#endif
