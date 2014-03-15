function DecorPlank(options) {
	var self = this;
	this.width = options.width;
	this.height = options.size;
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.NS = global.NS;
	this.isActive = options.isActive;
}

DecorPlank.prototype.paint = function(options) {
	this.context = this.sunblind.element;
	this.element = document.createElementNS(this.NS, "rect");
	this.repaint();
	if(!this.isActive) this.element.style.display = "none";
	this.context.appendChild(this.element);
};

DecorPlank.prototype.setActive = function(isActive) {
	this.isActive = isActive;
	if(this.isActive) this.element.style.display = "";
	else this.element.style.display = "none";
};

DecorPlank.prototype.setWidth = function(newWidth) {
	this.width = newWidth;
	this.repaint();
};

DecorPlank.prototype.repaint = function() {
	var offset = (this.width - this.sunblind.width) / 2;
	var coords = global.axisArea.contextToMap({x: this.x - offset * 2, y: this.y - 10, width: this.width + offset * 2, height: this.height + 20});
	this.element.setAttribute("x", coords.x);
	this.element.setAttribute("y", coords.y);
	this.element.setAttribute("width", coords.width);
	this.element.setAttribute("height", coords.height);
	this.element.setAttribute("style", "stroke: #000000; fill: none; stroke-width: 0.001px; stroke-dasharray: 0.005 0.005");
	this.element.setAttribute("opacity", "0.5");
};

DecorPlank.prototype.calculate = function(options) {
	var result = 0;
	return result;
};