
function UIOperator(options) {

	this.makeChecks = function() {
		var messageDiv = document.getElementById("mainChecker");

		var messages = new Array();
		var caps = new CapabsTestOperator(null).makeTests();
		console.log(caps);
		if(caps["webSockets"] == 0) messages.push("webSockets недоступен в вашем браузере. Установите последнюю версию Google Chrome");
		if(caps["webWorkers"] == 0) messages.push("webWorkers недоступен в вашем браузере. Установите последнюю версию Google Chrome");
		if(caps["webglSupported"] == 0)  messages.push("Отрисовка выключена. Пройдите по ссылке 'chrome://flags/#ignore-gpu-blacklist' и нажмите 'Включить'");

		if(messages.length != 0) {
			var ul = document.createElement("ul");
			for(var i = 0; i < messages.length; i++) {
				var li = document.createElement("li");
				li.innerHTML = messages[i];
				ul.appendChild(li);
			}
			messageDiv.appendChild(ul);
			return 0;
		}

		return 1;
	};

	this.addMainMenuListeners = function() {
		var featurets = document.querySelectorAll("#mainMenu div.featurette");
		[].forEach.call(featurets, function(featurete) {
			var button = featurete.querySelector("button");
			var imgs = featurete.querySelectorAll("div.menu-category img");
			[].forEach.call(imgs, function(img) {
				img.addEventListener("mouseenter", function(e) {
					button.innerHTML = e.target.dataset.description;
				}, false);
			});
		});
	};

	this.processConnection = function(data) {
		var messageDiv = document.getElementById("loginStatus");
		switch(data.result) {
			case "success": 
				messageDiv.classList.remove("alert-danger");
				messageDiv.classList.add("alert-success");
				dbWorker.connected = true;
				ready();
				break;
			case "closed": 
				messageDiv.classList.remove("alert-success");
				messageDiv.classList.add("alert-danger");
				messageDiv.innerHTML = "<strong>" + "Вы не подключены к серверу. Конструктор работает в автономном режиме" + "</strong>";
				alert("Сервер закрыл соединение");
				break;
			case "error": 
				messageDiv.classList.remove("alert-success");
				messageDiv.classList.add("alert-danger");
				messageDiv.innerHTML = "<strong>" + "Вы не подключены к серверу. Конструктор работает в автономном режиме" + "</strong>";
				alert("Ошибка соединения");
				break;
			default: break;
		};
	};

	this.processWindows = function(id) {
		var windows = document.querySelectorAll("div.window");
		[].forEach.call(windows, function(win) {
			win.style.display = "none";
		});
		document.getElementById(id).style.display = "";
	};

	this.loadWindow = function(id, path, func) {
		document.getElementById(id).innerHTML = "";
		$("#" + id).load(path, func);
	};


	this.loadModule = function(options) {
		var self = this;
		this.loadWindow("mainWindow", "pages/mainWindow.html", function() {
			document.getElementById("mainWindow").style.height = window.innerHeight + "px";
			var module = options.module;
			
			uiOperator.loadWindow("moduleCategories", "pages/modules/" + module + "/categories.html");
			uiOperator.loadWindow("moduleTable", "pages/modules/" + module + "/table.html");
			uiOperator.loadWindow("moduleSummary", "pages/modules/" + module + "/summary.html");

			uiOperator.loadWindow("moduleCanvas", "pages/modules/" + module + "/canvas.html", function() {
				switch(module) {
					case "verticalsunblind": self.loadVerticalSunblinds(); break;
					case "multisunblind": self.loadMultiSunblinds(); break;
					default: break;
				}
			});
		});	
		this.processWindows("mainWindow");
	};

	this.loadVerticalSunblinds = function(options) {
		global.ui = new VerticalSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary"});
		global.ui.start();
	};

	this.loadMultiSunblinds = function(options) {
		global.ui = new MultiSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary"});
		global.ui.start();
	};

	this.loadOrder = function(options) {
		this.loadWindow("mainOrder", "pages/mainOrder.html", function() {});
		this.processWindows("mainOrder");
	};
};