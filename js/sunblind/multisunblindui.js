function MultiSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

MultiSunblindUI.prototype = Object.create(SunblindUI.prototype);

MultiSunblindUI.prototype.start = function() {
	SunblindUI.prototype.start.apply(this, arguments);

	var sunblind = new MultiSunblind({elem: this.elem});
	var svg = sunblind.paint();
	document.getElementById(this.elem).appendChild(svg);

	this.sunblind = sunblind;

	this.updateLayersComboBox();
};

MultiSunblindUI.prototype.applyBezierLayers = function() {
	this.sunblind.applyBezier();
};

MultiSunblindUI.prototype.addLayer = function() {
	this.sunblind.addMultiLayer();
	this.updateLayersComboBox();
};

MultiSunblindUI.prototype.removeLayer = function() {
	this.sunblind.removeMultiLayer();
	this.updateLayersComboBox();
};

MultiSunblindUI.prototype.switchLayer = function(e) {
	var index = e.value - 1;
	this.sunblind.switchLayer(index);
};

MultiSunblindUI.prototype.switchLayerControl = function(e) {
	if(e.checked == false)
		this.sunblind.hideLayerControls();
	else this.sunblind.showLayerControls();
};

MultiSunblindUI.prototype.updateLayersComboBox = function() {
	document.getElementById("multiSunblindsCurrentLayer").setAttribute("max", this.sunblind.layers.length);
};
