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

    ~Layer()
    {
        for(int i = 0; i < lamellas.size(); i++)
            delete lamellas[i];
    }

    virtual float calculate() = 0;

    void addLamella(Lamella& lamella)
    {
        lamellas.push_back(&lamella);
        colors[lamella.price]++;
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
