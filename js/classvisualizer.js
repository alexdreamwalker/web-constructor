function ClassVisualizer(path, size) {
	this.path = document.getElementById(path);
	this.MAX_PROPERTIES = size || 6;
};

ClassVisualizer.prototype.visualize = function(classname, name) {
	var div = document.createElement("div");
	div.style.width = "400px";
	var h1 = document.createElement("h1");
	h1.innerHTML = name;
	h1.classname = "bg-primary";
	div.appendChild(h1);

	var obj = Object.create(classname);

	var props = [];
	var objs = [];
	for(var prop in obj) {
		if(typeof obj[prop] == "object")
			objs.push(prop);
		else 
			props.push(prop);
	}

	var objCount = objs.length > this.MAX_PROPERTIES / 2 ? this.MAX_PROPERTIES / 2 : objs.length;
	var propsCount = props.length > this.MAX_PROPERTIES / 2 ? this.MAX_PROPERTIES / 2 : props.length;

	var counter = 0;

	for(var i = 0; i < objCount; i++) {
		var p = document.createElement("p");
		p.className = "bg-success";
		p.innerHTML = " + " + objs[i];
		div.appendChild(p);
		counter++;
	}

	for(var i = 0; i < propsCount; i++) {
		var p = document.createElement("p");
		p.className = "bg-warning";
		p.innerHTML = " - " + props[i];
		div.appendChild(p);
		counter++;
	}

	if(props.length + objs.length > this.MAX_PROPERTIES) {
		var p = document.createElement("p");
		p.className = "bg-danger";
		p.innerHTML = "...";
		div.appendChild(p);
	}

	this.path.innerHTML = "";
	this.path.appendChild(div);
};