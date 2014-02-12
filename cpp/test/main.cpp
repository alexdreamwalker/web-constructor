#include <iostream>
#include "../sunblind/verticalsunblind.hpp"

using namespace std;

int main()
{
    VerticalSunblind sunblind; //объект жалюзи
    Cornice cornice; //объект карниза(это хрень сверху жалюзи в которой расположен поворотный механизм)
    VerticalLayer vlayer; //первый слой вертикальный ламелей
    Lamella lamellaone; //первая ламель(это такие хрени в виде длинных палочек, которые составляют основную часть жалюзи)
    Lamella lamellatwo; //вторая ламель
    Lamella lamellathree;   //третья ламель
    vlayer.addLamella(lamellaone); //добавим в первый слой первую ламель
    vlayer.addLamella(lamellatwo);  //добавим в первый слой вторую ламель
    VerticalLayer vlayertwo; //второй слой вертикальных ламелей
    vlayertwo.addLamella(lamellathree); //добавим во второй слой третью ламель
    sunblind.setCornice(cornice); //установим в жалюзи карниз
    sunblind.addLayer(vlayer); //добавим в жалюзи первый слой ламелей
    sunblind.addLayer(vlayertwo); //добавим в жалюзи второй слой ламелей

    std::map<std::string, float> price = sunblind.calculate(); // рекурсивно вычислим стоимость жалюзи

     // show content:
    for (std::map<std::string, float>::iterator it=price.begin(); it!=price.end(); ++it) //распечатаем в консоль детализацию расчетов по жалюзи
        std::cout << it->first << " => " << it->second << '\n';

    cout << "Hello World!" << endl;
    return 0;
}

