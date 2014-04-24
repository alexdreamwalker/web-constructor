function Sunblind(options) {
	var self = this;
	this.defs = document.createElementNS(this.NS, "defs");
	this.element = document.createElementNS(this.NS, "g");
	this.elem = options.elem;
}

Sunblind.prototype = Object.create(Construction.prototype);

Sunblind.prototype.elem = this.elem;
Sunblind.prototype.layers = [];
Sunblind.prototype.cornice = null;
Sunblind.prototype.decorPlank = null;
Sunblind.prototype.complectation = [];
Sunblind.prototype.NS = global.NS;

Sunblind.prototype.addLayer = function(layer) {
	layer.sunblind = this;
	this.layers.push(layer);
};

Sunblind.prototype.addComplectation = function(complectation) {
	complectation.sunblind = this;
	this.complectation.push(complectation);
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

Sunblind.prototype.toJSON = function(options) {
	return JSON.stringify(this);
};

Sunblind.prototype.fromJSON = function(json) {
	var layers = json.layers;
	for(var i = 0; i < layers.length; i++) {
		var layer = new Layer();
		layer.fromJSON(layers[i]);
		this.addLayer(layer);
	}

	var cornice = new Cornice();
	cornice.fromJSON(json.cornice);
	this.setCornice(cornice);

	var complectation = json.complectation;
	for(var i = 0; i < complectation.length; i++) {
		var complect = null;
		switch(complectation.type) {
			default: complect = new Complectation(); break;
		};
		this.addComplectation(complect);
	}
};

Sunblind.prototype.changeWidth = function(newWidth) {
	console.log("new width : " + newWidth);
	this.width = newWidth;
	this.cornice.width = newWidth;
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].width = newWidth;
	this.repaint();
};

Sunblind.prototype.changeHeight = function(newHeight) {
	console.log("new height : " + newHeight);
	this.height = newHeight;
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].height = newHeight;
	this.repaint();
};

Sunblind.prototype.test = function(options) {
	//	body...

};