#ifndef VERTICALLAYER_CC
#define VERTICALLAYER_CC

#include "layer.cc"

class VerticalLayer: public Layer
{
public:
    VerticalLayer(int ww, int hh, int ms) : Layer(ww, hh, ms) {}
    virtual float calculate()
    {
        float result = getLamellas().size() * 5;
        return result;
    }
};

#endif
