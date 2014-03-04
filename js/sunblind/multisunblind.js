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

	this.activeLayer = 0;
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
	this.activeLayer = this.data.layers.length - 1;
};

MultiSunblind.prototype.addMultiLayer = function() {
	var layer = new MultiLayer({width: this.width, height: this.height, lamellaSize: 16, lamellas: []});
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

MultiSunblind.prototype.applyBezier = function() {
	this.layers[this.activeLayer].applyBezier();
};