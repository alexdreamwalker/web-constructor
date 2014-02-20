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
	var pt0 = global.axisArea.contextToMap({x: 0, y: 0});
	var pt1 = global.axisArea.contextToMap({x: this.width / 4, y: 0});
	var pt2 = global.axisArea.contextToMap({x: this.width / 4 * 3, y: 0});
	var pt = global.axisArea.contextToMap({x: this.width, y: 0});
	var topBezier = new SVGBezier({x0: pt0.x, y0: pt0.y, x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y, x: pt.x, y: pt.y});
	var pb0 = global.axisArea.contextToMap({x: 0, y: this.height});
	var pb1 = global.axisArea.contextToMap({x: this.width / 4, y: this.height});
	var pb2 = global.axisArea.contextToMap({x: this.width / 4 * 3, y: this.height});
	var pb = global.axisArea.contextToMap({x: this.width, y: this.height});
	var bottomBezier = new SVGBezier({x0: pb0.x, y0: pb0.y, x1: pb1.x, y1: pb1.y, x2: pb2.x, y2: pb2.y, x: pb.x, y: pb.y});

	this.addBezier(topBezier);
	topBezier.paint();
	this.addBezier(bottomBezier);
	bottomBezier.paint();
};