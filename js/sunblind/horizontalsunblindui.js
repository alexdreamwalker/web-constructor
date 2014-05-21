function HorizontalSunblindUI(options) {
	SunblindUI.apply(this, arguments);
};

HorizontalSunblindUI.prototype = Object.create(SunblindUI.prototype);

HorizontalSunblindUI.prototype.start = function() {
	SunblindUI.prototype.start.apply(this, arguments);

	var sunblind = new HorizontalSunblind({elem: this.elem});
	var svg = sunblind.paint();
	document.getElementById(this.elem).appendChild(svg);

	this.sunblind = sunblind;
};