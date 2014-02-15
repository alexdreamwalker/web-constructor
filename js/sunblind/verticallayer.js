function VerticalLayer(options) {
	var self = this;
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
			var lamellaWidth = lamellaSize;
			var lamellaHeight = this.height;
			var pos = {
				x: i * lamellaWidth,
				y: 0
			};
			var lamella = new VerticalLamella({width: lamellaWidth, height: lamellaHeight, x: pos.x, y: pos.y});
			this.addLamella(lamella);
		}
	this.context.appendChild(this.element);
};