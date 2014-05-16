
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
				wsOperator.connected = true;
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
			uiOperator.loadWindow("moduleModal", "pages/modules/" + module + "/modal.html");
			uiOperator.loadWindow("moduleCanvas", "pages/modules/" + module + "/canvas.html");

			uiOperator.loadWindow("moduleEmbed", "pages/modules/" + module + "/embed.html", function() {
				switch(module) {
					case "verticalsunblind": self.loadVerticalSunblinds(); break;
					case "multisunblind": self.loadMultiSunblinds(); break;
					default: break;
				}
			});
		});	
		this.processWindows("mainWindow");
	};

	this.setFullScreen = function(element) {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.mozRequestFullscreen) {
			element.mozRequestFullScreen();
		} else {
			var rows = document.querySelectorAll("#mainWindow tr");
			rows[0].style.height = "100%";
			rows[1].style.display = "none";
			var  cols = rows[0].querySelectorAll("td");
			cols[0].style.width = "100%";
			cols[1].style.display = "none";
		}
	};

	this.exitFullscreen = function() {
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.webkitExitFullscreen ) {
			document.webkitExitFullscreen();
		} else if(document.mozCancelFullscreen) {
			document.mozCancelFullScreen();
		} else {
			var rows = document.querySelectorAll("#mainWindow tr");
			rows[0].style.height = "70%";
			rows[1].style.display = "";
			var  cols = rows[0].querySelectorAll("td");
			cols[0].style.width = "65%";
			cols[1].style.display = "";
		}
	};

	this.requestFullImageScreen = function(value) {
		var img = document.getElementById("mainImage");
		var fullScreen = img.querySelector("span.glyphicon-resize-full");
		var normalScreen = img.querySelector("span.glyphicon-resize-small");
		if(value) {
			fullScreen.style.display = "none";
			normalScreen.style.display = "";
			this.setFullScreen(img);
		} else {
			fullScreen.style.display = "";
			normalScreen.style.display = "none";
			this.exitFullscreen();
		}
	};

	this.loadVerticalSunblinds = function(options) {
		global.ui = new VerticalSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary"});
		global.ui.start();
	};

	this.loadMultiSunblinds = function(options) {
		global.ui = new MultiSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary", designer: "designerModal"});
		global.ui.start();
	};

	this.loadOrder = function(options) {
		this.loadWindow("mainOrder", "pages/mainOrder.html", function() {});
		this.processWindows("mainOrder");
	};
};