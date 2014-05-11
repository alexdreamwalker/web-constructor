#ifndef SUNBLIND_CC
#define SUNBLIND_CC

#include "../construction.cc"
#include "cornice.cc"
#include "layer.cc"

class Sunblind: public Construction
{
public:
    Sunblind(int ww, int hh) 
    {
        width = ww;
        height = hh;
    };

    virtual std::map<std::string, float> calculate()
    {
        std::map<std::string, float> result;
        result["ламели"] = 0;
        for(int i = 0; i < layers.size(); i++) {
            Layer* layer = layers.at(i);
            float pr = layer->calculate();
            result["ламели"] += pr;
        }
        result["карниз"] = cornice.calculate();
        result["комплектация"] = 0;
        for(int i = 0; i < complectation.size(); i++)
            result["комплектация"] += (*complectation[i]).calculate();
        return result;
    }

    void addLayer(Layer &layer)
    {
        layers.push_back(&layer);
    }

    void setCornice(Cornice &nCornice)
    {
        cornice = nCornice;
    }


private:
    Cornice cornice;
    std::vector<Layer*> layers;
    std::vector<Complectation*> complectation;
    int width;
    int height;
};

#endif
