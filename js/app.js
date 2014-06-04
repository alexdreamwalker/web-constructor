var wsOperator = new WSOperator(null);
var uiOperator = new UIOperator(null);
var cppOperator = new CPPOperator(null);
var dbOperator = new DBOperator(null);

function start() {
	var checks = uiOperator.makeChecks();
	//if(!checks) {
	//	uiOperator.processWindows("mainChecker");
	//	return;
	//}
	uiOperator.loadWindow("mainMenu", "pages/mainMenu.html", uiOperator.addMainMenuListeners);
	uiOperator.processWindows("mainMenu");
	initWorkers();
};

function initWorkers() {
	wsOperator.connect();
};

function getUserInfo() {
	dbOperator.sendFilialRequest("getUserInfo", function(responseText) {
		var userInfo = JSON.parse(responseText);
		global.userInfo = userInfo;
	}, null);
};

function ready() {
	wsOperator.postMessage({
		"cmd": "authenticate", 
		"type": "db", 
		"params": {
			"userId": 1
		}
	}, null);
};