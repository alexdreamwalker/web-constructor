function GenAlg(options) {
	var gens = options.gens;
	var population = [];
	var populationSize = options.populationSize || 100;
	var fitnessFunction = options.fitnessFunction;
	var expectedResult = options.expectedResult;
	var eps = options.eps;
	var difference = options.difference;

	function makeBasicPopulation() {
		population = [];
	};

	function countFitness() {
		return fitnessFunction(this);
	};

	function checkResult() {
		return (difference(population, expectedResult) <= eps);
	};

	function selection() {
		return new Promise(function(resolve, reject) {
			resolve();
		});
	};

	function crossingOver() {
		return new Promise(function(resolve, reject) {
			resolve();
		});
	};

	function mutation() {
		return new Promise(function(resolve, reject) {
			resolve();
		});
	};

	function mainLoop() {
		makeBasicPopulation();
		while(!checkResult) {
			countFitness()
				.then(function() { return selection(); })
				.then(function() { return crossingOver(); })
				.then(function() { return mutation(); })
		}
		return population;
	};

	return mainLoop();
};