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
SunblindUI.prototype.materials = [];

SunblindUI.prototype.start = function() {
	document.getElementById(this.elem).innerHTML = "";

	this.getMaterials().then(function() { return this.getSizes(); }).then(function() { return this.getColors(); });

	//this.getMaterials();
	//this.getSizes();
	//this.getColors();
};

SunblindUI.prototype.getMaterials = function() {
	var promise = new Promise(function(resolve, reject) {
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
	return promise;
};

SunblindUI.prototype.getSizes = function() {
	var promise = new Promise(function(resolve, reject) {
		wsOperator.postMessage({cmd: "getSunblindsLamellaSizes", type: "db"}, function(response) {
			var sizes = JSON.parse(response);
			var container = document.getElementById("sunblindsLamellaSizes");
			container.innerHTML = "";
			for(var i = 0; i < sizes.length; i++) {
				var option = document.createElement("option");
				option.innerHTML = sizes[i].Size;
				option.dataset.size = sizes[i];
				container.appendChild(option);
			}
			resolve();
		});
	});
	return promise;
};

SunblindUI.prototype.getColors = function() {
	var promise = new Promise(function(resolve, reject) {
		var material = getSelectValue("sunblindsMaterials").dataset.id;
		var size = getSelectValue("sunblindsLamellaSizes").dataset.size;
		var type = 1;
		wsOperator.postMessage({cmd: "getSunblindsColors", type: "db", params: {"idMaterial": material, "idType": type, "size": size}}, function(response) {
			var colors = JSON.parse(response);
			alert("colors size: " + colors.length);
			resolve();
		});
	});
	return promise;
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