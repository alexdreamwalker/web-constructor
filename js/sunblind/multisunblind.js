function MultiSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
		type: define.sunblind.ID_MULTI,
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

MultiSunblind.prototype = Object.create(VerticalSunblind.prototype);

MultiSunblind.prototype.init = function() {
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
		var layer = new MultiLayer(this.data.layers[i]);
		this.addLayer(layer);
	}
	for(var i = 0; i < this.data.complectation.length; i++) {
		var complectation = new Complectation(this.data.complectation[i]);
		this.addComplectation(complectation);
	}
	this.activeLayer = this.data.layers.length - 1;
};

MultiSunblind.prototype.addMultiLayer = function() {
	var lamSize = 89;
	if(this.layers.length != 0) lamSize = this.layers[0].lamellaSize;
	var layer = new MultiLayer({width: this.width, height: this.height, lamellaSize: lamSize, lamellas: []});
	this.addLayer(layer);
};

MultiSunblind.prototype.removeMultiLayer = function() {
	if(this.layers.length == 1) {
		alert("Невозможно удалить единственный слой");
		return;
	} 

	this.layers[this.activeLayer].destroy();
	this.layers.splice(this.activeLayer, 1);
	if(this.activeLayer > this.layers.length - 1) this.activeLayer = this.layers.length - 1;
	this.switchLayer(this.activeLayer);
};

MultiSunblind.prototype.switchLayer = function(index) {
	this.activeLayer = index;

	for(var i = 0; i < this.layers.length; i++) {
		if(this.layers[i].element == null) this.layers[i].paint();
		if(i < this.activeLayer) {
			this.layers[i].element.style.display = "";
			this.layers[i].hideAdjustments();
		}
		else if(i == this.activeLayer) {
			this.layers[i].element.style.display = "";
			this.layers[i].showAdjustments();
		}
		else {
			this.layers[i].element.style.display = "none";
			this.layers[i].hideAdjustments();
		}
	}
};

MultiSunblind.prototype.hideLayerControls = function() {
	this.layers[this.activeLayer].hideAdjustments();
};

MultiSunblind.prototype.showLayerControls = function() {
	this.layers[this.activeLayer].showAdjustments();
};

MultiSunblind.prototype.applyBezier = function() {
	this.layers[this.activeLayer].applyBezier();
};

MultiSunblind.prototype.generate = function(options) {
	var cornice = Cornice.prototype.generate.call(this, {
		width: options.width, 
		height: options.lamellaSize, 
		generator: options.generator
	});

	var layers = [];
	var layerCount = Math.floor(getRandom(1, 3));
	for(var i = 0; i < layerCount; i++) {
		var layer = VerticalLayer.prototype.generate.call(this, {
			width: options.width, 
			height: options.height, 
			generator: options.generator, 
			"cornice": cornice, 
			lamellaSize: options.lamellaSize
		});
		layers.push(layer);
	}

	var decorPlank = DecorPlank.prototype.generate.call(this, {
		width: options.width, 
		height: options.lamellaSize, 
		generator: options.generator
	});

	var complectation = [];
	var compCount = Math.floor(getRandom(1, 3));
	for(var i = 0; i < compCount; i++)
		complectation.push(Complectation.prototype.generate.call(this, {
			generator: options.generator
		}));

	var obj = {
		type: define.sunblind.ID_MULTI,
		placement: options.placement,
		width: options.width,
		height: options.height,
		"cornice": cornice,
		"layers": layers,
		"decorPlank": decorPlank,
		"complectation": complectation,
		"lamellaSize": options.lamellaSize
	};
	return obj;
};

MultiSunblind.prototype.mutate = function(options) {
	var obj = options.obj;

	var cornice = obj.cornice;
	obj.cornice = Cornice.prototype.mutate.call(this, {
		width: options.width, 
		height: cornice.size, 
		generator: options.generator
	});

	var decorPlank = obj.decorPlank;
	obj.decorPlank = DecorPlank.prototype.mutate.call(this, {
		width: options.width, 
		height: decorPlank.height, 
		generator: options.generator
	});

	var layers = obj.layers;
	for(var i = 0; i < layers.length; i++)
		obj.layers[i] = MultiLayer.prototype.mutate.call(this, {
			lamellas: layers[i].lamellas,
			width: options.width,
			height: options.height,
			generator: options.generator,
			lamellaSize: obj.lamellaSize,
			"cornice": obj.cornice
		});

	var complectation = obj.complectation;
	for(var i = 0; i < complectation.length; i++)
		obj.complectation[i] = Complectation.prototype.mutate.call(this, {
			generator: options.generator
		});

	return obj;
};