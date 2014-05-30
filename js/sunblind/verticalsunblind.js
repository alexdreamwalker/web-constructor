function VerticalSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		type: define.sunblind.ID_VERTICAL,
		lamellaOrientation: define.sunblind.ID_VERTICAL,
		placement: {
			id: 1,
			name: "Стеновое"
		},
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
			isActive: false,
			color: null,
			size: 89,
			width: 2300
		},
		complectation: [
			{
				id: 1,
				name: "Стандартная",
				price: 0
			}
		]
	};

	this.init();
}

VerticalSunblind.prototype = Object.create(Sunblind.prototype);

VerticalSunblind.prototype.init = function() {
	this.type = this.data.type;
	this.lamellaOrientation = this.data.lamellaOrientation;
	this.width = this.data.width;
	this.height = this.data.height;
	this.placement = this.data.placement;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	var decorPlank = new DecorPlank(this.data.decorplank);
	this.setDecorPlank(decorPlank);

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new VerticalLayer(this.data.layers[i]);
		this.addLayer(layer);
	}

	for(var i = 0; i < this.data.complectation.length; i++) {
		var complectation = new Complectation(this.data.complectation[i]);
		this.addComplectation(complectation);
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