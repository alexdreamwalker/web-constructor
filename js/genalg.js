function GenAlgorithm(options) {
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
		for(var i = 0; i < population.length; i++)
			fitnessFunction(population[i]);
	};

	function checkResult() {
		return (difference(population, expectedResult) <= eps);
	};

	function selection() {

	};

	function crossingOver() {

	};

	function mutation() {

	};

	function mainLoop() {
		makeBasicPopulation();
		while(!checkResult) {
			countFitness();
			selection();
			crossingOver();
			mutation();
		}
		return population;
	};

	return mainLoop();
};