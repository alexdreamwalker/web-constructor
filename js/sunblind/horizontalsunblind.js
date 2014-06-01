function HorizontalSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		type: define.sunblind.ID_HORIZONTAL,
		lamellaOrientation: define.sunblind.ID_HORIZONTAL,
		placement: {
			id: 7,
			name: "На штапик"
		},
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
			isActive: false,
			color: null,
			size: 16,
			width: 1000
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

HorizontalSunblind.prototype = Object.create(Sunblind.prototype);

HorizontalSunblind.prototype.init = function() {
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
		var layer = new HorizontalLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
	for(var i = 0; i < this.data.complectation.length; i++) {
		var complectation = new Complectation(this.data.complectation[i]);
		this.addComplectation(complectation);
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

HorizontalSunblind.prototype.generate = function(options) {
	var cornice = Cornice.prototype.generate.apply(this, {
		width: options.width, 
		height: options.lamellaSize, 
		generator: options.generator
	});

	var layers = [];
	var layer = HorizontalLayer.prototype.generate.apply(this, {
		width: options.width, 
		height: options.height, 
		generator: options.generator, 
		"cornice": cornice, 
		lamellaSize: options.lamellaSize
	});
	layers.push(layer);

	var decorPlank = DecorPlank.prototype.generate.apply(this, {
		width: options.width, 
		height: options.lamellaSize, 
		generator: options.generator
	});

	var complectation = [];
	var compCount = Math.floor(getRandom(1, 3));
	for(var i = 0; i < compCount; i++)
		complectation.push(Complectation.prototype.generate.apply(this, {
			generator: options.generator
		}));

	var obj = {
		type: define.sunblind.ID_HORIZONTAL,
		placement: options.placement,
		width: options.width,
		height: options.height,
		"cornice": cornice,
		"layers": layers,
		"decorPlank": decorPlank,
		"complectation": complectation
	};
	return obj;
};

HorizontalSunblind.prototype.mutate = function(options) {
	var obj = options.obj;

	var cornice = obj.cornice;
	obj.cornice = Cornice.prototype.mutate.apply(this, {
		width: cornice.width, 
		height: cornice.height, 
		generator: obj.generator
	});

	var decorPlank = obj.decorPlank;
	obj.decorPlank = DecorPlank.prototype.mutate.apply(this, {
		width: decorPlank.width, 
		height: decorPlank.height, 
		generator: obj.generator
	});

	var layers = obj.layers;
	for(var i = 0; i < layers.length; i++)
		obj.layers[i] = HorizontalLayer.prototype.mutate.apply(this, {
			lamellas: layers[i].lamellas,
			width: layers[i].width,
			height: layers[i].height,
			generator: obj.generator
		});

	var complectation = obj.complectation;
	for(var i = 0; i < complectation.length; i++)
		obj.complectation[i] = Complectation.prototype.mutate.apply(this, {
			generator: obj.generator
		});

	return obj;
};