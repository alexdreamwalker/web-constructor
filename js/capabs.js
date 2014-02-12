
function CapabsTestOperator(options) {

	this.makeTests = function() {
		return checkCapabilities();
	};

	function checkCapabilities() {
		var caps = {};
		caps["webglEnabled"] = checkWebGLEnabled();
		caps["webglSupported"] = checkWebGLSupported();
		caps["webSockets"] = checkWebSocketsSupported();
		caps["webWorkers"] = checkWebWorkerSupported();
		return caps;
	};

	function checkWebGLEnabled() {
		return (window.WebGLRenderingContext) ? 1 : 0;
	};

	function checkWebGLSupported() {
		var canvas = document.createElement("canvas");
    	return (canvas.getContext("webgl")) ? 1 : 0;
	};

	function checkWebSocketsSupported() {
		return window.WebSocket ? 1: 0;
	};

	function checkWebWorkerSupported() {
		return window.Worker ? 1: 0;
	};

};