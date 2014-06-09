function LesVer(options) {
	var self = this;
	this.mode = options.mode || "V--P";
	this.sunblind = options.sunblind || null;

	this.context = null;

	this.rope = null;
	this.ropeLine = null;
	this.ropeText = null;

	this.stick = null;
	this.stickLine = null;
	this.stickText = null;
}

LesVer.prototype.paint = function() {
	var self = this;
	this.context = this.sunblind.element;

	this.rope = document.createElementNS(global.NS, "g");
	this.ropeLine = document.createElementNS(global.NS, "line");
	this.ropeLine.setAttribute("style", "stroke-width: 0.002px");
	this.ropeText = document.createElementNS(global.NS, "text");
	this.ropeText.innerHTML = "В";
	this.rope.appendChild(this.ropeLine);
	this.rope.appendChild(this.ropeText);

	this.stick = document.createElementNS(global.NS, "g");
	this.stickLine = document.createElementNS(global.NS, "line");
	this.stickLine.setAttribute("style", "stroke-width: 0.002px; stroke-dasharray: 0.003 0.003");
	this.stickText = document.createElementNS(global.NS, "text");
	this.stickText.innerHTML = "П";
	this.stick.appendChild(this.stickLine);
	this.stick.appendChild(this.stickText);

	this.repaint();
	this.context.appendChild(this.rope);
	this.context.appendChild(this.stick);
};

LesVer.prototype.repaint = function() {
	var width = this.sunblind.width + 10;
	
	switch(this.mode) {
		case "V--P":
			var ropeCoords = global.axisArea.contextToMap({x: -5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			var stickCoords = global.axisArea.contextToMap({x: width - 5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			break;
		case "P--V":
			var ropeCoords = global.axisArea.contextToMap({x: width - 5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			var stickCoords = global.axisArea.contextToMap({x: - 5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			break;
		case "Left":
			var ropeCoords = global.axisArea.contextToMap({x: -10, y: 0, width: 1, height: this.sunblind.height * 0.8});
			var stickCoords = global.axisArea.contextToMap({x: - 5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			break;
		case "Right":
			var ropeCoords = global.axisArea.contextToMap({x: width - 5, y: 0, width: 1, height: this.sunblind.height * 0.8});
			var stickCoords = global.axisArea.contextToMap({x: width, y: 0, width: 1, height: this.sunblind.height * 0.8});
			break;
	}

	this.ropeLine.setAttribute("x1", this.ropeCoords.x);
	this.ropeLine.setAttribute("y1", this.ropeCoords.y);
	this.ropeLine.setAttribute("x2", this.ropeCoords.x);
	this.ropeLine.setAttribute("y2", this.ropeCoords.y + this.ropeCoords.height);
	this.ropeText.setAttribute("x", this.ropeCoords.x);
	this.ropeText.setAttribute("y", this.ropeCoords.y + this.ropeCoords.height + 0.02);

	this.stickLine.setAttribute("x1", this.stickCoords.x);
	this.stickLine.setAttribute("y1", this.stickCoords.y);
	this.stickLine.setAttribute("x2", this.stickCoords.x);
	this.stickLine.setAttribute("y2", this.stickCoords.y + this.stickCoords.height);
	this.stickText.setAttribute("x", this.stickCoords.x);
	this.stickText.setAttribute("y", this.stickCoords.y + this.stickCoords.height + 0.02);
};

LesVer.prototype.setMode = function(mode) {
	this.mode = mode;
	this.repaint();
};