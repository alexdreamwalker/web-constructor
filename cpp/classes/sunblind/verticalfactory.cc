#ifndef VERTICALFACTORY_CC
#define VERTICALFACTORY_CC

#include "../factory.cc"
#include "verticalsunblind.cc"

class VerticalFactory: public Factory
{
public:
    VerticalFactory() {};

    virtual Construction* fromJSON(std::string data)
    {
        reader.parse(data, root);

        // get basic sunblind info
        int width = root.get("width", 0).asInt();
        int height = root.get("height", 0).asInt();
        Sunblind *sunblind = new VerticalSunblind(width, height);

        // get cornice info
        int corniceWidth = root["cornice"].get("width", 0).asInt();
        int corniceSize = root["cornice"].get("size", 0).asInt();
        float cornicePrice = root["cornice"].get("price", 0.0).asFloat();
        int minCornLength = root["cornice"].get("minCornLength", 0).asInt();
        Cornice cornice(corniceWidth, corniceSize, cornicePrice, minCornLength);
        sunblind->setCornice(cornice);

        //get decor plank info
        int decorWidth = root["decorPlank"].get("width", 0).asInt();
        float decorPrice = root["decorPlank"].get("price", 0.0).asFloat();
        DecorPlank decor(decorWidth, decorPrice);
        sunblind->setDecorPlank(decor); 

        // get layers info
        const Json::Value layers = root["layers"];
        for(int i = 0; i < layers.size(); i++)
        {
            int layerWidth = layers[i].get("width", 0).asInt();
            int layerHeight = layers[i].get("height", 0).asInt();
            int minLayerSquare = layers[i].get("minLayerSquare", 0.0).asFloat();
            Layer* layer = new VerticalLayer(layerWidth, layerHeight, minLayerSquare);

            const Json::Value lamellas = layers[i]["lamellas"];
            if(lamellas.size() > 0)
            {
                for(int j = 0; j < lamellas.size(); j++)
                {
                    int lamellaWidth = lamellas[j].get("width", 0).asInt();
                    int lamellaHeight = lamellas[j].get("height", 0).asInt();
                    float lamellaPrice = lamellas[j].get("price", 0.0).asFloat();
                    int lamellaMaterial = lamellas[j].get("material", 0).asInt();
                    Lamella* lamella = new Lamella(lamellaWidth, lamellaHeight, lamellaPrice, lamellaMaterial);
                    layer->addLamella(*lamella);
                }    
            } else
            {
                float lamellaPrice = layers[i].get("price", 0.0).asFloat();
                int lamellaSize = layers[i].get("lamellaSize", 0).asInt();
                int lamellaCount = width / lamellaSize;
                for(int j = 0; j < lamellaCount; j++)
                {
                    Lamella* lamella = new Lamella(lamellaSize, height, lamellaPrice, 0);
                    layer->addLamella(*lamella);
                }
            }
            sunblind->addLayer(*layer);
        }

        //get complectation info
        const Json::Value complectation = root["complectation"];
        for(int i = 0; i < complectation.size(); i++)
        {
            std::string compName = complectation[i].get("name", "undefined").asString();
            float compPrice = complectation[i].get("price", 0.0).asFloat();
            Complectation *complect = new Complectation(compName, compPrice);
            sunblind->addComplectation(*complect);
        }

        return sunblind;
    }
};

#endif
