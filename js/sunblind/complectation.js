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
	return this.price;
};

Complectation.prototype.toJSON = function() {
	return {
		id: this.id,
		name: this.name,
		price: this.calculate()
	};
};