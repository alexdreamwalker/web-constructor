function Layer(options) {
	var self = this;
	this.element = null;
	this.lamellas = [];
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

Layer.prototype.calculate = function(options) {
	var result = 0;
	return result;
};

Layer.prototype.addLamella = function(lamella) {
	lamella.layer = this;
	this.lamellas.push(lamella);
};