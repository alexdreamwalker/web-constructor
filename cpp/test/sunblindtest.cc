#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include "../classes/sunblind/multifactory.cc"

using namespace std;

std::string readFromFile(char* filename)
{
	std::string data;
	std::ifstream input(filename);
	std::stringstream buffer;
	buffer << input.rdbuf();
	data = buffer.str();
	return data;
}

int main()
{
	std::string data = readFromFile("data.json");
	Factory* factory = new MultiFactory();
	Construction* sunblind = factory->fromJSON(data);
	std::map<std::string, float> price = sunblind->calculate();

	for (std::map<std::string, float>::iterator it=price.begin(); it!=price.end(); ++it) //распечатаем в консоль детализацию расчетов по жалюзи
        std::cout << it->first << " => " << it->second << '\n';

    delete sunblind;
    delete factory;
    std::cout << "\n ready \n";
    return 0;      
}
