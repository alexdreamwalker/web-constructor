#ifndef AKIMASPLINE_H
#define AKIMASPLINE_H

#include "Splines.h"

class AkimaSpline : public Splines
{
public:
    AkimaSpline() {}    //конструктор
    ~AkimaSpline() {}   //деструктор
    void buildSpline(const std::vector<Point> points);
    float f(float x) const;
};

void AkimaSpline::buildSpline(const std::vector<Point> points)
{
    freeMem();
    this->n = points.size();

    float m[n + 3];
    float difX[n-1], difY[n-1];
    float t[n];

    // Инициализация массива сплайнов
    splines = new Spline[n - 1];

    splines[n - 2].x = points[n - 1].x;
    splines[n - 2].a = points[n - 1].y;

    for (std::size_t i = 0; i < n - 1; i++)
    {
        splines[i].x = points[i].x;
        splines[i].a = points[i].y;
        difX[i] = points[i+1].x - points[i].x;
        difY[i] = points[i+1].y - points[i].y;
    }

    for(int i = 2; i < n + 1; i++)
        m[i] = difY[i - 2] / difX[i - 2];

    m[1] = 2 * m[2] - m[3];
    m[0] = 2 * m[1] - m[2];
    m[n + 1] = 2 * m[n] - m[n - 1];
    m[n + 2] = 2 * m[n + 1] - m[n];

    for(int i = 2; i < n + 2; i++)
        t[i - 2] = (std::abs(m[i + 1]-m[i])*m[i - 1] + std::abs(m[i - 1] - m[i - 2])*m[i]) /
                (std::abs(m[i+1] - m[i]) + std::abs(m[i-1] - m[i - 2]));

    for(int i = 0; i < n - 1; i++)
    {
        splines[i].b = t[i];
        splines[i].c = (3*m[i + 2] - 2*t[i] - t[i + 1]) / difX[i];
        splines[i].d = (t[i] + t[i + 1] - 2*m[i + 2]) / pow(difX[i], 2.0);
    }
}

float AkimaSpline::f(float x) const
{
    if (!splines)
        return std::numeric_limits<float>::quiet_NaN();

    Spline *s;
    /*if (x <= splines[0].x)
        s = splines;
    else if (x >= splines[n - 1].x)
        s = splines + n - 2;
    else
    {    for(int i = 0; i < n -1; i++)
        std::size_t i = 0, j = n - 1;
        while (i + 1 < j)
        {
            std::size_t k = i + (j - i) / 2;
            if (x <= splines[k].x)
                j = k;
            else
                i = k;
        }
        s = splines + j;
    }*/

    for(int i = 0; i < n - 1; i++)
        if(x >= splines[i].x)
            s = splines + i;

    float dx = (x - s->x);
    return s->a +s->b*dx + s->c*pow(dx, 2.0) + s->d*pow(dx, 3.0);
}

#endif // AKIMASPLINE_H
