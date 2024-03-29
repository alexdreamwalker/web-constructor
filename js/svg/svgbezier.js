function SVGBezier(options) {
	this.context = null;
	this.x0 = options.x0 || 0;
	this.y0 = options.y0 || 0;
	this.x1 = options.x1 || 0.3;
	this.y1 = options.y1 || 0.5;
	this.x2 = options.x2 || 0.7;
	this.y2 = options.y2 || 0.7;
	this.x = options.x || 1;
	this.y = options.y || 1;

	this.maxmin = {
		x0: {min: 0, max: 1},
		y0: {min: 0, max: 1},
		x1: {min: 0, max: 1},
		y1: {min: 0, max: 1},
		x2: {min: 0, max: 1},
		y2: {min: 0, max: 1},
		x: {min: 0, max: 1},
		y: {min: 0, max: 1}
	};

	this.NS = global.NS;

	this.element = document.createElementNS(this.NS, "g");;
	this.path = null;
	this.x0element = null;
	this.x1element = null;
	this.x2element = null;
	this.xelement = null;

	this.strokeWidth = 0.005;

	this.isActive = true;
	this.activeElement = null;
	this.pointsActive = false;
}

SVGBezier.prototype.init = function() {
	return "M" + this.x0 + "," + this.y0 + " C" + this.x1 + "," + this.y1 + " " + this.x2 + "," + this.y2 + " " + this.x + "," + this.y;
};

SVGBezier.prototype.getValue = function(t) {
	var b1 =  Math.pow(t, 3);
	var b2 = 3 * Math.pow(t, 2) * (1 - t);
	var b3 =  3 * t * Math.pow(1 - t, 2);
	var b4 = Math.pow(1 - t, 3);

	var b = {};

	b.x = this.x0 * b1 + this.x1 * b2 + this.x2 * b3 + this.x * b4;
	b.y = this.y0 * b1 + this.y1 * b2 + this.y2 * b3 + this.y * b4;

	return b;
};

SVGBezier.prototype.getBounds = function() {
	var result = {};
	result.min = this.getValue(0).x;
	result.max = this.getValue(1).x;
	return result;
};

SVGBezier.prototype.paint = function() {
	this.context = this.layer.element;
	var self = this;
	var group = this.element;
	var path = document.createElementNS(this.NS, "path");
	var d = this.init();
	path.setAttribute("d", d);
	path.setAttribute("stroke", "#3a87ad");
	path.setAttribute("stroke-width", this.strokeWidth);
	path.setAttribute("fill", "none");
	path.addEventListener("click", function(e) {
		if(self.pointsActive) self.hidePoints.call(self);
		else self.showPoints.call(self);
	}, false);

	this.x0element = this.makePoint(this.x0, this.y0, this.setX0, this.setY0);
	this.x1element = this.makePoint(this.x1, this.y1, this.setX1, this.setY1);
	this.x2element = this.makePoint(this.x2, this.y2, this.setX2, this.setY2);
	this.xelement = this.makePoint(this.x, this.y, this.setX, this.setY);

	this.context.addEventListener("mousemove", function(e) {
		if(self.activeElement == null) return;
		var coords = global.axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = global.axisArea.contextToMap(coords);
		switch(self.activeElement) {
			case self.x0element: self.setX0(coords.x); self.setY0(coords.y); break;
			case self.x1element: self.setX1(coords.x); self.setY1(coords.y); break;
			case self.x2element: self.setX2(coords.x); self.setY2(coords.y); break;
			case self.xelement: self.setX(coords.x); self.setY(coords.y); break;
		}
	});
	this.context.addEventListener("mouseup", function(e) {
		self.activeElement = null;
	});

	group.appendChild(path);
	group.appendChild(this.x0element);
	group.appendChild(this.x1element);
	group.appendChild(this.x2element);
	group.appendChild(this.xelement);
	this.path = path;
	this.hidePoints();
	this.context.appendChild(this.element);
};

SVGBezier.prototype.hidePoints = function() {
	this.x0element.style.display = "none";
	this.x1element.style.display = "none";
	this.x2element.style.display = "none";
	this.xelement.style.display = "none";
	this.path.setAttribute("stroke-opacity", "0.7");
	this.pointsActive = false;
};

SVGBezier.prototype.showPoints = function() {
	this.x0element.style.display = "";
	this.x1element.style.display = "";
	this.x2element.style.display = "";
	this.xelement.style.display = "";
	this.path.setAttribute("stroke-opacity", "1.0");
	this.pointsActive = true;
};

SVGBezier.prototype.makePoint = function(x, y, changeX, changeY) {
	var self = this;
	var x0element = document.createElementNS(this.NS, "circle");
	x0element.setAttribute("stroke", "#b94a48");
	x0element.setAttribute("stroke-width", this.strokeWidth);
	x0element.setAttribute("fill", "#b94a48");
	x0element.setAttribute("r", this.strokeWidth / 2);
	x0element.setAttribute("cx", x);
	x0element.setAttribute("cy", y);

	var start = function(e) { self.activeElement = this; };
	var end = function(e) { self.activeElement = null; };
	var move = function(e) {
		if(self.activeElement == null) return;
		var coords = global.axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = global.axisArea.contextToMap(coords);
		changeX.call(self, coords.x);
		changeY.call(self, coords.y);
		e.stopPropagation();
	};	

	x0element.addEventListener("mousedown", start);
	x0element.addEventListener("mouseup", end);
	x0element.addEventListener("mousemove", move);
	x0element.addEventListener("touchstart", start);
	x0element.addEventListener("touchend", end);
	x0element.addEventListener("touchmove", function(e) { move(e.targetTouches[0]); }, false);

	return x0element;
};

SVGBezier.prototype.setX0 = function(x0) {
	if(x0 > this.maxmin.x0.max || x0 < this.maxmin.x0.min) return;
	this.x0 = x0;
	this.x0element.setAttribute("cx", this.x0);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setY0 = function(y0) {
	if(y0 > this.maxmin.y0.max || y0 < this.maxmin.y0.min) return;
	this.y0 = y0;
	this.x0element.setAttribute("cy", this.y0);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setX1 = function(x1) {
	if(x1 > this.maxmin.x1.max || x1 < this.maxmin.x1.min) return;
	this.x1 = x1;
	this.x1element.setAttribute("cx", this.x1);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setY1 = function(y1) {
	if(y1 > this.maxmin.y1.max || y1 < this.maxmin.y1.min) return;
	this.y1 = y1;
	this.x1element.setAttribute("cy", this.y1);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setX2 = function(x2) {
	if(x2 > this.maxmin.x2.max || x2 < this.maxmin.x2.min) return;
	this.x2 = x2;
	this.x2element.setAttribute("cx", this.x2);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setY2 = function(y2) {
	if(y2 > this.maxmin.y2.max || y2 < this.maxmin.y2.min) return;
	this.y2 = y2;
	this.x2element.setAttribute("cy", this.y2);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setX = function(x) {
	if(x > this.maxmin.x.max || x < this.maxmin.x.min) return;
	this.x = x;
	this.xelement.setAttribute("cx", this.x);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.setY = function(y) {
	if(y > this.maxmin.y.max || y < this.maxmin.y.min) return;
	this.y = y;
	this.xelement.setAttribute("cy", this.y);
	var d = this.init();
	this.path.setAttribute("d", d);
};

SVGBezier.prototype.destruct = function() {
	this.element.outerHTML = "";
	delete this;
};