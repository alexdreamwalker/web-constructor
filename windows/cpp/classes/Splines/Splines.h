#ifndef SPLINE_H
#define SPLINE_H

#include <cstdlib>
#include <cmath>
#include <limits>
#include <algorithm>
//class Curve;
//class CubicSpline;
//class AkimaSpline;
//#include <../../Converter.cc>

class Splines
{
public:
    struct Spline
    {
        float a, b, c, d, x;
    };

    Spline *splines;
    std::size_t n;

    Splines(); //конструктор
    ~Splines(); //деструктор
    void freeMem();
    static Splines* createSpline(int type);
    virtual void buildSpline(const std::vector<Point> points) = 0;
    virtual float f(float x) const = 0;
    void tridiagonalMatrixAlgorithm(const std::vector<Point> points); // метод прогонки
};

Splines::Splines() : splines(NULL)
{

}

void Splines::freeMem()
{
    delete[] splines;
    splines = NULL;
}

Splines::~Splines()
{
    freeMem();
}

void Splines::tridiagonalMatrixAlgorithm(const std::vector<Point> points)
{
    // Прямой ход

    float *alpha = new float[n - 1];
    float *beta = new float[n - 1];
    float a, b, c, f, z;

    alpha[0] = beta[0] = 0.;
    for (std::size_t i = 1; i < n - 1; i++)
    {
        a = points[i].x - points[i - 1].x;
        b = points[i + 1].x - points[i].x;
        c = 2. * (a + b);
        f = 6. * ((points[i + 1].y - points[i].y) / b - (points[i].y - points[i - 1].y) / a);
        z = (a * alpha[i - 1] + c);
        alpha[i] = -b / z;
        beta[i] = (f - a * beta[i - 1]) / z;
    }

    splines[n - 1].c = (f - a * beta[n - 2]) / (c + a * alpha[n - 2]);

    // Обратный ход
    for (std::size_t i = n - 2; i > 0; i--)
        splines[i].c = alpha[i] * splines[i + 1].c + beta[i];

    delete[] beta;
    delete[] alpha;
}


#endif // SPLINE_H
