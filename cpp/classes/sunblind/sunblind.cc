#ifndef SUNBLIND_CC
#define SUNBLIND_CC

#include "../construction.cc"
#include "cornice.cc"
#include "layer.cc"

class Sunblind: public Construction
{
public:
    Sunblind(int ww, int hh, float mcl, float mls) 
    {
        width = ww;
        height = hh;
        minCorniceLength = mcl;
        minLayerSquare = mls;
    };

    virtual std::map<std::string, float> calculate()
    {
        std::map<std::string, float> result;
        result["ламели"] = 0;
        for(int i = 0; i < layers.size(); i++)
            result["ламели"] += (*layers[i]).calculate();
        result["карниз"] = cornice.calculate();
        result["комплектация"] = 0;
        for(int i = 0; i < complectation.size(); i++)
            result["комплектация"] += (*complectation[i]).calculate();
        return result;
    }

    void addLayer(Layer &layer)
    {
        layers.push_back(&layer);
        layer.sunblind = this;
    }

    void setCornice(Cornice &nCornice)
    {
        cornice = nCornice;
        cornice.sunblind = this;
    }

    float getMinCorniceLength() { return minCorniceLength; }
    float getMinLayerSquare() { return minLayerSquare; }

private:
    Cornice cornice;
    std::vector<Layer*> layers;
    std::vector<Complectation*> complectation;
    int width;
    int height;
    float minCorniceLength;
    float minLayerSquare;
};

#endif
