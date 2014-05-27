#ifndef CONSTRUCTION_CC
#define CONSTRUCTION_CC

#include <map>
#include <string>

class Construction
{
public:
    virtual std::map<std::string, float> calculate() = 0;
};

#endif
