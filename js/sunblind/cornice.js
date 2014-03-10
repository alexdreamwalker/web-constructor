function Cornice(options) {
	var self = this;
	this.width = options.width;
	this.height = options.size;
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.NS = global.NS;
}

Cornice.prototype.paint = function(options) {
	this.context = this.sunblind.element;
	this.element = document.createElementNS(this.NS, "rect");
	var coords = global.axisArea.contextToMap({x: this.x, y: this.y, width: this.width, height: this.height});
	this.element.setAttribute("x", coords.x);
	this.element.setAttribute("y", coords.y);
	this.element.setAttribute("width", coords.width);
	this.element.setAttribute("height", coords.height);
	this.context.appendChild(this.element);
};

Cornice.prototype.calculate = function(options) {
	var result = 0;
	return result;
};