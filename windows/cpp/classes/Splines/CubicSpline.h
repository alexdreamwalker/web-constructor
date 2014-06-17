#ifndef CUBICSPLINE_H
#define CUBICSPLINE_H

#include "Splines.h"

class CubicSpline : public Splines
{
public:
    CubicSpline() {} //конструктор
    ~CubicSpline() {} //деструктор
    void buildSpline(const std::vector<Point> points);
    //void tridiagonalMatrixAlgorithm(const double *x, const double *y); // метод прогонки
    float f(float x) const;
};

void CubicSpline::buildSpline(const std::vector<Point> points)
{
    freeMem();
    this->n = points.size();

    // Инициализация массива сплайнов
    splines = new Spline[n];
    for (std::size_t i = 0; i < n; i++)
    {
        splines[i].x = points[i].x;
        splines[i].a = points[i].y;
    }
    splines[0].c = 0.;

    tridiagonalMatrixAlgorithm(points);

    // По известным коэффициентам c[i] находим значения b[i] и d[i]
    for (std::size_t i = n - 1; i > 0; i--)
    {
        float difX = points[i].x - points[i - 1].x;
        splines[i].d = (splines[i].c - splines[i - 1].c) / difX;
        splines[i].b = difX * (2. * splines[i].c + splines[i - 1].c) / 6. + (points[i].y - points[i - 1].y) / difX;
    }
}

float CubicSpline::f(float x) const
{
    if (!splines)
        return std::numeric_limits<float>::quiet_NaN();

    Spline *s;
    if (x <= splines[0].x)
        s = splines + 1;
    else if (x >= splines[n - 1].x)
        s = splines + n - 1;
    else
    {
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
    }

    float dx = (x - s->x);
    return s->a + (s->b + (s->c / 2. + s->d * dx / 6.) * dx) * dx;
}

#endif // CUBICSPLINE_H
