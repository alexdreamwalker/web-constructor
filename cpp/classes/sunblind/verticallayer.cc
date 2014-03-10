#ifndef VERTICALLAYER_CC
#define VERTICALLAYER_CC

#include "layer.cc"

class VerticalLayer: public Layer
{
public:
    VerticalLayer(int ww, int hh) : Layer(ww, hh) {}
    virtual float calculate()
    {
        float result = getLamellas().size() * 5;
        return result;
    }
};

#endif
