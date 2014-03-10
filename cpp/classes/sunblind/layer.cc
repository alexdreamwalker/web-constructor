#ifndef LAYER_CC
#define LAYER_CC

#include <vector>
#include <map>
#include "lamella.cc"
#include "sunblind.cc"

class Layer
{
public:
    Sunblind *sunblind;

    Layer(int ww, int hh) 
    {
        width = ww;
        height = hh;
    }

    virtual float calculate() = 0;

    void addLamella(Lamella& lamella)
    {
        lamellas.push_back(lamella);
        if(colors[lamella.price] == null) colors[lamella.price] = 0;
        else colors[lamella.price]++;
    }

    std::vector<Lamella>& getLamellas()
    {
        return lamellas;
    }

protected:
    int width;
    int height;
    std::map<float, int> colors;

private:
    std::vector<Lamella> lamellas;
};

#endif
