#ifndef VERTICALLAYER_HPP
#define VERTICALLAYER_HPP

#include "layer.cc"

class VerticalLayer: public Layer
{
public:
    VerticalLayer() {}
    virtual float calculate()
    {
        float result = getLamellas().size() * 5;
        return result;
    }
};

#endif
