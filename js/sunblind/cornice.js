function Cornice(options) {
	var self = this;
	this.width = options.width;
	this.height = options.size;
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.NS = global.NS;

	this.selected = false;
	this.hovered = false;

	this.material = {
		url: "",
		name: "",
		id: 0,
		price: 0
	};

	this.control = {
		length: this.width,
		type: "В разные стороны"
	};
}

Cornice.prototype.paint = function(options) {
	var self = this;
	this.context = this.sunblind.element;
	this.element = document.createElementNS(this.NS, "rect");

	this.element.onmousedown = function(e) {
		self.selected = !self.selected;
		self.repaint();
	};
	this.element.onmouseup = function(e) {
		global.ui.showDesigner("cornice");	
	};

	this.repaint();
	this.context.appendChild(this.element);
};

Cornice.prototype.repaint = function() {
	var coords = global.axisArea.contextToMap({x: this.x, y: this.y, width: this.width, height: this.height});
	this.element.setAttribute("x", coords.x);
	this.element.setAttribute("y", coords.y);
	this.element.setAttribute("width", coords.width);
	this.element.setAttribute("height", coords.height);
	this.element.setAttribute("fill", "url(#patternCornice" + this.material.id + ")");
};	

Cornice.prototype.setMaterial = function(material) {
	this.material = material;
	this.selected = false;
	this.repaint();
};

Cornice.prototype.calculate = function(options) {
	var result = 0;
	return result;
};

Cornice.prototype.fromJSON = function(obj) {
	this.width = obj.width;
	this.height = obj.height;
	this.material.price = obj.price;
	this.material.id = obj.id;
	this.material.url = obj.url;
};

Cornice.prototype.toJSON = function() {
	return {
		width: this.width,
		size: this.height,
		price: this.material.price,
		id: this.material.id,
		url: this.material.url,
		minCornLength: define.sunblind.MIN_CORNICE_LENGTH
	};
};

Cornice.prototype.generate = function(options) {
	var material = options.generator.generateCorniceMaterial();
	return {
		width: options.width,
		size: options.height,
		price: material.Price,
		id: material.ID,
		url: material.Color,
		minCornLength: define.sunblind.MIN_CORNICE_LENGTH
	};
};

Cornice.prototype.mutate = function(options) {
	return Cornice.prototype.generate.call(this, options);
};