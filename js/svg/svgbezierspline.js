function SVGBezierSpline(options) {
	this.curves = [];	
	this.splines = [];
	this.collisionPoints = [];

	this.layer = options.layer;
	this.curvesInit = options.curves;
	for(var i = 0; i < this.curvesInit.length; i++) this.addCurve(this.curvesInit[i]);

	this.strokeWidth = 0.01;

	this.NS = global.NS;
	this.isActive = true;
	this.activeElement = null;

	this.level = options.level || 1;
	this.startPoint = options.startPoint || 0;
};

SVGBezierSpline.prototype.hide = function() {
	if(this.splines.length == 0)
		for(var i = 0; i < this.curves.length; i++)
			this.curves[i].element.style.display = "none";
	else
		for(var i = 0; i < this.splines.length; i++)
			this.splines[i].hide();
};

SVGBezierSpline.prototype.show = function() {
	if(this.splines.length == 0)
		for(var i = 0; i < this.curves.length; i++)
			this.curves[i].element.style.display = "";
	else
		for(var i = 0; i < this.splines.length; i++)
			this.splines[i].show();
};

SVGBezierSpline.prototype.addCurve = function(curve) {
	var self = this;
	curve.layer = this.layer;
	this.curves.push(curve);
	curve.element.addEventListener("dblclick", function(e) {
		self.splitCurve(curve);
	}, false);
};

SVGBezierSpline.prototype.getValue = function(t) {
	if(this.splines.length == 0)
		return this.curves[0].getValue(1 - ((t - this.startPoint) / this.level));
	else if(t <= (this.startPoint + this.level / 2))
			return this.splines[0].getValue(t);
		else
			return this.splines[1].getValue(t);
	return null;
};

SVGBezierSpline.prototype.getRightCurve = function() {
	if(this.splines.length == 0) return this.curves[this.curves.length - 1];
	else return this.splines[1].getRightCurve();
};

SVGBezierSpline.prototype.getLeftCurve = function() {
	if(this.splines.length == 0) return this.curves[this.curves.length - 1];
	else return this.splines[0].getLeftCurve();
};

SVGBezierSpline.prototype.makeCollisionPoint = function(x, y, leftSpline, rightSpline) {
	var self = this;
	var x0element = document.createElementNS(this.NS, "circle");
	x0element.setAttribute("stroke", "#b94a48");
	x0element.setAttribute("stroke-width", this.strokeWidth);
	x0element.setAttribute("fill", "#b94a48");
	x0element.setAttribute("r", this.strokeWidth / 2);
	x0element.setAttribute("cx", x);
	x0element.setAttribute("cy", y);
	var leftCurve = leftSpline.getRightCurve();
	var rightCurve = rightSpline.getLeftCurve();

	var start = function(e) { self.activeElement = this; leftCurve = leftSpline.getRightCurve(); rightCurve = rightSpline.getLeftCurve(); };
	var end = function(e) { self.activeElement = null; };
	var move = function(e) {
		if(self.activeElement == null) return;
		var coords = global.axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = global.axisArea.contextToMap(coords);

		if(coords.x <= leftCurve.x || coords.x >= rightCurve.x0) coords.x = leftCurve.x;
		if(coords.y <= leftCurve.maxmin.y.min) coords.y = leftCurve.maxmin.y.min;
		if(coords.y >= leftCurve.maxmin.y.max) coords.y = leftCurve.maxmin.y.max;

		x0element.setAttribute("cx", coords.x);
		x0element.setAttribute("cy", coords.y);

		leftCurve.setX(coords.x);
		leftCurve.setY(coords.y);
		rightCurve.setX0(coords.x);
		rightCurve.setY0(coords.y);

		e.stopPropagation();
	};	

	x0element.addEventListener("mousedown", start);
	x0element.addEventListener("mouseup", end);
	x0element.addEventListener("mousemove", move);
	x0element.addEventListener("touchstart", start);
	x0element.addEventListener("touchend", end);
	x0element.addEventListener("touchmove", function(e) { move(e.targetTouches[0]); }, false);

	this.context = this.layer.element;
	this.context.addEventListener("mousemove", function(e) {
		if(self.activeElement == null) return;
		var coords = global.axisArea.mapToContext({x: e.pageX, y: e.pageY});
		coords = global.axisArea.contextToMap(coords);
		if(coords.x <= leftCurve.x || coords.x >= rightCurve.x0) coords.x = leftCurve.x;
		if(coords.y <= leftCurve.maxmin.y.min) coords.y = leftCurve.maxmin.y.min;
		if(coords.y >= leftCurve.maxmin.y.max) coords.y = leftCurve.maxmin.y.max;

		x0element.setAttribute("cx", coords.x);
		x0element.setAttribute("cy", coords.y);

		leftCurve.setX(coords.x);
		leftCurve.setY(coords.y);
		rightCurve.setX0(coords.x);
		rightCurve.setY0(coords.y);

		e.stopPropagation();
	});
	this.context.addEventListener("mouseup", function(e) {
		self.activeElement = null;
	});

	this.collisionPoints.push(x0element);
	this.layer.element.appendChild(x0element);
};

SVGBezierSpline.prototype.removeCurve = function(curve) {
	var index = this.curves.indexOf(curve);
	this.curves.splice(index, 1);
};

SVGBezierSpline.prototype.splitCurve = function(curve) {
	var x1 = curve.x0;
	var y1 = curve.y0;
	var x2 = curve.x1;
	var y2 = curve.y1;
	var x3 = curve.x2;
	var y3 = curve.y2;
	var x4 = curve.x;
	var y4 = curve.y;

	var x12 = (x1 + x2) / 2;
	var y12 = (y1 + y2) / 2;
	var x23 = (x2 + x3) / 2;
	var y23 = (y2 + y3) / 2;
	var x34 = (x3 + x4) / 2;
	var y34 = (y3 + y4) / 2;
	var x123 = (x12 + x23) / 2;
	var y123 = (y12 + y23) / 2;
	var x234 = (x23 + x34) / 2;
	var y234 = (y23 + y34) / 2;
	var x1234 = (x123 + x234) / 2;
	var y1234 = (y123 + y234) / 2;

	var firstChildBezier = new SVGBezier({x0: x1, y0: y1, "x1": x12, "y1": y12, "x2": x123, "y2": y123, x: x1234, y: y1234});
	var secondChildBezier = new SVGBezier({x0: x1234, y0: y1234, "x1": x234, "y1": y234, "x2": x34, "y2": y34, x: x4, y: y4});

	var fisrtminmax = curve.maxmin;
	fisrtminmax.x.min = x1234;
	fisrtminmax.x.max = x1234;
	fisrtminmax.x0.max = x1234;
	fisrtminmax.x1.max = x1234;
	fisrtminmax.x2.max = x1234;
	firstChildBezier.maxmin = fisrtminmax;
	firstChildBezier.layer = this.layer;
	firstChildBezier.paint();

	var secondminmax = curve.maxmin;
	secondminmax.x0.min = x1234;
	secondminmax.x0.max = x1234;
	secondminmax.x1.min = x1234;
	secondminmax.x2.min = x1234;
	secondminmax.x.min = x1234;
	secondChildBezier.maxmin = secondminmax;
	secondChildBezier.layer = this.layer;
	secondChildBezier.paint();

	var index = this.curves.indexOf(curve);
	curve.destruct();
	this.curves.splice(index, 1);


	var newLevel = this.level / 2;
	var newPoint = this.startPoint + newLevel; 
	var firstChildSpline = new SVGBezierSpline({curves: [firstChildBezier], layer: this.layer, level: newLevel, startPoint: this.startPoint});
	var secondChildSpline = new SVGBezierSpline({curves: [secondChildBezier], layer: this.layer, level: newLevel, startPoint: newPoint});
	this.splines.push(firstChildSpline);
	this.splines.push(secondChildSpline);

	this.makeCollisionPoint(x1234, y1234, firstChildSpline, secondChildSpline);
};