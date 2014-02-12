#ifndef LAMELLA_HPP
#define LAMELLA_HPP

#include "../complectation.cc"

class Lamella: public Complectation
{
public:
    Lamella() {}
    virtual float calculate()
    {
        return 0;
    }
};

#endif
