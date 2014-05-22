#ifndef MULTISUNBLIND_CC
#define MULTISUNBLIND_CC

#include "verticalsunblind.cc"
#include "multilayer.cc"

class MultiSunblind: public VerticalSunblind
{
public:
    MultiSunblind(int ww, int hh) : VerticalSunblind(ww, hh) {}
};

#endif