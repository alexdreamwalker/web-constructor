#ifndef LAYER_CC
#define LAYER_CC

#include <vector>
#include <map>
#include "lamella.cc"

class Layer
{
public:
    Layer() : width(0), height(0), minSquare(0) {}

    Layer(int ww, int hh, float ms)
    {
        width = ww;
        height = hh;
        minSquare = ms;
    }

    virtual float calculate() = 0;

    void addLamella(Lamella& lamella)
    {
        lamellas.push_back(&lamella);
        if(colors[lamella.price] == NULL) colors[lamella.price] = 0;
        else colors[lamella.price]++;
    }

    std::vector<Lamella*>& getLamellas()
    {
        return lamellas;
    }

protected:
    int width;
    int height;
    float minSquare;
    std::map<float, int> colors;

private:
    std::vector<Lamella*> lamellas;
};

#endif
