function MultiSunblindUI(options) {
	this.categories = options.categories;
	this.sunblind = null;
	this.elem = options.elem;

	this.start = function() {
		var sunblind = new MultiSunblind({elem: this.elem});

		document.getElementById(this.elem).innerHTML = "";
		var svg = sunblind.paint();
		document.getElementById(this.elem).appendChild(svg);

		this.sunblind = sunblind;

		this.updateLayersComboBox();
	};

	this.applyBezierLayers = function() {
		this.sunblind.applyBezier();
	};

	this.addLayer = function() {
		this.sunblind.addMultiLayer();
		this.updateLayersComboBox();
	};

	this.removeLayer = function() {
		this.sunblind.removeMultiLayer();
		this.updateLayersComboBox();
	};

	this.switchLayer = function(e) {
		var index = e.value - 1;
		this.sunblind.switchLayer(index);
	};

	this.switchLayerControl = function(e) {
		if(e.checked == false)
			this.sunblind.hideLayerControls();
		else this.sunblind.showLayerControls();
	};

	this.switchDecorPlank = function(e) {
		var isActive = e.checked;
		this.sunblind.showDecorPlank(isActive);
	};

	this.updateLayersComboBox = function() {
		document.getElementById("multiSunblindsCurrentLayer").setAttribute("max", this.sunblind.layers.length);
	};
};