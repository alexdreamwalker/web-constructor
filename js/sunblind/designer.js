function Designer(options) {
	this.elem = options.elem;
	this.filterInput = null;
	this.filterButton = null;
	this.table = null;
	this.acceptButton = null;
	var self = this;

	this.init = function() {
		this.filterInput = document.querySelector("#" + this.elem + " input");
		this.filterInput.addEventListener("input", this.filterColors, false);
		this.filterButton = document.querySelectorAll("#" + this.elem + " button")[1];
		this.filterButton.addEventListener("click", this.filterColors, false);
		this.table = document.querySelector("#" + this.elem + " tbody");
		this.acceptButton = document.querySelectorAll("#" + this.elem + " button")[3];
		this.acceptButton.addEventListener("click", this.acceptColor, false);

		var rows = this.table.querySelectorAll("tr");
		for(var i = 0; i < rows.length; i++) rows[i].addEventListener("click", this.setColor, false);
	};

	this.filterColors = function() {
		var text = self.filterInput.value;
		var rows = self.table.querySelectorAll("tr");
		for(var i = 0; i < rows.length; i++) {
			var name = rows[i].querySelectorAll("td")[2].innerHTML;
			if(name.indexOf(text) == -1)
				rows[i].style.display = "none";
			else rows[i].style.display = "";
		}
	};

	this.setColor = function(e) {
		var target = this;
		var material = {};
		material.id = target.dataset.id;
		material.url = target.dataset.url;
		global.ui.applyColor(material);
		global.ui.hideDesigner();
	};

	this.acceptColor = function() {
		global.ui.hideDesigner();
	};

	this.init();
};