function SunblindGenAlg(options) {}

SunblindGenAlg.prototype = Object.create(GenAlg.prototype);

SunblindGenAlg.prototype.placements = [];
SunblindGenAlg.prototype.materials = [];
SunblindGenAlg.prototype.cornices = [];
SunblindGenAlg.prototype.colors = [];
SunblindGenAlg.prototype.sizes = [];
SunblindGenAlg.prototype.sizeLimits = [];
SunblindGenAlg.prototype.complectations = [];

SunblindGenAlg.prototype.start = function() {
	var self = this;
	cppOperator.setSource("sunblindListener", function() {
		self.getData();
		gid("sunGenAlgGo").addEventListener("click", function() {
			self.generate();
		}, false);
	});
};

SunblindGenAlg.prototype.getData = function() {
	var self = this;
	self.getPlacement()
		.then(function() { return self.getMaterials(); })
		.then(function() { return self.getSizes(); })
		.then(function() { return self.getSizeLimits(); })
		.then(function() { return self.getColors(); })
		.then(function() { return self.getCorniceColors(); })
		.then(function() { return self.getComplectation(); });
};

SunblindGenAlg.prototype.getPlacement = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsPlacement", type: "db"}, function(response) {
			var placements = JSON.parse(response);
			self.placements = placements;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generatePlacement = function() {
	return this.placements[Math.floor(getRandom(0, this.placements.length))];
};

SunblindGenAlg.prototype.getMaterials = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsMaterials", type: "db"}, function(response) {
			var materials = JSON.parse(response);
			self.materials = materials;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generateMaterial = function() {
	return this.materials[Math.floor(getRandom(0, this.materials.length))];
};

SunblindGenAlg.prototype.getSizes = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsLamellaSizes", type: "db"}, function(response) {
			var sizes = JSON.parse(response);
			self.sizes = sizes;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generateSize = function() {
	return this.sizes[Math.floor(getRandom(0, this.sizes.length))];
};

SunblindGenAlg.prototype.getSizeLimits = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsSizeLimits", type: "db"}, function(response) {
			var sizeLimits = JSON.parse(response);
			self.sizeLimits = sizeLimits;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.getColors = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsColors", type: "db", params: {type: self.type}}, function(response) {
			var colors = JSON.parse(response);
			self.colors = colors;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generateLamellaMaterial = function() {
	return  this.colors[Math.floor(getRandom(0, this.colors.length))];
};

SunblindGenAlg.prototype.getCorniceColors = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsCorniceColors", type: "db", params: {type: self.type}}, function(response) {
			var colors = JSON.parse(response);
			self.cornices = colors;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generateCorniceMaterial = function() {
	return this.cornices[Math.floor(getRandom(0, this.cornices.length))];
};

SunblindGenAlg.prototype.getComplectation = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsComplectation", type: "db"}, function(response) {
			var complectations = JSON.parse(response);
			self.complectations = complectations;
			resolve();
		});
	});
};

SunblindGenAlg.prototype.generateComplectation = function() {
	return this.complectations[Math.floor(getRandom(0, this.complectations.length))];
};

SunblindGenAlg.prototype.calculate = function(data) {
	var self = this;
	return new Promise(function(resolve, reject) {
		cppOperator.postMessage("countBunchSunblinds", {"data": data}, function(response) {
			var result = JSON.parse(response).data;
			for(var i = 0; i < result.length; i++)
				data[i].fitness = result[i];
			resolve();
		});
	});	
};

SunblindGenAlg.prototype.fitness = function() {
	return this.calculate(this.population);
};

SunblindGenAlg.prototype.difference = function() {
	if(this.population.length > this.expectedResult.length)
		return null;
	var max = 0;
	for(var i = 0; i < this.population.length; i++)
		if(Math.abs(this.population[i].fitness - this.expectedResult[i].fitness) > max)
			max = Math.abs(this.population[i].fitness - this.expectedResult[i].fitness);
	return max;
};

SunblindGenAlg.prototype.generateBasicPopulation = function() {
	var size = this.populationSize;
	var result = [];
	switch(this.type) {
		case define.sunblind.ID_VERTICAL:
			for(var i = 0; i < size; i++) {
				var sunblind = VerticalSunblind.prototype.generate.call(this, {
					generator: this,
					width: 2000,
					height: 2000,
					lamellaSize: 89
				});
				result.push(sunblind);
			}
			break;
		case define.sunblind.ID_HORIZONTAL:
			alert("Horizontal");
			for(var i = 0; i < size; i++) {
				var sunblind = HorizontalSunblind.prototype.generate.call(this, {
					generator: this,
					width: 2000,
					height: 2000,
					lamellaSize: 16
				});
				result.push(sunblind);
			}
			break;
		case define.sunblind.ID_MULTI:
			alert("multi");
			for(var i = 0; i < size; i++) {
				var sunblind = MultiSunblind.prototype.generate.call(this, {
					generator: this,
					width: 2000,
					height: 2000,
					lamellaSize: 89
				});
				result.push(sunblind);
			}
			break;
	}

	return result;
};

SunblindGenAlg.prototype.generateExpectedResult = function() {
	var result = [];
	for(var i = 0; i < this.populationSize; i++) {
		var ideal = {
			fitness: (this.topPrice + this.bottomPrice) / 2
		};
		result.push(ideal);
	}
	return result;
};

SunblindGenAlg.prototype.mutation = function() {
	switch(this.type) {
		case define.sunblind.ID_VERTICAL:
			for(var i = 0; i < this.population.length; i++)
				this.population[i] = VerticalSunblind.prototype.mutate.call(this, {
					obj: this.population[i],
					generator: this
				});
			break;
		case define.sunblind.ID_HORIZONTAL:
			for(var i = 0; i < this.population.length; i++)
				this.population[i] = HorizontalSunblind.prototype.mutate.call(this, {
					obj: this.population[i],
					generator: this
				});
			break;
		case define.sunblind.ID_MULTI:
			for(var i = 0; i < this.population.length; i++)
				this.population[i] = MultiSunblind.prototype.mutate.call(this, {
					obj: this.population[i],
					generator: this
				});
			break;
	}
};

SunblindGenAlg.prototype.selection = function(population) {
	// body...
};

SunblindGenAlg.prototype.crossingOver = function(population) {

};

SunblindGenAlg.prototype.generate = function() {
	this.topPrice = parseInt(gid("sunGenAlgTopPrice").value);
	this.bottomPrice = parseInt(gid("sunGenAlgBottomPrice").value);
	this.type = parseInt(document.querySelector("#sunGenAlgType label.active input").dataset.id);

	this.populationSize = parseInt(gid("sunGenAlgPopulationSize").value);
	this.mutationChance = parseInt(gid("sunGenAlgMutationChance").value);
	this.eps = parseInt(gid("sunGenAlgEps").value);

	this.population = this.generateBasicPopulation();
	this.expectedResult = this.generateExpectedResult();

	var result = this.mainLoop();
};