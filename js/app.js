var dbWorker = null;
var uiOperator = new UIOperator(null);
var cppOperator = new CPPOperator(null);

function start() {
	var checks = uiOperator.makeChecks();
	//if(!checks) {
	//	uiOperator.processWindows("mainChecker");
	//	return;
	//}
	uiOperator.loadWindow("mainMenu", "pages/mainMenu.html", uiOperator.addMainMenuListeners);
	uiOperator.processWindows("mainMenu");
	//cppOperator.setSource("listener");
	//cppOperator.postMessage("hello dear", [], function(response) {
	//	alert(response);
	//});

	initWorkers();
};

function initWorkers() {
	dbWorker = new Worker("js/wsOperator.js");
	dbWorker.connected = false;

	dbWorker.addEventListener("message", function(e) {
		console.log("socket says: " + e.data.message);
		switch(e.data.cmd) {
			case "connect":
				uiOperator.processConnection(e.data); 
				break;
			case "message":
				alert("Server says: " + e.data.message);
				break;
			default: break;
		};
	}, false);
};

function ready() {
	dbWorker.postMessage({"cmd": "authenticate", "type": "db", "params": {"userId": getCookie("bars-id")}});
};