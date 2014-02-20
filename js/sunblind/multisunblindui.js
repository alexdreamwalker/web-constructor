function MultiSunblindUI(options) {
	this.categories = options.categories;
	this.sunblind = null;
	this.elem = options.elem;

	this.start = function() {
		var sunblind = new MultiSunblind({elem: this.elem});

		document.getElementById(this.elem).innerHTML = "";
		var svg = sunblind.paint();
		document.getElementById(this.elem).appendChild(svg);
	};
};