function Complectation(options) {
	var self = this;
	this.id = options.id || 0;
	this.name = options.name || "undefined";
	this.price = options.price || 0;
}

Complectation.prototype.paint = function(options) {
	// body...
};

Complectation.prototype.calculate = function(options) {
	return parseFloat(this.price);
};

Complectation.prototype.toJSON = function() {
	return {
		id: this.id,
		name: this.name,
		price: this.calculate()
	};
};

Complectation.prototype.generate = function(options) {
	var comp = options.generator.generateComplectation();
	return {
		id: comp.ID,
		name: comp.Name,
		price: parseFloat(comp.Price)
	};
};

Complectation.prototype.mutate = function(options) {
	return Complectation.prototype.generate.call(this, options);
};