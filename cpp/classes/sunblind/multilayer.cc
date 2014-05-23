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
        float s = (float)(width / 1000) * (float)(height / 1000);

        float price = 0;
        float currentSquare = 0;
        for(int i = 0; i < getLamellas().size(); i++)
            currentSquare += ((float)getLamellas()[i]->width / 1000) * ((float)getLamellas()[i]->height / 1000);

        float mediumPrice = 0;
        for (std::map<float, int>::iterator it = colors.begin(); it != colors.end(); ++it) 
            mediumPrice += it->first;
        mediumPrice = mediumPrice / (float)colors.size();

        float part = currentSquare / s;
        if(part < 0.5)
            price = s * mediumPrice / 2;
        else price = s * mediumPrice;

        return result;
    }
};

#endif
