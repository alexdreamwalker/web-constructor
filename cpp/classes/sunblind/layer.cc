#ifndef LAYER_HPP
#define LAYER_HPP

#include "lamella.cc"
#include <vector>

class Layer
{
public:
    Layer() {}
    virtual float calculate() = 0;

    void addLamella(Lamella& lamella)
    {
        lamellas.push_back(lamella);
    }

    std::vector<Lamella>& getLamellas()
    {
        return lamellas;
    }

private:
    std::vector<Lamella> lamellas;
};

#endif
