#ifndef MULTISUNBLIND_HPP
#define MULTISUNBLIND_HPP

#include "verticalsunblind.cc"

class MultiSunblind: public VerticalSunblind
{
public:
    MultiSunblind(int ww, int hh, float mcl, float mls) : VerticalSunblind(ww, hh, mcl, mls) {}
};

#endif