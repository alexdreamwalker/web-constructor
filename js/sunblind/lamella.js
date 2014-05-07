function Lamella(options) {
	var self = this;
	this.element = null;
	this.width = options.width;
	this.height = options.height;
	this.x = options.x;
	this.y = options.y;
	this.NS = global.NS;
	this.selected = false;
	this.hovered = false;

	this.material = {
		url: "",
		id: 0,
		price: 0
	};
}

Lamella.prototype.paint = function(options) {
	var self = this;
	this.context = this.layer.element;
	this.element = document.createElementNS(this.NS, "rect");
	this.makeElement();
	this.element.onmousedown = function(e) {
		global.ui.designerActive = true;
		self.selected = !self.selected;
		self.makeElement();
	};
	this.element.onmouseup = function(e) {
		global.ui.designerActive = false;
		global.ui.showDesigner();	
	};
	this.element.onmouseover = function(e) {
		if(e.which == 1 && global.ui.designerActive) self.selected = !self.selected;
		else if(e.which == 0) self.hovered = true;
		self.makeElement();
	};
	this.element.onmouseout = function(e) {
		self.hovered = false;
		self.makeElement();
	};
	this.context.appendChild(this.element);
};

Lamella.prototype.setPos = function(options) {
	this.x = options.x;
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;

	this.makeElement();	
};

Lamella.prototype.setMaterial = function(material) {
	this.material = material;
	this.selected = false;
	this.makeElement();
};

Lamella.prototype.makeElement = function() {
	var coords = global.axisArea.contextToMap({x: this.x, y: this.y, width: this.width, height: this.height});
	this.element.setAttribute("x", coords.x);
	this.element.setAttribute("y", coords.y);
	this.element.setAttribute("width", coords.width);
	this.element.setAttribute("height", coords.height);
	this.element.setAttribute("fill", "url(#pattern" + this.material.id + ")");

	if(this.selected || this.hovered) this.element.setAttribute("fill-opacity", "0.5");
	else this.element.setAttribute("fill-opacity", "1.0");
};
