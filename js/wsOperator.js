function WSOperator(options) {
	var actions = [];
    var dbWorker = null;
    this.connected = false;


    function startWork() {
        dbWorker = new Worker("js/webSocket.js");
        this.connected = false;
        dbWorker.addEventListener("message", handleMessage, false);
    };

    this.postMessage = function(options, callback) {
    	actions[options.cmd] = callback;
        dbWorker.postMessage(options);
    };

    this.connect = function() {
        startWork();
    };

    function handleMessage(e) {
        console.log("socket says: " + e.data.message);
        switch(e.data.cmd) {
            case "connect":
                uiOperator.processConnection(e.data); 
                break;

            case "message":
                var data = JSON.parse(e.data.message);
                actions[data.cmd](data.message);
                break;

            default:
                alert("unsupported operation"); 
                break;
        };
    };
};