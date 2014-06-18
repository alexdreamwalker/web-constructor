class Painter;
class Object
{
private:
	int index;
	std::vector<int> bufferIndices;
	int typeObject;
	int detailObject;
	float price;
	float borderPoints[4];				// topY, rightX, downY, leftX
	Painter *painter;

	//void fillBuffersObject(std::vector<Buffer> buffers);

public:
	Object() {};
	Object(std::vector<int> bufferIndices, Painter* painter, int index);
	~Object() {};

	void setPrice(float value);
	float getWidth();
	float getHeight();
	float getArea();
	float getPrice();
	float getTotalPrice();

	void defineBorderObject();

	Json::Value getJsonInfo();
	int searchBuffer(int indexBuffer);
	std::vector<int> getIndicesBuffer();
	void setColor(Color color);

	virtual int checkRestriction() const = 0;
};

#include "Construction.h"
#include "Painter.h"

Object::Object(std::vector<int> bufferIndices, Painter* painter, int index)
{
	this->painter = painter;
	this->index = index;
	this->bufferIndices = std::vector<int>(bufferIndices.begin(), bufferIndices.end());
	//fillBuffersObject(buffers);
	defineBorderObject();
}

/*void Object::fillBuffersObject(std::vector<Buffer> buffers)
{
	int n = buffers.size();
	for (int i = 0; i < n; ++i)
	{
		this->buffers.push_back(buffers[i]);
	}
}*/

void Object::setPrice(float value)
{
	price = value;
}

float Object::getWidth()
{
	return (sqrt(pow((borderPoints[3] - borderPoints[1]), 2.0)) / GL_STEP) * RATIO_STEP_SIZE / 100;
}

float Object::getHeight()
{
	return (sqrt(pow((borderPoints[2] - borderPoints[0]), 2.0)) / GL_STEP) * RATIO_STEP_SIZE / 100;
}

float Object::getArea()
{
	return getWidth()*getHeight();
}

float Object::getPrice()
{
	return price;
}

float Object::getTotalPrice()
{
	return getArea() * price;
}

void Object::defineBorderObject()
{
	borderPoints[0] = -1000.0;
	borderPoints[1] = -1000.0;
	borderPoints[2] = 1000.0;
	borderPoints[3] = 1000.0;

	int n = this->bufferIndices.size();

	for (int i = 0; i < n; ++i)
	{
		int nPoints = painter->getBuffer(this->bufferIndices[i])->vertices.size();

		for (int j = 0; j < nPoints; ++j)
		{
				if(painter->getBuffer(this->bufferIndices[i])->vertices[j].x > borderPoints[1])
					borderPoints[1] = painter->getBuffer(this->bufferIndices[i])->vertices[j].x;

				if(painter->getBuffer(this->bufferIndices[i])->vertices[j].x < borderPoints[3])
					borderPoints[3] = painter->getBuffer(this->bufferIndices[i])->vertices[j].x;

				if(painter->getBuffer(this->bufferIndices[i])->vertices[j].y < borderPoints[2])
					borderPoints[2] = painter->getBuffer(this->bufferIndices[i])->vertices[j].y;

				if(painter->getBuffer(this->bufferIndices[i])->vertices[j].y > borderPoints[0])
					borderPoints[0] = painter->getBuffer(this->bufferIndices[i])->vertices[j].y;
		}
	}
}

Json::Value Object::getJsonInfo()
{
	Json::Value res;

	int nBufferIndicies = this->bufferIndices.size();

	res["index"] = index;
	
	for(int i = 0; i < nBufferIndicies; i++)
	{
    	res["bufferIndicies"][i] = this->bufferIndices[i];
	}

	res["width"] = Converter::numberToString(getWidth());
	res["height"] = Converter::numberToString(getHeight());
	res["price"] = Converter::numberToString(getPrice());
	res["priceRound"] = Converter::numberToString(Converter::round(getPrice(), 100));
	res["totalPrice"] = Converter::numberToString(getTotalPrice());
	res["area"] = Converter::numberToString(getArea());
	res["color"]["r"] = 1;
	res["color"]["g"] = 1;
	res["color"]["b"] = 1;

	res["borderPoints"]["topY"] = Converter::numberToString(borderPoints[0]);
	res["borderPoints"]["rightX"] = Converter::numberToString(borderPoints[1]);
	res["borderPoints"]["downY"] = Converter::numberToString(borderPoints[2]);
	res["borderPoints"]["leftX"] = Converter::numberToString(borderPoints[3]);
	
	/*int n = this->bufferIndices.size();
	for (int i = 0; i < n; ++i)
	{
		int nPoints = painter->getBuffer(this->bufferIndices[i]).vertices.size();

		for (int j = 0; j < nPoints; ++j)
		{
				res["points"][j]["x"] = Converter::numberToString(painter->getBuffer(this->bufferIndices[i]).vertices[j].x);
				res["points"][j]["y"] = Converter::numberToString(painter->getBuffer(this->bufferIndices[i]).vertices[j].y);
		}
	}*/

	return res;
}

int Object::searchBuffer(int indexBuffer)
{
	if(find(this->bufferIndices.begin(), this->bufferIndices.end(), indexBuffer)
		!= this->bufferIndices.end())
		return index;

	return -1;
}

std::vector<int> Object::getIndicesBuffer()
{
	return bufferIndices;
}

void Object::setColor(Color color)
{
	int nBuffer = bufferIndices.size();

	for (int j = 0; j < nBuffer; ++j)
	{
		int index = bufferIndices[j];
		painter->getBuffer(index)->colors.clear();
		painter->getBuffer(index)->colors = std::vector<Color>(painter->getBuffer(index)->vertices.size() * 2, color);
	}
}