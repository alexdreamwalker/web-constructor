#ifndef SUNBLIND_HPP
#define SUNBLIND_HPP

#include "../construction.cc"
#include "cornice.cc"
#include "verticallayer.cc"

class Sunblind: public Construction
{
public:
    Sunblind() {};

    virtual std::map<std::string, float> calculate()
    {
        std::map<std::string, float> result;
        result["ламели"] = 0;
        for(int i = 0; i < layers.size(); i++)
            result["ламели"] += (*layers[i]).calculate();
        result["карниз"] = cornice.calculate();
        return result;
    }

    void addLayer(Layer &layer)
    {
        layers.push_back(&layer);
    }

    void setCornice(Cornice & nCornice)
    {
        cornice = nCornice;
    }

private:
    Cornice cornice;
    std::vector<Layer*> layers;
};

#endif
