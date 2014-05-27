var wsOperator = new WSOperator(null);
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
	//wsOperator.connect();
};

function ready() {
	//wsOperator.postMessage({"cmd": "authenticate", "type": "db", "params": {"userId": 1}}, null);
};