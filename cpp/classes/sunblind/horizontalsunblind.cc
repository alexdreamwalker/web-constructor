#ifndef HORIZONTALSUNBLIND_CC
#define HORIZONTALSUNBLIND_CC

#include "sunblind.cc"
#include "horizontallayer.cc"

class HorizontalSunblind: public Sunblind
{
public:
    HorizontalSunblind(int ww, int hh) : Sunblind(ww, hh) {}
};

#endif