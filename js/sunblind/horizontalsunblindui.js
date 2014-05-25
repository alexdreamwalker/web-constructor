function HorizontalSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

HorizontalSunblindUI.prototype = Object.create(SunblindUI.prototype);

HorizontalSunblindUI.prototype.start = function() {
	var sunblind = new HorizontalSunblind({elem: this.elem});
	var svg = sunblind.paint();
	this.sunblind = sunblind;

	SunblindUI.prototype.start.apply(this, arguments);
	document.getElementById(this.elem).appendChild(svg);
};

HorizontalSunblindUI.prototype.getData = function() {
	var self = this;
	self.getPlacement()
		.then(function() { return self.getMaterials(); })
		.then(function() { return self.getSizes(); })
		.then(function() { return self.getSizeLimits(); })
		.then(function() { return self.getColors(); })
		.then(function() { return self.getCorniceColors(); })
		.then(function() { return self.getComplectation(); })
		.then(function() { return self.getStaircases(); })
		.then(function() { return self.getRopes(); });
};

HorizontalSunblindUI.prototype.getStaircases = function() {
	return new Promise(function(resolve, reject) {
		var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
		wsOperator.postMessage({cmd: "getSunblindsStaircases", type: "db", params: {"size": size}}, function(response) {
			var staircases = JSON.parse(response);
			var container = document.getElementById("sunblindsStaircase");
			container.innerHTML = "";
			for(var i = 0; i < staircases.length; i++) {
				var option = document.createElement("option");
				option.innerHTML = staircases[i].Name;
				option.dataset.id = staircases[i].ID;
				container.appendChild(option);
			}
			resolve();
		});
	});
};

HorizontalSunblindUI.prototype.getRopes = function() {
	return new Promise(function(resolve, reject) {
		var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
		wsOperator.postMessage({cmd: "getSunblindsRopes", type: "db", params: {"size": size}}, function(response) {
			var ropes = JSON.parse(response);
			var container = document.getElementById("sunblindsRope");
			container.innerHTML = "";
			for(var i = 0; i < ropes.length; i++) {
				var option = document.createElement("option");
				option.innerHTML = ropes[i].Name;
				option.dataset.id = ropes[i].ID;
				container.appendChild(option);
			}
			resolve();
		});
	});
};