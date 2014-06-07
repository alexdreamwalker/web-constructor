function HorizontalLayer(options) {
	var self = this;
	Layer.apply(this, arguments);
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = options.lamellaSize;
	this.lamellas = options.lamellas;
}

HorizontalLayer.prototype = Object.create(Layer.prototype);

HorizontalLayer.prototype.paint = function() {
	this.context = this.sunblind.element;
	this.element = document.createElementNS(this.NS, "g");
	var lamellaCount = this.height / this.lamellaSize;
	if(this.lamellas.length == 0)
		for(var i = 0; i < lamellaCount; i++) {
			var lamellaWidth = this.width;
			var lamellaHeight = this.lamellaSize * 0.95;
			var pos = {
				x: 0,
				y: 0 + this.sunblind.cornice.height * 2 + i * lamellaHeight * 1.05
			};
			var lamella = new Lamella({width: lamellaWidth, height: lamellaHeight, x: pos.x, y: pos.y});
			this.addLamella(lamella);
			lamella.paint();
		}
	else
		for(var i = 0; i < this.lamellas.length; i++) {
			var lamella = new Lamella(this.lamellas[i]);
			this.addLamella(this.lamellas[i]);
			lamella.paint();
		}
	this.context.appendChild(this.element);
};

HorizontalLayer.prototype.generate = function(options) {
	var lamellas = [];
	var lamellaCount = options.height / options.lamellaSize;
	for(var i = 0; i < lamellaCount; i++) {
		var lamellaWidth = options.width;
		var lamellaHeight = options.lamellaSize * 0.95;
		var pos = {
			x: 0,
			y: 0 + options.cornice.height * 2 + i * lamellaHeight * 1.05
		};
		var lamella = Lamella.prototype.generate.apply(this, {
			width: lamellaWidth, 
			height: lamellaHeight, 
			x: pos.x, 
			y: pos.y, 
			generator: options.generator
		});
		lamellas.push(lamella);
	}
	return {
		"lamellas": lamellas,
		minLayerSquare: define.sunblind.MIN_LAYER_SQUARE,
		width: options.width,
		height: options.height
	};
};

HorizontalLayer.prototype.mutate = function(options) {
	var lamellas = options.lamellas;
	var lamellaCount = lamellas.length;
	var chance = 0.1;
	for(var i = 0; i < lamellaCount; i++)
		if(Math.random() <= chance) {
			lamellas[i].generator = options.generator;
			lamellas[i] = Lamella.prototype.generate.apply(this, lamellas[i]);
		}
	return {
		"lamellas": lamellas,
		minLayerSquare: define.sunblind.MIN_LAYER_SQUARE,
		width: options.width,
		height: options.height
	};
};