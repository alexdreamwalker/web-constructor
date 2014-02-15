function VerticalSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		width: 2000,
		height: 2000,
		layers: [
			{
				width: 2000,
				height: 2000,
				lamellaSize: 16,
				lamellas: []
			}
		],
		cornice: {
			width: 2000,
			size: 16,
			x: 0,
			y: 0
		},
		complectation: []
	};

	this.init();
}

VerticalSunblind.prototype = Object.create(Sunblind.prototype);

VerticalSunblind.prototype.init = function() {
	this.width = this.data.width;
	this.height = this.data.height;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new VerticalLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
};