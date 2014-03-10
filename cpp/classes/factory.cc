#ifndef FACTORY_CC
#define FACTORY_CC

#include "construction.cc"
#include "json/json.h"

class Factory
{
public:
    virtual Construction fromJSON(std::string data) = 0;
protected:
	Json::Value root;   // will contains the root value after parsing.
  	Json::Reader reader; // will read JSON data
  	Json::StyledWriter writer; // will write JSON data
};

#endif
