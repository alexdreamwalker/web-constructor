function GenAlg() {}

GenAlg.prototype.population = [];
GenAlg.prototype.showPopultation = function() {};
GenAlg.prototype.populationSize = 0;
GenAlg.prototype.fitness = function() {};
GenAlg.prototype.expectedResult = [];
GenAlg.prototype.eps = 0;
GenAlg.prototype.difference = function() {};
GenAlg.prototype.mutation = function() {};
GenAlg.prototype.crossingOver = function() {};
GenAlg.prototype.selection = function() {};
GenAlg.prototype.generationNumber = 0;
GenAlg.prototype.shallContinue = true;
GenAlg.prototype.mutationChance = 0;

GenAlg.prototype.routine = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.generationNumber++;
		console.log("population #" + self.generationNumber + ": ");
		console.log(self.population);
		self.showPopultation();
		resolve();
	});
};

GenAlg.prototype.checkResult = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.shallContinue = (self.difference(self.population, self.expectedResult) >= self.eps);
		self.shallContinue = (self.generationNumber < 5);
		console.log("check: " + self.shallContinue);
		if(self.shallContinue) {
			self.mainLoop();
			reject();
		}
		else {
			return self.population;
			reject();
		}
	});
};

GenAlg.prototype.mainLoop = function() {
	var self = this;
	self.fitness()
	.then(function() {
		return self.routine();
	})
	.then(function() {
		return self.selection();
	})
	.then(function() {
		return self.crossingOver();
	})
	.then(function() {
		return self.mutation();
	});
};