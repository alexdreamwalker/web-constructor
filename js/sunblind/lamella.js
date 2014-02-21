function Lamella(options) {
	var self = this;
	this.element = null;
	this.width = options.width;
	this.height = options.height;
	this.x = options.x;
	this.y = options.y;
	this.NS = global.NS;
}

Lamella.prototype.paint = function(options) {
	this.context = this.layer.element;
	this.element = document.createElementNS(this.NS, "rect");
	var coords = global.axisArea.contextToMap({x: this.x, y: this.y, width: this.width, height: this.height});
	this.element.setAttribute("x", coords.x);
	this.element.setAttribute("y", coords.y);
	this.element.setAttribute("width", coords.width);
	this.element.setAttribute("height", coords.height);
	this.context.appendChild(this.element);
};