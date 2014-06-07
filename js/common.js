var global = {
	NS: "http://www.w3.org/2000/svg",
	getCookie: function(name) {
		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		if(parts.length == 2) 
  			return parts.pop().split(";").shift();
	},
	loadScript: function(source, func) {
		var script = document.createElement("script");
		script.src = source;
		script.onload = func;
		document.head.appendChild(script);
	},
	ui: null,
	construction: null,
	order: null,
	userInfo: {
		companyLogo : "images/logos/bars-tyumen.jpg",
		company : "Барс Тюмень",
		companyAddress : "Харьковская 93/3",
		companyLegalAddress : "Харьковская 93/3",
		companyDirector : "Семенов Игорь Геннадьевич",
		companyINN : "99998584885485",
		companyKPP : "45454545454",
		companyOGRN : "123456789",
		companyRS : "23409230428",
		companyBank : "Сибнефтебанк",
		companyKS : "43534543534",
		companyBIK : "5345345345",
		companyTelephone : "9829307996",
		FIO : "Копец Виктория Юрьевна",
		city : "Тюмень"
	}	
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