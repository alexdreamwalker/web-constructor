#ifndef CONSTRUCTION_HPP
#define CONSTRUCTION_HPP

#include <map>
#include <string>

class Construction
{
public:
    virtual std::map<std::string, float> calculate() = 0;
};

#endif
