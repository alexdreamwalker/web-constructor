function MultiSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		width: 1000,
		height: 1000,
		layers: [
			{
				width: 1000,
				height: 1000,
				lamellaSize: 16,
				lamellas: []
			}
		],
		cornice: {
			width: 1000,
			size: 16,
			x: 0,
			y: 0
		},
		complectation: []
	};

	this.init();
}

MultiSunblind.prototype = Object.create(VerticalSunblind.prototype);

MultiSunblind.prototype.init = function() {
	this.width = this.data.width;
	this.height = this.data.height;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new MultiLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
};