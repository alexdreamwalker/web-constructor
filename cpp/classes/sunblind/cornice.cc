#ifndef CORNICE_HPP
#define CORNICE_HPP

#include "../complectation.cc"

class Cornice: public Complectation
{
public:
    Cornice() {}
    virtual float calculate()
    {
        return 3;
    }
};

#endif
