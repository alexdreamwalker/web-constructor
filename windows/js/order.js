function Order(options) {
	var self = this;
	this.constructions = [];

	this.clearConstructions = function() {
		this.constructions = [];
	};

	this.addConstruction = function(construction) {
		construction.order = this;
		this.constructions.push(construction);
	};

	this.process = function() {

	};
};