function HorizontalLayer(options) {
	var self = this;
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

HorizontalLayer.prototype.generate = function() {
	var lamellas = [];
	var lamellaCount = this.height / this.lamellaSize;
	for(var i = 0; i < lamellaCount; i++) {
		var lamellaWidth = this.width;
		var lamellaHeight = this.lamellaSize * 0.95;
		var pos = {
			x: 0,
			y: 0 + this.sunblind.cornice.height * 2 + i * lamellaHeight * 1.05
		};
		var lamella = new Lamella({width: lamellaWidth, height: lamellaHeight, x: pos.x, y: pos.y});
		this.addLamella(lamella);
	}
	return {
		"lamellas": lamellas,
		minLayerSquare: define.sunblind.MIN_LAYER_SQUARE,
		width: this.sunblind.width,
		height: this.sunblind.height
	};
};