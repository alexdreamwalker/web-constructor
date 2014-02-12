function Lamella(options) {
	var self = this;
	this.element = null;
	this.context = this.layer.element;
	this.width = options.width;
	this.height = options.height;
	this.x = options.x;
	this.y = options.y;
	this.NS = global.NS;
}

Lamella.prototype.paint = function(options) {
	this.element = document.createElementNS(this.NS, "rect");
	this.element.setAttribute("x", this.x);
	this.element.setAttribute("y", this.y);
	this.element.setAttribute("width", this.width);
	this.element.setAttribute("height", this.height);
	this.context.appendChild(this.element);
};