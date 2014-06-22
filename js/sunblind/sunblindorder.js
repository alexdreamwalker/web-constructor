function SunblindOrder(options) {

};

SunblindOrder.prototype = Object.create(Order.prototype);

SunblindOrder.prototype.addConstruction = function(construction) {
	Order.prototype.addConstruction.apply(this, arguments);
	switch(construction.type) {
		case define.sunblind.ID_VERTICAL:
			this.constructionDetail = "Жалюзи Вертикальные";
			break;
		case define.sunblind.ID_HORIZONTAL:
			this.constructionDetail = "Жалюзи Горизонтальные";
			break;
		case define.sunblind.ID_MULTI:
			this.constructionDetail = "Жалюзи Мультифактурные";
			break;
		default:
			this.constructionDetail = "Жалюзи";
			break;
	}
};

SunblindOrder.prototype.generateMainBlock = function() {	
	if(this.constructions.length == 0)
		return;

	var table = document.createElement("table");

	var thead = document.createElement("thead");
	thead.appendChild(createDOMElement("th", "№ п/п"));
	thead.appendChild(createDOMElement("th", "Материал/карниз"));
	thead.appendChild(createDOMElement("th", "Ширина"));
	thead.appendChild(createDOMElement("th", "Высота"));
	thead.appendChild(createDOMElement("th", "Управление"));
	thead.appendChild(createDOMElement("th", "Длина управления"));
	thead.appendChild(createDOMElement("th", "Стоимость"));
	thead.appendChild(createDOMElement("th", "Кол-во"));
	thead.appendChild(createDOMElement("th", "Сумма"));
	table.appendChild(thead);

	var tbody = document.createElement("tbody");
	for(var i = 0; i < this.constructions.length; i++) {
		var construction = this.constructions[i];

		var layers = construction.layers;
		for(var j = 0; j < layers.length; j++)
			for(var z = 0; z < layers[j].materials.length; z++) {
				var tr = document.createElement("tr");
				tr.appendChild(createDOMElement("td", i + 1));
				tr.appendChild(createDOMElement("td", layers[j].materials[z].name));
				tr.appendChild(createDOMElement("td", parseInt(layers[j].width * (layers[j].materials[z].count / layers[j].lamellas.length))));
				tr.appendChild(createDOMElement("td", layers[j].height));
				tr.appendChild(createDOMElement("td", ""));
				tr.appendChild(createDOMElement("td", ""));
				tr.appendChild(createDOMElement("td", parseInt(layers[j].materials[z].price)));
				tr.appendChild(createDOMElement("td", construction.count));
				tr.appendChild(createDOMElement("td", parseInt(layers[j].materials[z].price) * construction.count));
				tbody.appendChild(tr);
			}

		var cornice = construction.cornice;
		var tr = document.createElement("tr");
		tr.appendChild(createDOMElement("td", i + 1));
		tr.appendChild(createDOMElement("td", cornice.material.name));
		tr.appendChild(createDOMElement("td", construction.width));
		tr.appendChild(createDOMElement("td", construction.height));
		tr.appendChild(createDOMElement("td", cornice.control.type));
		tr.appendChild(createDOMElement("td", cornice.control.length));
		tr.appendChild(createDOMElement("td", parseInt(cornice.material.price)));
		tr.appendChild(createDOMElement("td", construction.count));
		tr.appendChild(createDOMElement("td", construction.count * parseInt(cornice.material.price)));
		tbody.appendChild(tr);

		if(construction.decorPlank.isActive) {
			var decorPlank = construction.decorPlank;
			var tr = document.createElement("tr");
			tr.appendChild(createDOMElement("td", i + 1));
			tr.appendChild(createDOMElement("td", "Декор. планка: " + decorPlank.material.name));
			tr.appendChild(createDOMElement("td", decorPlank.width));
			tr.appendChild(createDOMElement("td", decorPlank.height));
			tr.appendChild(createDOMElement("td", ""));
			tr.appendChild(createDOMElement("td", ""));
			tr.appendChild(createDOMElement("td", parseInt(decorPlank.material.price)));
			tr.appendChild(createDOMElement("td", construction.count));
			tr.appendChild(createDOMElement("td", construction.count * parseInt(decorPlank.material.price)));
			tbody.appendChild(tr);
		}


		for(var j = 0; j < construction.complectation.length; j++) {
			var complectation = construction.complectation[j];
			var tr = document.createElement("tr");
			tr.appendChild(createDOMElement("td", i + 1));
			tr.appendChild(createDOMElement("td", complectation.name));
			tr.appendChild(createDOMElement("td", construction.width));
			tr.appendChild(createDOMElement("td", construction.height));
			tr.appendChild(createDOMElement("td", ""));
			tr.appendChild(createDOMElement("td", ""));
			tr.appendChild(createDOMElement("td", parseInt(complectation.price)));
			tr.appendChild(createDOMElement("td", construction.count));
			tr.appendChild(createDOMElement("td", parseInt(complectation.price) * construction.count));
			tbody.appendChild(tr);
		}
	}
	table.appendChild(tbody);

	var div = document.createElement("div");
	div.appendChild(table);
	return div;
};

SunblindOrder.prototype.generateAdditionalPage = function() {
	var svg = "";
	for(var i = 0; i < this.constructions.length; i++)
		svg += this.constructions[i].sketch;
	var div = document.createElement("div");
	div.innerHTML = svg;
	return div;
};