function SunblindGenAlg(options) {

};

SunblindGenAlg.prototype.placements = [];
SunblindGenAlg.prototype.materials = [];
SunblindGenAlg.prototype.cornices = [];
SunblindGenAlg.prototype.colors = [];
SunblindGenAlg.prototype.sizes = [];
SunblindGenAlg.prototype.sizeLimits = [];
SunblindGenAlg.prototype.complectations = [];

SunblindGenAlg.prototype.start = function() {
	cppOperator.setSource("sunblindListener", function() {
		self.getData();
		self.generate();
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
		wsOperator.postMessage({cmd: "getSunblindsColors", type: "db", params: {}}, function(response) {
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
		wsOperator.postMessage({cmd: "getSunblindsCorniceColors", type: "db", params: {}}, function(response) {
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

SunblindGenAlg.prototype.fitness = function(data) {
	return this.calculate(data.population);
};

SunblindGenAlg.prototype.generate = function() {

};