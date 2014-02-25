function MultiLayer(options) {
	var self = this;
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = options.lamellaSize;
	this.lamellas = options.lamellas;

	this.topBezier = null;
	this.bottomBezier = null;
}

MultiLayer.prototype = Object.create(VerticalLayer.prototype);

MultiLayer.prototype.addBezier = function(bezier) {
	bezier.layer = this;
};

MultiLayer.prototype.applyBezier = function() {
	for(var i = 0; i < this.lamellas.length; i++) {
		var lamella = this.lamellas[i];
		var lamx = lamella.x + lamella.width / 2;
		lamx = global.axisArea.contextToMap({x: lamx, y: 0}).x;
		console.log("x: " + lamx);

		//get top coordinate
		var topy = this.topBezier.getValue(lamx);
		console.log("topy: " + topy.x + " " + topy.y);
		topy = global.axisArea.contextToContext({x: 0, y: topy, width: 0, height:0}).y;
		//get bottom coordinate
		var bottomy = this.bottomBezier.getValue(lamx);
		console.log("bottomy: " + bottomy.x + " " + bottomy.y);
		bottomy = global.axisArea.contextToContext({x: 0, y: bottomy, width: 0, height: 0}).y;

		console.log("topy: " + topy.y + " bottomy:" + bottomy.y);

		//set coordinates
		lamella.setPos({x: lamella.x, y: topy.y, width: lamella.width, height: (topy.y - bottomy.y)});
	}
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

	this.topBezier = topBezier;
	this.bottomBezier = bottomBezier;
	this.addBezier(topBezier);
	topBezier.paint();
	this.addBezier(bottomBezier);
	bottomBezier.paint();
};