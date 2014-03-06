#ifndef MULTILAYER_HPP
#define MULTILAYER_HPP

#include "verticallayer.cc"

class MultiLayer: public VerticalLayer
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