function Arc(options) {
	this.context = null;
	this.x0 = options.x0;
	this.x = options.x;
	this.y0 = options.y0;
	this.y = options.y;

	this.xRadius = 0.05;
	this.yRadius = 0.1;

	this.element = null;
	this.strokeWidth = 0.002;

	this.NS = global.NS;
}

Arc.prototype.init = function() {
	return "M" + this.x0 + "," + this.y0 + " A" + this.xRadius + "," + this.yRadius + " 0 0,0 " + this.x + "," + this.y; 
};

Arc.prototype.paint = function() {
	this.context = this.layer.element;
	var self = this;

	var element = document.createElementNS(this.NS, "path");
	element.setAttribute("stroke", "red");
	element.setAttribute("stroke-width", this.strokeWidth);
	element.setAttribute("fill", "none");
	element.setAttribute("d", this.init());
	this.element = element;

	this.context.appendChild(this.element);
};

Arc.prototype.setPos = function(x0, y0, x, y) {
	this.x0 = x0;
	this.y0 = y0;
	this.x = x;
	this.y = y;
	this.element.setAttribute("d", this.init());
};