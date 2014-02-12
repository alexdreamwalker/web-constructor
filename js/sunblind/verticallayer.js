function VerticalLayer(options) {
	var self = this;
	this.element = null;
	this.NS = global.NS;
	this.width = options.width;
	this.height = options.height;
	this.lamellaSize = this.sunblind.lamellaSize;
	this.context = this.sunblind.element;
	this.lamellas = [];

	this.init();
}

VerticalLayer.prototype = Object.create(Layer.prototype);

VerticalLayer.prototype.init = function() {
	this.element = document.createElementNS(this.NS, "g");
	var lamellaCount = this.width / this.lamellaSize;
	for(var i = 0; i < lamellaCount; i++) {
		var lamellaWidth = lamellaSize;
		var lamellaHeight = this.height;
		var pos = {
			x: i * lamellaWidth,
			y: 0
		};
		var lamella = new VerticalLamella({width: lamellaWidth, height: lamellaHeight, x: pos.x, y: pos.y});
		this.addLamella(lamella);
	}
};