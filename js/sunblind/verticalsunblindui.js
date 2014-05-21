function VerticalSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

VerticalSunblindUI.prototype = Object.create(SunblindUI.prototype);

VerticalSunblindUI.prototype.start = function() {
	SunblindUI.prototype.start.apply(this, arguments);

	var sunblind = new VerticalSunblind({elem: this.elem});
	var svg = sunblind.paint();
	document.getElementById(this.elem).appendChild(svg);

	this.sunblind = sunblind;
};