function MultiSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

MultiSunblindUI.prototype = Object.create(SunblindUI.prototype);

MultiSunblindUI.prototype.start = function() {
	var sunblind = new MultiSunblind({elem: this.elem});
	var svg = sunblind.paint();

	this.sunblind = sunblind;

	SunblindUI.prototype.start.apply(this, arguments);
	
	document.getElementById(this.elem).appendChild(svg);
	this.updateLayersComboBox();
};

MultiSunblindUI.prototype.applyBezierLayers = function() {
	this.sunblind.applyBezier();
	this.sunblind.sendToCalculate();
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
