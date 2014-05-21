function HorizontalSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		type: define.sunblind.ID_HORIZONTAL,
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

HorizontalSunblind.prototype = Object.create(Sunblind.prototype);

HorizontalSunblind.prototype.init = function() {
	this.type = this.data.type;
	this.width = this.data.width;
	this.height = this.data.height;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	var decorPlank = new DecorPlank(this.data.decorplank);
	this.setDecorPlank(decorPlank);

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new HorizontalLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
};

HorizontalSunblind.prototype.changeWidth = function(newWidth) {
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].lamellas = [];
	Sunblind.prototype.changeWidth.apply(this, arguments);
};

HorizontalSunblind.prototype.changeHeight = function(newHeight) {
	for(var i = 0; i < this.layers.length; i++)
		this.layers[i].lamellas = [];
	Sunblind.prototype.changeHeight.apply(this, arguments);
};