#ifndef MULTISUNBLIND_HPP
#define MULTISUNBLIND_HPP

#include "verticalsunblind.cc"
#include "multilayer.cc"

class MultiSunblind: public VerticalSunblind
{
public:
    MultiSunblind(int ww, int hh) : VerticalSunblind(ww, hh) {}
};

#endif