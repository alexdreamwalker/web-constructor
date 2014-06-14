function VerticalLayer(options) {
	var self = this;
	Layer.apply(this, arguments);
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = options.lamellaSize;
	this.lamellas = options.lamellas;
}

VerticalLayer.prototype = Object.create(Layer.prototype);

VerticalLayer.prototype.paint = function() {
	this.context = this.sunblind.element;
	this.element = document.createElementNS(this.NS, "g");
	var lamellaCount = this.width / this.lamellaSize;
	if(this.lamellas.length == 0)
		for(var i = 0; i < lamellaCount; i++) {
			var lamellaWidth = this.lamellaSize * 0.95;
			var lamellaHeight = this.height - this.sunblind.cornice.height * 2;
			var pos = {
				x: i * lamellaWidth * 1.05,
				y: 0 + this.sunblind.cornice.height * 2
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

VerticalLayer.prototype.generate = function(options) {
	var lamellas = [];
	var lamellaCount = options.width / options.lamellaSize;
	for(var i = 0; i < lamellaCount; i++) {
		var lamellaWidth = options.lamellaSize * 0.95;
		var lamellaHeight = options.height - options.cornice.height * 2;
		var pos = {
			x: i * lamellaWidth * 1.05,
			y: 0 + options.cornice.height * 2
		};
		var lamella = Lamella.prototype.generate.call(this, {
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

VerticalLayer.prototype.mutate = function(options) {
	return VerticalLayer.prototype.generate.call(this, options);
};