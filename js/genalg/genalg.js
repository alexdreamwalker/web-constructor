function GenAlg() {}

GenAlg.prototype.population = [];
GenAlg.prototype.showPopultation = function() {};
GenAlg.prototype.populationSize = 0;
GenAlg.prototype.populationMaxSize = 50;
GenAlg.prototype.fitness = function() {};
GenAlg.prototype.expectedResult = [];
GenAlg.prototype.eps = 0;
GenAlg.prototype.difference = function() {};
GenAlg.prototype.mutation = function() {};
GenAlg.prototype.crossingOver = function() {};
GenAlg.prototype.selection = function() {};
GenAlg.prototype.selectionResult = [];
GenAlg.prototype.generationNumber = 0;
GenAlg.prototype.genetationMaxNumber = 20;
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

GenAlg.prototype.mutation = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.mutationDebug();
		resolve();
	});
};

GenAlg.prototype.mutationDebug = function() {

};	

GenAlg.prototype.selection = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.selectionDebug();
		resolve();
	});
};

GenAlg.prototype.selectionDebug = function() {
	console.log("selection");

	this.selectionResult = [];
	var sum = 0;
	for(var i = 0; i < this.population.length; i++)
		sum += this.population[i].fitness;
	for(var i = 0; i < this.population.length; i++) {
		var p = this.population[i].fitness / sum;
		var pp = Math.random();
		if(pp <= p)
			this.selectionResult.push(i);
	}

	console.log("selection finished");
};

GenAlg.prototype.crossingOver = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.crossingOverDebug();
		resolve();
	});
};

GenAlg.prototype.crossingOverDebug = function() {
	console.log("crossingOver");

	var cubs = [];
	for(var i = 0; i < this.selectionResult.length; i++)
		for(var j = 0; j < this.selectionResult.length; j++) {
			if(i == j)
				continue;
			var cub = this.population[this.selectionResult[i]].crossingOver(this.population[this.selectionResult[j]]);
			cubs.push(cub);
		}

	var T = Math.random();
	if(T == 0)
		T = 0.1;

	var population = [];

	if(cubs.length < this.populationSize) {
		var size = this.populationSize - cubs.length;
		for(var z = 0; z < size; z++) {
			var i = Math.floor(getRandom(0, this.population.length));
			var j = Math.floor(getRandom(0, this.population.length));
			var p = 1 / (1 + Math.exp((this.population[i].fitness - this.population[j].fitness) / T));
			if(p > Math.random())
				population.push(this.population[i]);
			else
				population.push(this.population[j]);
		}
	} else if(cubs.length > this.populationMaxSize) {
		var size = cubs.length - this.populationMaxSize;
		for(var z = 0; z < size; z++) {
			var i = Math.floor(getRandom(0, cubs.length));
			var j = Math.floor(getRandom(0, cubs.length));
			var p = 1 / (1 + Math.exp((cubs[i].fitness - cubs[j].fitness) / T));
			if(p > Math.random())
				population.push(cubs[i]);
			else
				population.push(cubs[j]);
		}
	}

	this.population = population;

	console.log("crossingOver finished");
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