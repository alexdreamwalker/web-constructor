function MultiWindowsUI(options) {
	this.categories = options.categories;
	this.elem = options.elem;
};

MultiWindowsUI.prototype.start = function() {
	console.log("ready");
	cppOperator.setSource("listener", initCallBack);
	//cppOperator.setSource("sunblindListener", function() {
	//	self.getData();
	//});
};