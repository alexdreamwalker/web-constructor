function Sunblind(options) {
	var self = this;
	this.defs = document.createElementNS(this.NS, "defs");
	this.element = document.createElementNS(this.NS, "g");
	this.elem = options.elem;
	Construction.apply(this, arguments);
	global.order = new SunblindOrder();
}

Sunblind.prototype = Object.create(Construction.prototype);

Sunblind.prototype.placements = [];
Sunblind.prototype.materials = [];
Sunblind.prototype.cornices = [];
Sunblind.prototype.colors = [];
Sunblind.prototype.sizes = [];
Sunblind.prototype.sizeLimits = [];
Sunblind.prototype.complectations = [];

Sunblind.prototype.activeLayer = 0;
Sunblind.prototype.placement = null;
Sunblind.prototype.width = 0;
Sunblind.prototype.height = 0;
Sunblind.prototype.elem = this.elem;
Sunblind.prototype.layers = [];
Sunblind.prototype.cornice = null;
Sunblind.prototype.decorPlank = null;
Sunblind.prototype.complectation = [];
Sunblind.prototype.NS = global.NS;
Sunblind.prototype.type = 0;
Sunblind.prototype.lamellaOrientation = 0;
Sunblind.prototype.lesVer = null;

Sunblind.prototype.addLayer = function(layer) {
	layer.sunblind = this;
	this.layers.push(layer);
};

Sunblind.prototype.addComplectation = function(complectation) {
	for(var i = 0; i < this.complectation.length; i++)
		if(this.complectation[i].id == complectation.id)
			return;
	complectation.sunblind = this;
	this.complectation.push(complectation);
	this.sendToCalculate();
};

Sunblind.prototype.setPlacement = function(placement) {
	this.placement = placement;
	this.sendToCalculate();
};

Sunblind.prototype.setCornice = function(cornice) {
	cornice.sunblind = this;
	this.cornice = cornice;
};

Sunblind.prototype.setDecorPlank = function(plank) {
	plank.sunblind = this;
	this.decorPlank = plank;
};

Sunblind.prototype.showDecorPlank = function(isActive) {
	this.decorPlank.setActive(isActive);
	this.sendToCalculate();
};

Sunblind.prototype.paint = function(options) {
	var axisArea = new AxisArea({elem: this.elem, dimensions : {width: this.width, height: this.height}});
	global.axisArea = axisArea;
	this.cornice.paint();
	this.decorPlank.paint();
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].paint();
	for(var i = 0; i < this.complectation.length; i++)
		this.complectation[i].paint();
	axisArea.root.insertBefore(this.defs, axisArea.root.firstChild);
	axisArea.context.appendChild(this.element);
	axisArea.addConstruction(this);
	return axisArea.root;
};

Sunblind.prototype.repaint = function(options) {
	this.element.innerHTML = "";
	this.cornice.paint();
	this.decorPlank.paint();
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].paint();
	for(var i = 0; i < this.complectation.length; i++)
		this.complectation[i].paint();
};

Sunblind.prototype.calculate = function(options) {
	var result = [];
	var lamellaPrice = 0;
	for(var i = 0; i < this.layers.length; i++)
		lamellaPrice += this.layers[i].calculate();
	var cornicePrice = this.cornice.calculate();
	var complectationPrice = 0;
	for(var i = 0; i < this.complectation.length; i++)
		complectationPrice += this.complectation[i].calculate();

	result["Ламели"] = lamellaPrice;
	result["Карниз"] = cornicePrice;
	result["Комплектация"] = complectationPrice;
	return result;
};

Sunblind.prototype.fromJSON = function(json) {
	this.width = json.width;
	this.height = json.height;
	this.complectation = json.complectation;
	this.type = json.type;

	var layers = json.layers;
	for(var i = 0; i < layers.length; i++) {
		var layer = new Layer();
		layer.fromJSON(layers[i]);
		this.addLayer(layer);
	}

	var cornice = new Cornice();
	cornice.fromJSON(json.cornice);
	this.setCornice(cornice);

	var decorPlank = new DecorPlank();
	decorPlank.fromJSON(json.decorPlank);
	this.setDecorPlank(decorPlank);

	var complectation = json.complectation;
	for(var i = 0; i < complectation.length; i++) {
		var complect = null;
		switch(complectation.type) {
			default: complect = new Complectation({id: complectation[i].id, name: complectation[i].name, price: complectation[i].price}); break;
		};
		this.addComplectation(complect);
	}
};

Sunblind.prototype.toJSON = function() {
	var layers = [];
	for(var i = 0; i < this.layers.length; i++)
		layers.push(this.layers[i].toJSON());
	var complectation = [];
	for(var i = 0; i < this.complectation.length; i++)
		complectation.push(this.complectation[i].toJSON());
	var obj = {
		type: this.type,
		placement: this.placement,
		width: this.width,
		height: this.height,
		cornice: this.cornice.toJSON(),
		"layers": layers,
		decorPlank: this.decorPlank.toJSON(),
		"complectation": complectation
	};
	return obj;
};

Sunblind.prototype.sendToCalculate = function() {
	var data = this.toJSON();
	console.log(data);
	cppOperator.postMessage("countSunblinds", {"data": data}, function(response) {
		var data = JSON.parse(response).data;
		uiOperator.setPriceTable(data);
	});
};

Sunblind.prototype.changeWidth = function(newWidth) {
	if(this.checkSizeLimits(newWidth, this.height)) {
		this.width = newWidth;
		this.cornice.width = newWidth;
		for(var i = 0; i < this.layers.length; i++)
			this.layers[i].width = newWidth;
		this.repaint();
		this.sendToCalculate();
	} else {
		alert("Введено недопустимое значение");
	}
};

Sunblind.prototype.changeHeight = function(newHeight) {
	if(this.checkSizeLimits(this.width, newHeight)) {
		this.height = newHeight;
		for(var i = 0; i < this.layers.length; i++)
			this.layers[i].height = newHeight;
		this.repaint();
		this.sendToCalculate();
	} else {
		alert("Введено недопустимое значение");
	}
};

Sunblind.prototype.checkSizeLimits = function(width, height) {
	return true;
	var limit = this.getSizeArray()[0];
	if(limit != null)
		return (width >= limit.MinWidth) && (width <= limit.MaxWidth) && (height >= limit.MinHeight) && (height <= limit.MaxHeight);
	else
		return undefined;
};

Sunblind.prototype.getSizeArray = function() {
	var result = true;
	var type = this.type;
	var placement = this.placement.id;
	var material = getSelectValue("sunblindsMaterials").dataset.id;
	var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
	var complectation = this.complectation[0].id;
	var limits = this.sizeLimits;

	var stage = [];
	var finalStage = [];
	for(var i = 0; i < limits.length; i++)
		if(limits[i].IDType == type || limits[i].IDType == null)
			stage.push(limits[i]);
	
	if(stage.length == 0) return finalStage;
	finalStage = stage.slice();
	stage = [];
	for(var i = 0; i < finalStage.length; i++)
		if(finalStage[i].IDMaterial == material || finalStage[i].IDMaterial == null)
			stage.push(finalStage[i]);

	if(stage.length == 0) return finalStage;
	finalStage = stage.slice();
	stage = [];
	for(var i = 0; i < finalStage.length; i++)
		if(finalStage[i].IDPlacement == placement || finalStage[i].IDPlacement == null)
			stage.push(finalStage[i]);

	if(stage.length == 0) return finalStage;
	finalStage = stage.slice();
	stage = [];
	for(var i = 0; i < finalStage.length; i++)
		if(finalStage[i].Size == size || finalStage[i].Size == null)
			stage.push(finalStage[i]);

	if(stage.length == 0) return finalStage;
	finalStage = stage.slice();
	stage = [];
	for(var i = 0; i < finalStage.length; i++)
		if(finalStage[i].IDComplectation == complectation || finalStage[i].IDComplectation == null)
			stage.push(finalStage[i]);

	if(stage.length == 0) return finalStage;
	return stage;
};

Sunblind.prototype.test = function(options) {
	//	body...

};