function VerticalSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		type: define.sunblind.ID_VERTICAL,
		width: 2200,
		height: 2000,
		layers: [
			{
				width: 2200,
				height: 2000,
				lamellaSize: 89,
				lamellas: []
			}
		],
		cornice: {
			width: 2200,
			size: 89
		},
		decorplank: {
			isActive: true,
			color: null,
			size: 89,
			width: 2300
		},
		complectation: []
	};

	this.init();
}

VerticalSunblind.prototype = Object.create(Sunblind.prototype);

VerticalSunblind.prototype.init = function() {
	this.type = this.data.type;
	this.width = this.data.width;
	this.height = this.data.height;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	var decorPlank = new DecorPlank(this.data.decorplank);
	this.setDecorPlank(decorPlank);

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new VerticalLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
};

VerticalSunblind.prototype.changeWidth = function(newWidth) {
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].lamellas = [];
	Sunblind.prototype.changeWidth.apply(this, arguments);
};

VerticalSunblind.prototype.changeHeight = function(newHeight) {
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].lamellas = [];
	Sunblind.prototype.changeHeight.apply(this, arguments);
};