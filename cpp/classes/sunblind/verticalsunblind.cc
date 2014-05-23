#ifndef VERTICALSUNBLIND_CC
#define VERTICALSUNBLIND_CC

#include "sunblind.cc"
#include "verticallayer.cc"

class VerticalSunblind: public Sunblind
{
public:
    VerticalSunblind(int ww, int hh) : Sunblind(ww, hh) {}
};

#endif
