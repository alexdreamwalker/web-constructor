function GenAlg(options) {
	var population = options.population;
	var populationSize = options.populationSize || 100;
	var fitnessFunction = options.fitnessFunction;
	var expectedResult = options.expectedResult;
	var eps = options.eps;
	var difference = options.difference;
	var mutationFunction = options.mutation;
	var crossingOverFunction = options.crossingOver;
	var selectionFunction = options.selection;

	function countFitness() {
		return fitnessFunction(this);
	};

	function checkResult() {
		return (difference(population, expectedResult) <= eps);
	};

	function selection() {
		return new Promise(function(resolve, reject) {
			selectionFunction(population);
			resolve();
		});
	};

	function crossingOver() {
		return new Promise(function(resolve, reject) {
			crossingOverFunction(population);
			resolve();
		});
	};

	function mutation() {
		return new Promise(function(resolve, reject) {
			mutationFunction(population);
			resolve();
		});
	};

	function mainLoop() {
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