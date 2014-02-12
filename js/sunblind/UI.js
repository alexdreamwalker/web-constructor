function SunblindUI(options) {
	this.elem = options.elem;
	this.categories = options.categories;
	this.sunblind = null;

	this.start = function() {
		var sunblind = new Sunblind({elem: this.elem});
		var cornice = new Cornice();
		sunblind.setCornice(cornice);

		document.getElementById(this.elem).innerHTML = "";
		var svg = sunblind.paint();
		document.getElementById(this.elem).appendChild(svg);
	};
};