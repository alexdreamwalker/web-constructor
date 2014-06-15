function SunblindGenAlg(options) {}

SunblindGenAlg.prototype = Object.create(GenAlg.prototype);

SunblindGenAlg.prototype.placements = [];
SunblindGenAlg.prototype.materials = [];
SunblindGenAlg.prototype.cornices = [];
SunblindGenAlg.prototype.colors = [];
SunblindGenAlg.prototype.sizes = [];
SunblindGenAlg.prototype.sizeLimits = [];
SunblindGenAlg.prototype.complectations = [];
SunblindGenAlg.prototype.hasData = false;

SunblindGenAlg.prototype.type = 0;
SunblindGenAlg.prototype.topPrice = 0;
SunblindGenAlg.prototype.bottomPrice = 0;
SunblindGenAlg.prototype.topSize = 0;
SunblindGenAlg.prototype.bottomSize = 0;
SunblindGenAlg.prototype.lamellaSize = 0;

SunblindGenAlg.prototype.start = function() {
	var self = this;
	cppOperator.setSource("sunblindListener", function() {
		gid("sunGenAlgGetData").addEventListener("click", function() {
			self.generate();
		}, false);
		gid("sunGenAlgGo").addEventListener("click", function() {
			self.continueGeneration();
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
		wsOperator.postMessage({
			cmd: "getSunblindsColors", 
			type: "db", 
			params: {
				idType: self.type, 
				size: self.lamellaSize
			}
		}, function(response) {
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
		wsOperator.postMessage({
			cmd: "getSunblindsCorniceColors", 
			type: "db", 
			params: {
				idType: self.type, 
				size: self.lamellaSize
			}
		}, function(response) {
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
				data[i].fitness = parseInt(result[i] * define.COEFF);
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
	var result = 0;
	for(var i = 0; i < this.population.length; i++) {
		var min = Math.abs(this.population[i].fitness - this.expectedResult[i].fitness);
		var fitness = this.population[i].fitness;
		for(var j = 0; j < this.expectedResult.length; j++)
			if(Math.abs(this.population[i].fitness - this.expectedResult[j].fitness) < min)
				min = Math.abs(this.population[i].fitness - this.expectedResult[j].fitness);
		result += min;
	}
		
	return parseInt(result / this.population.length);
};

SunblindGenAlg.prototype.generateBasicPopulation = function() {
	var size = this.populationSize;
	var result = [];
	switch(this.type) {
		case define.sunblind.ID_VERTICAL:
			for(var i = 0; i < size; i++) {
				var width = parseInt(getRandom(this.bottomSize, this.topSize));
				var height = parseInt(getRandom(this.bottomSize, this.topSize));
				var sunblind = VerticalSunblind.prototype.generate.call(this, {
					generator: this,
					"width": width,
					"height": height,
					lamellaSize: this.lamellaSize
				});
				sunblind.fitness = 0;
				result.push(sunblind);
			}
			break;
		case define.sunblind.ID_HORIZONTAL:
			alert("Horizontal");
			for(var i = 0; i < size; i++) {
				var width = parseInt(getRandom(this.bottomSize, this.topSize));
				var height = parseInt(getRandom(this.bottomSize, this.topSize));
				var sunblind = HorizontalSunblind.prototype.generate.call(this, {
					generator: this,
					"width": width,
					"height": height,
					lamellaSize: this.lamellaSize
				});
				sunblind.fitness = 0;
				result.push(sunblind);
			}
			break;
		case define.sunblind.ID_MULTI:
			alert("multi");
			for(var i = 0; i < size; i++) {
				var width = parseInt(getRandom(this.bottomSize, this.topSize));
				var height = parseInt(getRandom(this.bottomSize, this.topSize));
				var sunblind = MultiSunblind.prototype.generate.call(this, {
					generator: this,
					"width": width,
					"height": height,
					lamellaSize: this.lamellaSize
				});
				sunblind.fitness = 0;
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
			fitness: parseInt(getRandom(this.bottomPrice, this.topPrice))
		};
		result.push(ideal);
	}
	return result;
};

SunblindGenAlg.prototype.mutation = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.mutationDebug();
		resolve();
	});
};

SunblindGenAlg.prototype.mutationDebug = function() {
	var self = this;
	console.log("mutation");

	var t = self.generationNumber;
	var T = self.generationMaxNumber;

	for(var i = 0; i < self.population.length; i++) {
		if(getRandom(0, 100) >= self.mutationChance)
			continue;

		var q = (Math.random() > 0.5) ? 1 : 0;
		if(q == 0) {
			var width = parseInt(self.population[i].width + (self.topSize - self.population[i].width) * (1 - Math.pow(r, (1 - t / T))));
			var height = parseInt(self.population[i].height + (self.topSize - self.population[i].height) * (1 - Math.pow(r, (1 - t / T))));
		} else {
			var width = parseInt(self.population[i].width - (self.population[i].width - self.bottomSize) * (1 - Math.pow(r, (1 - t / T))));
			var height = parseInt(self.population[i].height - (self.population[i].height - self.bottomSize) * (1 - Math.pow(r, (1 - t / T))));
		}

		switch(self.type) {
			case define.sunblind.ID_VERTICAL:
				self.population[i] = VerticalSunblind.prototype.mutate.call(self, {
					"width": width,
					"height": height,
					obj: self.population[i],
					generator: self
				});
				break;
			case define.sunblind.ID_HORIZONTAL:
				self.population[i] = HorizontalSunblind.prototype.mutate.call(self, {
					"width": width,
					"height": height,
					obj: self.population[i],
					generator: self
				});
				break;
			case define.sunblind.ID_MULTI:
				self.population[i] = MultiSunblind.prototype.mutate.call(self, {
					"width": width,
					"height": height,
					obj: self.population[i],
					generator: self
				});
				break;
		}
	}

	console.log("mutation finished");
};	

SunblindGenAlg.prototype.generate = function() {
	this.topPrice = parseInt(gid("sunGenAlgTopPrice").value);
	this.bottomPrice = parseInt(gid("sunGenAlgBottomPrice").value);
	this.topSize = parseInt(gid("sunGenAlgTopSize").value);
	this.bottomSize = parseInt(gid("sunGenAlgBottomSize").value);
	this.type = parseInt(document.querySelector("#sunGenAlgType label.active input").dataset.id);
	this.lamellaSize = parseInt(document.querySelector("#sunGenAlgLamSize label.active input").dataset.id);

	this.populationSize = parseInt(gid("sunGenAlgPopulationSize").value);
	this.mutationChance = parseInt(gid("sunGenAlgMutationChance").value);
	this.eps = parseInt(gid("sunGenAlgEps").value);

	this.getData();
};

SunblindGenAlg.prototype.continueGeneration = function() {
	var self = this;
	var result = null;
	self.population = self.generateBasicPopulation();
	self.expectedResult = self.generateExpectedResult();
	result = self.mainLoop();
};

SunblindGenAlg.prototype.showPopultation = function() {
	var self = this;
	var mainContainer = gid("sunGenAlgResult");
	if(this.generationNumber == 1)
		mainContainer.innerHTML = "";

	var panel = document.createElement("div");
	panel.className = "panel panel-info";
	var caption = document.createElement("div");
	caption.className = "panel-heading";
	caption.innerHTML = "Поколение №" + styleStrong(this.generationNumber) + " , пригодность: " + styleStrong(parseInt(this.difference(this.population, this.expectedResult)));
	var container = document.createElement("div");
	container.className = "panel-body";

	for(var i = 0; i < this.population.length; i++) {
		var unit = document.createElement("div");
		unit.className = "alert alert-info";
		unit.style.width = "10%";
		unit.style.float = "left";
		unit.style.margin = "10px";
		unit.innerHTML = "Особь №" + (i + 1) + " , пригодность: " + styleStrong(this.population[i].fitness);
		container.appendChild(unit);
	}

	var p = document.createElement("p");
	p.style.float = "right";
	var nextBtn = document.createElement("button");
	nextBtn.type = "button";
	nextBtn.className = "btn btn-info";
	nextBtn.innerHTML = "Дальше >>";
	nextBtn.addEventListener("click", function() {
		self.mainLoop();
	}, false);
	p.appendChild(nextBtn);

	panel.appendChild(caption);
	panel.appendChild(container);
	mainContainer.appendChild(panel);
	mainContainer.appendChild(p);
};