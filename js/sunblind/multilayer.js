function MultiLayer(options) {
	var self = this;
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = options.lamellaSize;
	this.lamellas = options.lamellas;
	this.arcs = [];

	this.topBezierSpline = null;
	this.bottomBezierSpline = null;
}

MultiLayer.prototype = Object.create(VerticalLayer.prototype);

MultiLayer.prototype.applyBezier = function() {
	var persent = 1 / this.lamellas.length;
	for(var i = 0; i < this.lamellas.length; i++) {
		var lamella = this.lamellas[i];
		var lamx = persent * (i);

		//get top coordinate
		var topy = this.topBezierSpline.getValue(lamx);
		topy = global.axisArea.contextToContext({x: 0, y: topy.y, width: 0, height:0}).y;
		//get bottom coordinate
		var bottomy = this.bottomBezierSpline.getValue(lamx);
		bottomy = global.axisArea.contextToContext({x: 0, y: bottomy.y, width: 0, height: 0}).y;

		//set coordinates
		lamella.setPos({x: lamella.x, y: topy, width: lamella.width, height: (bottomy - topy)});

		//set arc 
		var coords = global.axisArea.contextToMap({x: this.lamellas[i].x, y: this.lamellas[i].y, width: this.lamellas[i].width, height: this.lamellas[i].height});
		this.arcs[i].setPos(coords.x, coords.y + coords.height, coords.x + coords.width, coords.y + coords.height);
	}
};

MultiLayer.prototype.hideAdjustments = function() {
	this.topBezierSpline.hide();
	this.bottomBezierSpline.hide();
};

MultiLayer.prototype.showAdjustments = function() {
	this.topBezierSpline.show();
	this.bottomBezierSpline.show();
};

MultiLayer.prototype.paint = function() {
	VerticalLayer.prototype.paint.apply(this, arguments);
	var pt0 = global.axisArea.contextToMap({x: 0, y: this.sunblind.cornice.height * 2});
	var pt1 = global.axisArea.contextToMap({x: this.width / 4, y: this.sunblind.cornice.height * 2});
	var pt2 = global.axisArea.contextToMap({x: this.width / 4 * 3, y: this.sunblind.cornice.height * 2});
	var pt = global.axisArea.contextToMap({x: this.width, y: this.sunblind.cornice.height * 2});

	var topBezier = new SVGBezier({x0: pt0.x, y0: pt0.y, x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y, x: pt.x, y: pt.y});
	var pb0 = global.axisArea.contextToMap({x: 0, y: this.height});
	var pb1 = global.axisArea.contextToMap({x: this.width / 4, y: this.height});
	var pb2 = global.axisArea.contextToMap({x: this.width / 4 * 3, y: this.height});
	var pb = global.axisArea.contextToMap({x: this.width, y: this.height});
	var bottomBezier = new SVGBezier({x0: pb0.x, y0: pb0.y, x1: pb1.x, y1: pb1.y, x2: pb2.x, y2: pb2.y, x: pb.x, y: pb.y});

	var topminmax = {
		x0: {min: pt0.x, max: pt0.x},
		y0: {min: pt0.y, max: pb.y},
		x1: {min: pt0.x, max: pb.x},
		y1: {min: pt0.y, max: pb.y},
		x2: {min: pt0.x, max: pb.x},
		y2: {min: pt0.y, max: pb.y},
		x: {min: pb.x, max: pb.x},
		y: {min: pt0.y, max: pb.y}
	};
	topBezier.maxmin = topminmax;

	var bottomminmax = {
		x0: {min: pt0.x, max: pt0.x},
		y0: {min: pt0.y, max: pb.y},
		x1: {min: pt0.x, max: pb.x},
		y1: {min: pt0.y, max: pb.y},
		x2: {min: pt0.x, max: pb.x},
		y2: {min: pt0.y, max: pb.y},
		x: {min: pb.x, max: pb.x},
		y: {min: pt0.y, max: pb.y}
	};
	bottomBezier.maxmin = bottomminmax;

	if(this.topBezierSpline != null) this.topBezierSpline.destruct();
	if(this.bottomBezierSpline != null) this.bottomBezierSpline.destruct();

	this.topBezierSpline = new SVGBezierSpline({curves: [topBezier], layer: this});
	this.bottomBezierSpline = new SVGBezierSpline({curves: [bottomBezier], layer: this});
	topBezier.paint();
	bottomBezier.paint();

	//draw arcs
	for(var i = 0; i < this.lamellas.length; i++) {
		var coords = global.axisArea.contextToMap({x: this.lamellas[i].x, y: this.lamellas[i].y, width: this.lamellas[i].width, height: this.lamellas[i].height});
		var arc = new Arc({x0: coords.x, y0: coords.y + coords.height, x: coords.x + coords.width, y: coords.y + coords.height});
		arc.layer = this;
		this.arcs.push(arc);
		arc.paint();
	}
};