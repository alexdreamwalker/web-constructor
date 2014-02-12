function AxisArea(options) {
	this.elem = options.elem || null;
	this.root = null;
	this.constructions = [];
	this.dimensions = { width: 1000, height: 1000, step: 50 }; 
	this.axisStepCount = options.axisStepCount || 20;
	this.wScale = 1.0;	// width scale
	this.hScale = document.getElementById(this.elem).offsetHeight / document.getElementById(this.elem).offsetWidth;	// height scale
	console.log("sizes of container: " + document.getElementById(this.elem).offsetHeight + ":" + document.getElementById(this.elem).offsetWidth);
	this.NS = global.NS;

	this.axisArea = null;
	this.sizeAdjs = null;
	this.context = null;
	this.coords = null;

	this.canvasWidth = this.dimensions.width;
	this.canvasHeight = this.dimensions.height;

	this.dx = document.getElementById(this.elem).offsetLeft;
	this.dy = document.getElementById(this.elem).offsetTop;
	this.axisOffset = 0;

	this.init();
}

AxisArea.prototype.init = function() {
	// basic svg root
	this.root = this.drawRoot();
	// draw axis
	this.axisArea = this.drawAxis();
	this.root.appendChild(this.axisArea);
	// add size adjustments
	this.sizeAdjs = this.drawSizeAdjustments();
	this.root.appendChild(this.sizeAdjs);
	// add main context
	this.context = this.drawContext();
	this.root.appendChild(this.context);
	// insert svg
};

AxisArea.prototype.drawRoot = function() {
	var svg = document.createElementNS(this.NS, "svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "100%");
	svg.setAttribute("viewBox", [0, 0, this.wScale, this.hScale].join(" "));
	svg.setAttribute("version", "1.1");
	// main inner rectangle with gray background
	var rect = document.createElementNS(this.NS, "rect");
	rect.setAttribute("x", "0.0");
	rect.setAttribute("y", "0.0");
	rect.setAttribute("width", this.wScale);
	rect.setAttribute("height", this.hScale);
	rect.setAttribute("fill", "#fff");
	svg.appendChild(rect);

	return svg;
};

AxisArea.prototype.drawAxis = function() {
	var step = this.dimensions.step;
	var wStepCount = this.dimensions.width / step;
	var hStepCount = this.dimensions.height / step;
	var hStep = this.hScale / hStepCount;
	var wStep = this.wScale / wStepCount;
	var uStep = (hStep > wStep) ? wStep : hStep;

	wStepCount = this.wScale / uStep;
	hStepCount = this.hScale / uStep;

	this.canvasWidth = wStepCount * step;
	this.canvasHeight = hStepCount * step;

	console.log("sizes: " + this.canvasWidth + " " + this.canvasHeight);

	var g = document.createElementNS(this.NS, "g");
	g.setAttribute("stroke", "black");
	g.setAttribute("stroke-width", "0.0002");

	for(var i = 0; i < hStepCount; i++) {
		var line = document.createElementNS(this.NS, "line");
		line.setAttribute("x1", "0.0");
		line.setAttribute("y1", uStep * i);
		line.setAttribute("x2", this.wScale);
		line.setAttribute("y2", uStep * i);
		g.appendChild(line);

		var text = document.createElementNS(this.NS, "text");
		text.setAttribute("x", this.wScale * 0.97);
		text.setAttribute("y", uStep * i);
		text.setAttribute("font-size", "0.010");
		text.appendChild(document.createTextNode(step * i - step));
		g.appendChild(text);
	} 		

	for(var i = 0; i < wStepCount; i++) {
		var line = document.createElementNS(this.NS, "line");
		line.setAttribute("x1", uStep * i);
		line.setAttribute("y1", "0.0");
		line.setAttribute("x2", uStep * i);
		line.setAttribute("y2", this.hScale);
		g.appendChild(line);

		var text = document.createElementNS(this.NS, "text");
		text.setAttribute("x", uStep * i);
		text.setAttribute("y", this.hScale * 0.96);
		text.setAttribute("font-size", "0.010");
		text.setAttribute("transform", "rotate(90," + (uStep * i) + "," + (this.hScale * 0.96) + ")");
		text.appendChild(document.createTextNode(step * i - step));
		g.appendChild(text);
	}

	var gt = document.createElementNS(this.NS, "g");
	var coordtext = document.createElementNS(this.NS, "text");
	coordtext.setAttribute("x", this.wScale * 0.8);
	coordtext.setAttribute("y", this.hScale * 0.9);
	coordtext.setAttribute("font-size", "0.010");
	coordtext.textContent = "";
	this.coords = gt;
	gt.appendChild(coordtext);
	g.appendChild(gt);

	return g;
};

AxisArea.prototype.mapToContext = function(coords) {
	var result = {};

	var absX = coords.x - this.dx;
	var absY = coords.y - this.dy;

	var pixX = this.wScale / document.getElementById(this.elem).offsetWidth;
	var pixY = this.hScale / document.getElementById(this.elem).offsetHeight;

	var canX = this.canvasWidth / document.getElementById(this.elem).offsetWidth;
	var canY = this.canvasHeight / document.getElementById(this.elem).offsetHeight;

	result.x = absX * canX - this.axisOffset;
	result.y = absY * canY - this.axisOffset;

	return result;
};

AxisArea.prototype.drawSizeAdjustments = function() {
	var gW = document.createElementNS(this.NS, "g");
	var gH = document.createElementNS(this.NS, "g");
	var g = document.createElementNS(this.NS, "g");

	var self = this;

	var wRect = document.createElementNS(this.NS, "rect");
	wRect.setAttribute("x", this.wScale * 0.45);
	wRect.setAttribute("y", this.hScale * 0.005);
	wRect.setAttribute("width", this.wScale * 0.1);
	wRect.setAttribute("height", this.hScale * 0.04);
	wRect.setAttribute("fill", "lightgray");
	wRect.setAttribute("opacity", "0.5");
	var wtext = document.createElementNS(this.NS, "text");
	wtext.setAttribute("x", this.wScale * 0.47);
	wtext.setAttribute("y", this.hScale * 0.03);
	wtext.setAttribute("font-size", "0.018");
	wtext.textContent = this.dimensions.width;
	wRect.onclick = function(e) { 
		var size = prompt("Введите новое значение ширины:");
		if(size != null && size > 0) {
			g.removeChild(wtext);
			wtext.textContent = size;
			g.insertBefore(wtext, wRect);
			self.widthChanged(size);
		}
	};

	var hRect = document.createElementNS(this.NS, "rect");
	hRect.setAttribute("x", this.wScale * 0.035);
	hRect.setAttribute("y", this.hScale * 0.45);
	hRect.setAttribute("width", this.wScale * 0.1);
	hRect.setAttribute("height", this.hScale * 0.04);
	hRect.setAttribute("transform", "rotate(90," + (this.wScale * 0.035) + "," + (this.hScale * 0.45) + ")");
	hRect.setAttribute("fill", "lightgray");
	hRect.setAttribute("opacity", "0.5");
	var htext = document.createElementNS(this.NS, "text");
	htext.setAttribute("x", this.wScale * 0.030);
	htext.setAttribute("y", this.hScale * 0.54);
	htext.setAttribute("font-size", "0.018");
	htext.setAttribute("transform", "rotate(-90," + (this.wScale * 0.030) + "," + (this.hScale * 0.54) + ")");
	htext.textContent = this.dimensions.height;
	hRect.onclick = function(e) { 
		var size = prompt("Введите новое значение высоты:");
		if(size != null && size > 0) {
			g.removeChild(htext);
			htext.textContent = size;
			g.insertBefore(htext, wRect);
			self.heightChanged(size);
		}
	};

	g.appendChild(wtext);
	g.appendChild(htext);
	g.appendChild(wRect);
	g.appendChild(hRect);

	return g;
};

AxisArea.prototype.drawContext = function() {
	var g = document.createElementNS(this.NS, "g");
	var self = this;
	var context = document.createElementNS(this.NS, "rect");
	context.setAttribute("x", 0.05 * this.wScale);
	context.setAttribute("y", 0.05 * this.hScale);
	context.setAttribute("width", this.wScale * 0.9);
	context.setAttribute("height", this.hScale * 0.9);
	context.setAttribute("fill", "#fff");
	context.setAttribute("opacity", "0.1");
	g.appendChild(context);

	context.addEventListener("mousemove", function(e) {
		var coords = self.mapToContext({x: e.pageX, y: e.pageY});
		console.log(coords.x + " " + coords.y);
		var coordtext = document.createElementNS(self.NS, "text");
		coordtext.setAttribute("x", self.wScale * 0.8);
		coordtext.setAttribute("y", self.hScale * 0.92);
		coordtext.setAttribute("font-size", "0.015");
		coordtext.textContent = "Координаты: " + "(" + parseInt(coords.x) + ";" + parseInt(coords.y) + ")";
		self.coords.removeChild(self.coords.children[0]);
		self.coords.appendChild(coordtext);
	}, false);

	context.addEventListener("mouseleave", function(e) {
		var coordtext = document.createElementNS(self.NS, "text");
		coordtext.setAttribute("x", self.wScale * 0.8);
		coordtext.setAttribute("y", self.hScale * 0.92);
		coordtext.setAttribute("font-size", "0.015");
		coordtext.textContent = "";
		self.coords.removeChild(self.coords.children[0]);
		self.coords.appendChild(coordtext);
	}, false);

	return g;
};

AxisArea.prototype.widthChanged = function(newWidth) {
	for(var i = 0; i < this.constructions.length; i++)
		this.constructions[i].changeWidth(newWidth);
	this.dimensions.width = newWidth * 1.1;
	this.root.removeChild(this.axisArea);

	var max = this.dimensions.width > this.dimensions.height ? this.dimensions.width : this.dimensions.height;
	var mstep = max / this.axisStepCount;
	this.dimensions = {width: max, height: max, step: mstep};

	this.axisArea = this.drawAxis();
	this.root.insertBefore(this.axisArea, this.sizeAdjs);
};

AxisArea.prototype.heightChanged = function(newHeight) {
	for(var i = 0; i < this.constructions.length; i++)
		this.constructions[i].changeHeight(newHeight);
	this.dimensions.height = newHeight * 1.1;
	this.root.removeChild(this.axisArea);

	var max = this.dimensions.width > this.dimensions.height ? this.dimensions.width : this.dimensions.height;
	var mstep = max / this.axisStepCount;
	this.dimensions = {width: max, height: max, step: mstep};

	this.axisArea = this.drawAxis();
	this.root.insertBefore(this.axisArea, this.sizeAdjs);
};
