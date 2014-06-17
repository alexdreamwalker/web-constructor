#ifndef CURVE_H
#define CURVE_H

#include "Splines.h"

class Curve : public Splines
{
public:
    float a, b ,c;

    Curve() {}; //конструктор
    ~Curve() {}; //деструктор

    void buildSpline(const std::vector<Point> p)
    {
		//a = ( y1 - y3 + (y2 - y3) / (x2-x3) ) / ( (x1*x1 - x3*x3)/(x3 - x1) - (x3*x3 - x2*x2)/(x2 - x3));
		//b = (y2 -y3 + a * (x3*x3 - x2*x2) ) / (x2 - x3);
		//c = y3 - a*x3*x3 - b*x3;

		a = (p[0].y - p[2].y + (p[1].y - p[2].y) / (p[1].x - p[2].x) ) / ( (pow(p[0].x, 2.0) - pow(p[2].x, 2.0)) / (p[2].x - p[0].x)
			- (pow(p[2].x, 2.0) - pow(p[1].x, 2.0)) / (p[1].x - p[2].x) );

		b = (p[1].y - p[2].y + a * (pow(p[2].x, 2.0) - pow(p[1].x, 2.0)) ) / (p[1].x - p[2].x);

		c = p[2].y - a*pow(p[2].x, 2.0) - b*p[2].x;
    }

    float f(float x) const
    {
    	return a*x*x + b*x + c;
    }
};

#endif // CURVE_H