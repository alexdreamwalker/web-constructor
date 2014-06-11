function GenAlg() {}

GenAlg.prototype.population = [];
GenAlg.prototype.populationSize = 0;
GenAlg.prototype.fitness = function() {};
GenAlg.prototype.expectedResult = [];
GenAlg.prototype.eps = 0;
GenAlg.prototype.difference = function() {};
GenAlg.prototype.mutation = function() {};
GenAlg.prototype.crossingOver = function() {};
GenAlg.prototype.selection = function() {};

GenAlg.prototype.mainLoop = function() {
	var self = this;
	console.log("basic population: ");
	console.log(this.population);
	while(this.difference(this.population, this.expectedResult) >= this.eps) {
		console.log("population: ");
		console.log(this.population);

		self.fitness()
		.then(function() {
			return self.selection();
		})
		.then(function() {
			return self.crossingOver();
		})
		.then(function() {
			return self.mutation();
		})
	}

	return self.population;
};