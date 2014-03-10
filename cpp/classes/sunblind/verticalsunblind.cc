#ifndef VERTICALSUNBLIND_HPP
#define VERTICALSUNBLIND_HPP

#include "sunblind.cc"

class VerticalSunblind: public Sunblind
{
public:
    VerticalSunblind(int ww, int hh, float mcl, float mls) : Sunblind(ww, hh, mcl, mls) {}
};

#endif
