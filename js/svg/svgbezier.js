function SVGBezier(options) {
	this.context = options.context;
	this.x0 = options.x0 || 0;
	this.y0 = options.y0 || 0;
	this.x1 = options.x1 || 0.3;
	this.y1 = options.y1 || 0.5;
	this.x2 = options.x2 || 0.7;
	this.y2 = options.y2 || 0.7;
	this.x = options.x || 1;
	this.y = options.y || 1;

	this.element = null;
	this.x0element = null;
	this.x1element = null;
	this.x2element = null;
	this.xelement = null;

	this.NS = "http://www.w3.org/2000/svg";
	this.isActive = true;
}

SVGBezier.prototype.init = function() {
	return "M" + this.x0 + "," + this.y0 + " C" + this.x1 + "," + this.y1 + " " + this.x2 + "," + this.y2 + " " + this.x + "," + this.y;
};

SVGBezier.prototype.paint = function() {
	var self = this;
	var path = document.createElementNS(this.NS, "path");
	var d = this.init();
	path.setAttribute("d", d);
	path.setAttribute("stroke", "blue");
	path.setAttribute("stroke-width", "0.01");
	path.setAttribute("fill", "none");
	this.element = path;
	this.context.appendChild(this.element);

	var x0element = document.createElementNS(this.NS, "circle");
	x0element.setAttribute("stroke", "red");
	x0element.setAttribute("stroke-width", "0.01");
	x0element.setAttribute("fill", "red");
	x0element.setAttribute("r", "0.01");
	x0element.setAttribute("cx", this.x0);
	x0element.setAttribute("cy", this.y0);
	x0element.addEventListener("mousedown", function(e) { this.isDragged = true; });
	x0element.addEventListener("mouseup", function(e) { this.isDragged = false; });
	x0element.addEventListener("mouseout", function(e) { this.isDragged = false; });
	x0element.addEventListener("mousemove", function(e) {
		if(!this.isDragged) return;
		var coords = axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = axisArea.contextToMap(coords);
		self.setX0(coords.x);
		self.setY0(coords.y);
	});
	this.x0element = x0element;

	var x1element = document.createElementNS(this.NS, "circle");
	x1element.setAttribute("stroke", "red");
	x1element.setAttribute("stroke-width", "0.01");
	x1element.setAttribute("fill", "red");
	x1element.setAttribute("r", "0.01");
	x1element.setAttribute("cx", this.x1);
	x1element.setAttribute("cy", this.y1);
	x1element.setAttribute("draggable", "true");
	x1element.isDragged = false;
	x1element.addEventListener("mousedown", function(e) { this.isDragged = true; });
	x1element.addEventListener("mouseup", function(e) { this.isDragged = false; });
	x1element.addEventListener("mouseout", function(e) { this.isDragged = false; });
	x1element.addEventListener("mousemove", function(e) {
		if(!this.isDragged) return;
		var coords = axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = axisArea.contextToMap(coords);
		self.setX1(coords.x);
		self.setY1(coords.y);
	});
	this.x1element = x1element;

	var x2element = document.createElementNS(this.NS, "circle");
	x2element.setAttribute("stroke", "red");
	x2element.setAttribute("stroke-width", "0.01");
	x2element.setAttribute("fill", "red");
	x2element.setAttribute("r", "0.01");
	x2element.setAttribute("cx", this.x2);
	x2element.setAttribute("cy", this.y2);
	x2element.addEventListener("mousedown", function(e) { this.isDragged = true; });
	x2element.addEventListener("mouseup", function(e) { this.isDragged = false; });
	x2element.addEventListener("mouseout", function(e) { this.isDragged = false; });
	x2element.addEventListener("mousemove", function(e) {
		if(!this.isDragged) return;
		var coords = axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = axisArea.contextToMap(coords);
		self.setX2(coords.x);
		self.setY2(coords.y);
	});
	this.x2element = x2element;

	var xelement = document.createElementNS(this.NS, "circle");
	xelement.setAttribute("stroke", "red");
	xelement.setAttribute("stroke-width", "0.01");
	xelement.setAttribute("fill", "red");
	xelement.setAttribute("r", "0.01");
	xelement.setAttribute("cx", this.x);
	xelement.setAttribute("cy", this.y);
	xelement.addEventListener("mousedown", function(e) { this.isDragged = true; });
	xelement.addEventListener("mouseup", function(e) { this.isDragged = false; });
	xelement.addEventListener("mouseout", function(e) { this.isDragged = false; });
	xelement.addEventListener("mousemove", function(e) {
		if(!this.isDragged) return;
		var coords = axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = axisArea.contextToMap(coords);
		self.setX(coords.x);
		self.setY(coords.y);
	});
	this.xelement = xelement;

	this.context.appendChild(this.x0element);
	this.context.appendChild(this.x1element);
	this.context.appendChild(this.x2element);
	this.context.appendChild(this.xelement);
};

SVGBezier.prototype.setX0 = function(x0) {
	this.x0 = x0;
	this.x0element.setAttribute("cx", this.x0);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setY0 = function(y0) {
	this.y0 = y0;
	this.x0element.setAttribute("cy", this.y0);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setX1 = function(x1) {
	this.x1 = x1;
	this.x1element.setAttribute("cx", this.x1);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setY1 = function(y1) {
	this.y1 = y1;
	this.x1element.setAttribute("cy", this.y1);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setX2 = function(x2) {
	this.x2 = x2;
	this.x2element.setAttribute("cx", this.x2);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setY2 = function(y2) {
	this.y2 = y2;
	this.x2element.setAttribute("cy", this.y2);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setX = function(x) {
	this.x = x;
	this.xelement.setAttribute("cx", this.x);
	var d = this.init();
	this.element.setAttribute("d", d);
};

SVGBezier.prototype.setY = function(y) {
	this.y = y;
	this.xelement.setAttribute("cy", this.y);
	var d = this.init();
	this.element.setAttribute("d", d);
};