function MultiLayer(options) {
	var self = this;
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = options.lamellaSize;
	this.lamellas = options.lamellas;
}

MultiLayer.prototype = Object.create(VerticalLayer.prototype);

MultiLayer.prototype.addBezier = function(bezier) {
	bezier.layer = this;
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

	this.addBezier(topBezier);
	topBezier.paint();
	this.addBezier(bottomBezier);
	bottomBezier.paint();
};