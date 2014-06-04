var global = {
	NS: "http://www.w3.org/2000/svg",
	getCookie: function(name) {
		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		if(parts.length == 2) return parts.pop().split(";").shift();
	},
	loadScript: function(source, func) {
		var script = document.createElement("script");
		script.src = source;
		script.onload = func;
		document.head.appendChild(script);
	},
	ui: null,
	order: null,
	userInfo: null	
};

function gid(id) {
	return document.getElementById(id);
};

function getSelectValue(id) {
	var select = document.getElementById(id).selectedIndex;
	select = document.getElementById(id).options[select];
	return select;
};

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
};

function createDOMElement(type, inner) {
	var el = document.createElement(type);
	el.innerHTML = inner;
	return el;
};