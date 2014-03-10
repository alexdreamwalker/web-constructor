function MultiSunblind(options) {
	var self = this;
	Sunblind.apply(this, arguments);

	this.data = {
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
			height: 89,
			width: 2300
		},
		complectation: []
	};

	this.activeLayer = 0;
	this.init();
}

MultiSunblind.prototype = Object.create(VerticalSunblind.prototype);

MultiSunblind.prototype.init = function() {
	this.width = this.data.width;
	this.height = this.data.height;

	var cornice = new Cornice(this.data.cornice);
	this.setCornice(cornice);

	var decorPlank = new DecorPlank({this.data.decorplank});

	for(var i = 0; i < this.data.layers.length; i++) {
		var layer = new MultiLayer(this.data.layers[i]);
		this.addLayer(layer);
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