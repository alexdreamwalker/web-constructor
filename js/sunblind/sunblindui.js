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
	this.getMaterials();
};

SunblindUI.prototype.getMaterials = function() {
	wsOperator.postMessage({cmd: "getSunblindsMaterials", type: "db"}, function(response) {
		alert("resp" + response);
	});
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