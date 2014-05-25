function VerticalSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

VerticalSunblindUI.prototype = Object.create(SunblindUI.prototype);

VerticalSunblindUI.prototype.start = function() {
	var sunblind = new VerticalSunblind({elem: this.elem});
	var svg = sunblind.paint();
	this.sunblind = sunblind;

	SunblindUI.prototype.start.apply(this, arguments);
	document.getElementById(this.elem).appendChild(svg);
};