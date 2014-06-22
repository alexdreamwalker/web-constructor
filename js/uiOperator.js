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

	this.loadMain = function() {
		this.processWindows("mainMenu");
	};


	this.loadModule = function(options) {
		var self = this;
		this.loadWindow("mainWindow", "pages/mainWindow.html", function() {
			document.getElementById("mainWindow").style.height = window.innerHeight + "px";
			var module = options.module;
			
			uiOperator.loadWindow("moduleCategories", "pages/modules/" + module + "/categories.html");

			uiOperator.loadWindow("moduleTable", "pages/modules/" + module + "/table.html");

			uiOperator.loadWindow("moduleSummary", "pages/modules/" + module + "/summary.html", function() {
				var inputs = document.querySelectorAll("#moduleSummary input[type='number']");
					for(var i = 0; i < inputs.length; i++) inputs[i].addEventListener("change", self.recalculateSummary, false);
			});

			uiOperator.loadWindow("moduleModal", "pages/modules/" + module + "/modal.html");

			uiOperator.loadWindow("moduleCanvas", "pages/modules/" + module + "/canvas.html");

			uiOperator.loadWindow("moduleEmbed", "pages/modules/" + module + "/embed.html", function() {
				switch(module) {
					case "verticalsunblind": self.loadVerticalSunblinds(); break;
					case "horizontalsunblind": self.loadHorizontalSunblinds(); break;
					case "multisunblind": self.loadMultiSunblinds(); break;
					default: break;
				}
			});
		});	
		this.processWindows("mainWindow");
	};

	this.loadService = function(options) {
		var self = this;
		var service = options.service;
		this.loadWindow("mainWindow", "pages/services/" + service + "/index.html", function() {
			document.getElementById("mainWindow").style.height = window.innerHeight + "px";
			switch(service) {
				case "sunblindgenerator": self.loadSunblindGenerator(); break;
				case "classvisualizer": self.loadClassVisualizer(); break;
				default: break;
			}
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
		global.ui = new VerticalSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary", designer: "designerModal"});
		global.ui.start();
	};

	this.loadHorizontalSunblinds = function(options) {
		global.ui = new HorizontalSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary", designer: "designerModal"});
		global.ui.start();
	};

	this.loadMultiSunblinds = function(options) {
		global.ui = new MultiSunblindUI({elem: "moduleCanvas", categories: "moduleCategories", table: "moduleTable", summary: "moduleSummary", designer: "designerModal"});
		global.ui.start();
	};

	this.loadOrder = function(options) {
		var self = this;
		global.construction.complete();
		global.order.addConstruction(global.construction);
		this.loadWindow("mainOrder", "pages/mainOrder.html", function() {
			self.typeaheadOrderClient();
		});
		this.processWindows("mainOrder");
	};

	this.typeaheadOrderClient = function() {
		dbOperator.sendFilialRequest("searchClient", function(response) {
			response = {
				"clients": [
				{
					"id": "344",
					"surname": "Кундин",
					"firstname": "Ярослав",
					"birthDate": "1991-04-09",
					"seriesOfPassport": 1252,
					"numberOfPassport": 734567,
					"patronymic": "Сергеевич",
					"name": "Тюмень",
					"prepayment": "1900.00",
					"limit": 1000,
					"interval": 50,
					"flagDept": 0
				},
				{
					"id": "1388",
					"surname": "Якунина",
					"firstname": "Людмила",
					"birthDate": "0000-00-00",
					"seriesOfPassport": 6702,
					"numberOfPassport": 907613,
					"patronymic": "Васильевна",
					"name": "Тюмень",
					"prepayment": null,
					"limit": null,
					"interval": null,
					"flagDept": 0
				},
				{
					"id": "1448",
					"surname": "Горкуненко",
					"firstname": "Владимир",
					"birthDate": "0000-00-00",
					"seriesOfPassport": 7108,
					"numberOfPassport": 618370,
					"patronymic": "Николаевич",
					"name": "Тюмень",
					"prepayment": null,
					"limit": null,
					"interval": null,
					"flagDept": 0
				}
				]
			};
			for(var name in response.clients)
				response.clients[name].fio = [response.clients[name].surname, response.clients[name].firstname, response.clients[name].patronymic].join(" ");
			var names = new Bloodhound({
				datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.surname); },
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local: response.clients
			});
			names.initialize();

			$("#orderClient").typeahead(null, {
				displayKey: "fio",
				source: names.ttAdapter()
			});

			$("#orderClient").on("typeahead:selected", function(e, datum) {
				console.log(datum);
			});

		}, {"name": gid("orderClient").value, "searchParameter": "name"});
	};

	this.loadSunblindGenerator = function(options) {
		var rangeGroups = document.querySelectorAll("div.rangegroup");
		[].forEach.call(rangeGroups, function(rangeGroup) {
			var range = rangeGroup.querySelector("input[type='range']");
			var number = rangeGroup.querySelector("input[type='number']");
			range.addEventListener("change", function(e) {
				number.value = range.value;
			}, false);
		});
		var sunblindGenAlg = new SunblindGenAlg();
		global.genAlg = sunblindGenAlg;
		sunblindGenAlg.start();
	};

	this.loadClassVisualizer = function(options) {
		global.cv = new ClassVisualizer("classVisualizer");
	};

	this.setPriceTable = function(table) {
		global.construction.priceTable = table;
		var coeff = define.COEFF;
		var tbody = document.querySelector("#moduleTable tbody");
		tbody.innerHTML = "";
		var total = parseInt(table["total"]) * coeff;
		for(var row in table) {
			var caption = document.createElement("td");
			caption.innerHTML = row;
			var price = document.createElement("td");
			price.innerHTML = parseInt(table[row] * coeff) + " р.";
			var tr = document.createElement("tr");
			tr.appendChild(caption);
			tr.appendChild(price);
			tbody.appendChild(tr);
		}
		this.setPrice(total);
	};

	this.setPrice = function(price) {
		document.querySelectorAll("#moduleSummary input[type='number']")[6].value = price;
		this.recalculateSummary();
	};

	this.recalculateSummary = function() {
		var inputs = document.querySelectorAll("#moduleSummary input[type='number']");
		var per1 = inputs[0].value;
		var per2 = inputs[1].value;
		var per3 = inputs[2].value;
		global.order.firstDiscount = per1;
		global.order.secondDiscount = per2;
		global.order.thirdDiscount = per3;
		var count = inputs[3].value;
		global.construction.count = count;
		var price = inputs[6].value;
		var withoutDiscount = price * count;
		var withDiscount = withoutDiscount;
		withDiscount -= withDiscount / 100 * per1;
		withDiscount -= withDiscount / 100 * per2;
		withDiscount -= withDiscount / 100 * per3;
		inputs[4].value = withoutDiscount;
		inputs[5].value = parseInt(withDiscount);
	};

	this.getOrderInfoFromForm = function() {
		var opts = {};

		opts.additionalService = [];
		var services = document.querySelectorAll("#orderAdditionalService div");
		for(var i = 0; i < services.length; i++) {
			if(services[i].dataset.name == null)
				continue;
			var isSelected = services[i].querySelector("input[type='checkbox']");
			if(!isSelected.checked)
				continue;
			var service = {
				name: services[i].dataset.name,
				price: services[i].querySelector("input[type='number']").value
			};
			opts.additionalService.push(service);
		}

		opts.payType = "наличный";
		opts.clientType = gid("orderClient").dataset.type;
		opts.clientFIO = gid("orderClient").value;
		opts.clientAddress = [gid("orderCity").value, "ул. " + gid("orderStreet").value + " " + gid("orderHouse").value, "дом " + gid("orderFlat").value].join(", ");
		opts.clientTelephone = gid("orderTelephone").value;
		opts.clientPassport = gid("orderPassSerial").value + " " + gid("orderPassNumber").value;
		opts.clientPassportInfo = "нет данных";
		opts.number = "10096785";
		opts.id = "10096785";
		opts.meter = gid("orderMeter").value;
		opts.dateMeasure = gid("orderMeasureDate").value;
		opts.dateMontage = gid("orderMontageDate").value;
		opts.dateOrder = new Date();

		global.order.updateInfo(opts);
	};

	this.printOrder = function() {
		var self = this;
		this.loadWindow("mainPrint", "pages/mainPrint.html", function() {
			self.getOrderInfoFromForm();
			global.order.process();
			
			var mywindow = window.open("", "my div", "fullscreen=yes");
			mywindow.document.write("<html><head><title>my div</title>");
			mywindow.document.write("<meta charset='utf-8'>");
			mywindow.document.write("<link rel='stylesheet' href='css/print.css' type='text/css' />");
			mywindow.document.write("</head><body >");
			mywindow.document.write(document.getElementById("mainPrint").innerHTML);
			mywindow.document.write("</body></html>");
			mywindow.print();
    	});
	};
};