function SunblindUI(options) {
	this.categories = options.categories;
	this.sunblind = null;
	this.elem = options.elem;
	this.designer = options.designer;
};

SunblindUI.prototype.categories = this.categories;
SunblindUI.prototype.sunblind = this.sunblind;
SunblindUI.prototype.elem = this.elem;
SunblindUI.prototype.designer = this.designer;
SunblindUI.prototype.colors = [];
SunblindUI.prototype.cornices = [];
SunblindUI.prototype.activeColors = [];
SunblindUI.prototype.designerActive = false;

SunblindUI.prototype.start = function() {
	document.getElementById(this.elem).innerHTML = "";
	this.hideDesigner();
	Designer({elem: this.designer});

	var self = this;
	
	cppOperator.setSource("sunblindListener", function() {
		self.getPlacement()
		.then(function() { return self.getMaterials(); })
		.then(function() { return self.getSizes(); })
		.then(function() { return self.getColors(); })
		.then(function() { return self.getCorniceColors(); })
		.then(function() { return self.getComplectation(); });
	});
};

SunblindUI.prototype.getPlacement = function() {
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsPlacement", type: "db"}, function(response) {
			var placements = JSON.parse(response);
			var container = document.getElementById("sunblindsPlacement");
			container.innerHTML = "";
			for(var i = 0; i < placements.length; i++) {
				var div = document.createElement("div");
				div.className = "radio";
				var label = document.createElement("label");
				var input = document.createElement("input");
				input.type = "radio";
				input.name = "placementRadio";
				input.value = placements[i].ID;
				input.dataset.id = placements[i].ID;
				var text = document.createTextNode(placements[i].Name);
				label.appendChild(input);
				label.appendChild(text);
				div.appendChild(label);
				container.appendChild(div);
			}
			resolve();
		});
	});
};

SunblindUI.prototype.getMaterials = function() {
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsMaterials", type: "db"}, function(response) {
			var materials = JSON.parse(response);
			var container = document.getElementById("sunblindsMaterials");
			container.innerHTML = "";
			for(var i = 0; i < materials.length; i++) {
				var option = document.createElement("option");
				option.innerHTML = materials[i].Name;
				option.dataset.id = materials[i].ID;
				container.appendChild(option);
			}
			resolve();
		});
	});
};

SunblindUI.prototype.getSizes = function() {
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsLamellaSizes", type: "db"}, function(response) {
			var sizes = JSON.parse(response);
			var container = document.getElementById("sunblindsLamellaSizes");
			container.innerHTML = "";
			for(var i = 0; i < sizes.length; i++) {
				var option = document.createElement("option");
				option.innerHTML = sizes[i].Size;
				option.dataset.size = sizes[i].Size;
				container.appendChild(option);
			}
			resolve();
		});
	});
};

SunblindUI.prototype.getColors = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		var material = getSelectValue("sunblindsMaterials").dataset.id;
		var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
		alert(self.sunblind.lamellaOrientation);
		var type = self.sunblind.lamellaOrientation;
		wsOperator.postMessage({cmd: "getSunblindsColors", type: "db", params: {"idMaterial": material, "idType": type, "size": size}}, function(response) {
			var colors = JSON.parse(response);
			self.colors = colors;
			self.fillColors();
			resolve();
		});
	});
};

SunblindUI.prototype.getCorniceColors = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
		wsOperator.postMessage({cmd: "getSunblindsCorniceColors", type: "db", params: {"size": size}}, function(response) {
			var colors = JSON.parse(response);
			self.cornices = colors;
			self.fillCornices();
			resolve();
		});
	});
};

SunblindUI.prototype.getComplectation = function() {
	return new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsComplectation", type: "db"}, function(response) {
			var complectations = JSON.parse(response);
			var container = document.getElementById("sunblindsComplectation");
			container.innerHTML = "";
			for(var i = 0; i < complectations.length; i++) {
				var div = document.createElement("div");
				div.className = "radio";
				var label = document.createElement("label");
				var input = document.createElement("input");
				input.type = "radio";
				input.name = "complectationRadio";
				input.value = complectations[i].ID;
				input.dataset.id = complectations[i].ID;
				var text = document.createTextNode(complectations[i].Name);
				label.appendChild(input);
				label.appendChild(text);
				div.appendChild(label);
				container.appendChild(div);
			}
			resolve();
		});
	});
};

SunblindUI.prototype.fillColors = function() {
	var designerTable = document.getElementById(this.designer).querySelector("tbody");
	designerTable.innerHTML = "";

	for(var i = 0; i < this.colors.length; i++) {
		var row = document.createElement("tr");
		row.dataset.id = this.colors[i].ID;
		row.dataset.url = this.colors[i].Color;
		row.dataset.price = this.colors[i].Price;
		row.dataset.type = "lamella";
		var imgTd = document.createElement("td");
		var img = document.createElement("img");
		img.src = this.colors[i].Color;
		imgTd.appendChild(img);
		var articleTd = document.createElement("td");
		var article = document.createTextNode(this.colors[i].Article);
		articleTd.appendChild(article);
		var nameTd = document.createElement("td");
		var name = document.createTextNode(this.colors[i].Name);
		nameTd.appendChild(name);
		row.appendChild(imgTd);
		row.appendChild(articleTd);
		row.appendChild(nameTd);
		designerTable.appendChild(row);
	}
	Designer({elem: this.designer});
};

SunblindUI.prototype.fillCornices = function() {
	var designerTable = document.getElementById(this.designer).querySelector("tbody");

	for(var i = 0; i < this.colors.length; i++) {
		var row = document.createElement("tr");
		row.dataset.id = this.colors[i].ID;
		row.dataset.url = this.colors[i].Color;
		row.dataset.price = this.colors[i].Price;
		row.dataset.type = "cornice";
		var imgTd = document.createElement("td");
		var img = document.createElement("img");
		img.src = this.colors[i].Color;
		imgTd.appendChild(img);
		var articleTd = document.createElement("td");
		var article = document.createTextNode(this.colors[i].Article);
		articleTd.appendChild(article);
		var nameTd = document.createElement("td");
		var name = document.createTextNode(this.colors[i].Name);
		nameTd.appendChild(name);
		row.appendChild(imgTd);
		row.appendChild(articleTd);
		row.appendChild(nameTd);
		designerTable.appendChild(row);
	}
};

SunblindUI.prototype.switchDecorPlank = function(e) {
	var isActive = e.checked;
	this.sunblind.showDecorPlank(isActive);
};

SunblindUI.prototype.showDesigner = function(type) {
	this.designer.setType(type);
	$("#" + this.designer).modal("show");
};

SunblindUI.prototype.hideDesigner = function(e) {
	$("#" + this.designer).modal("hide");
};

SunblindUI.prototype.addSVGColor = function(material) {
	if(this.activeColors.indexOf(material.id) == -1) {
		this.activeColors.push(material.id);
		var pattern = document.createElementNS(global.NS, "pattern");
		if(material.type == "cornice") pattern.setAttribute("id", "patternCornice" + material.id);
		else pattern.setAttribute("id", "pattern" + material.id);
		pattern.setAttribute("patternUnits", "userSpaceOnUse");
		pattern.setAttribute("width", 0.1);
		pattern.setAttribute("height", 0.1);
		var image = document.createElementNS(global.NS, "image");
		image.setAttributeNS("http://www.w3.org/1999/xlink", "href", material.url);
		image.setAttribute("width", 0.1);
		image.setAttribute("height", 0.1);
		image.setAttribute("x", 0);
		image.setAttribute("y", 0);
		pattern.appendChild(image);
		this.sunblind.defs.appendChild(pattern);
	}
};

SunblindUI.prototype.applyColor = function(material) {
	this.addSVGColor(material);
	for(var i = 0; i < this.sunblind.layers.length; i++)
		for(var j = 0; j < this.sunblind.layers[i].lamellas.length; j++)
			if(this.sunblind.layers[i].lamellas[j].selected) this.sunblind.layers[i].lamellas[j].setMaterial(material);
	if(this.sunblind.decorPlank.selected) this.sunblind.decorPlank.setMaterial(material);
	if(this.sunblind.cornice.selected) this.sunblind.cornice.setMaterial(material);
};