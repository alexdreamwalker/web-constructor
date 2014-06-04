function Layer(options) {
	var self = this;
	this.element = null;
	this.lamellas = [];
	this.materials = [];
	this.context = this.sunblind.element;

	this.init();
}

Layer.prototype.init = function() {
	
};

Layer.prototype.paint = function(options) {
	for(var i = 0; i < this.lamellas.length;i++)
		this.lamellas[i].paint();
	this.context.appendChild(this.element);
};

Layer.prototype.destroy = function() {
	this.element.outerHTML = "";
};

Layer.prototype.calculate = function(options) {
	var result = 0;
	return result;
};

Layer.prototype.addMaterial = function(material) {
	for(var i = 0; i < this.materials.length; i++)
		if(this.materials[i].id == material.id) {
			this.materials[i].count++; 
			return;
		}
	material.count = 1;
	this.materials.push(material);
}

Layer.prototype.addLamella = function(lamella) {
	lamella.layer = this;
	this.lamellas.push(lamella);
};

Layer.prototype.fromJSON = function(obj) {
	var lamellas = obj.lamellas;
	for(var i = 0; i < lamellas.length; i++) {
		var lamella = new Lamella();
		lamella.fromJSON(lamellas[i]);
		this.addLamella(lamella);
	}
};

Layer.prototype.toJSON = function() {
	var lamellas = [];
	for(var i = 0; i < this.lamellas.length; i++)
		lamellas.push(this.lamellas[i].toJSON());
	return {
		"lamellas": lamellas,
		minLayerSquare: define.sunblind.MIN_LAYER_SQUARE,
		width: this.sunblind.width,
		height: this.sunblind.height
	};
};

Layer.prototype.generate = function() {

};