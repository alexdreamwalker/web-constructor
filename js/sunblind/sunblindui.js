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

SunblindUI.prototype.start = function() {
	document.getElementById(this.elem).innerHTML = "";
	this.hideDesigner();

	var self = this;
	this.getMaterials()
		.then(function() { return self.getSizes(); })
		.then(function() { return self.getColors(); });
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
		var type = 1;
		wsOperator.postMessage({cmd: "getSunblindsColors", type: "db", params: {"idMaterial": material, "idType": type, "size": size}}, function(response) {
			var colors = JSON.parse(response);
			alert("colors size: " + colors.length);
			self.colors = colors;
			self.fillColors();
			resolve();
		});
	});
};

SunblindUI.prototype.fillColors = function() {
	var holders = ["sunblindsColors", "sunblindsDecorColor"];
	var designerTable = document.getElementById(this.designer).querySelector("tbody");
	designerTable.innerHTML = "";
	for(var j = 0; j < holders.length; j++) document.getElementById(holders[j]).innerHTML = "";

	for(var i = 0; i < this.colors.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = this.colors[i].Name;
		for(var j = 0; j < holders.length; j++) 
			document.getElementById(holders[j]).appendChild(option);

		var row = document.createElement("tr");
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

SunblindUI.prototype.showDesigner = function(e) {
	$("#" + this.designer).modal("show");
};

SunblindUI.prototype.hideDesigner = function(e) {
	$("#" + this.designer).modal("hide");
};