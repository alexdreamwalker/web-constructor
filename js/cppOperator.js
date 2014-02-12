function CPPOperator(options) {
	var actions = [];
    var elem = null;
    var embed = null;

    function startWork() {
        var listener = document.getElementById(elem);
        listener.addEventListener("load", function() {
            alert("Модуль " + elem + " готов к работе");
            embed = listener.querySelector("embed");
            listener.addEventListener('message', handleMessage, true);
        }, true);
    };

    this.postMessage = function(action, args, callback) {
    	actions[action] = callback;
        console.log("message posted");
    	var array = {};
    	array.action = action;
    	for(var arg in args)
    		array[arg] = args[arg];
    	embed.postMessage(JSON.stringify(array));
    };

    this.setSource = function(source) {
        elem = source;
        startWork();
    };

    function handleMessage(message_event) {
    	var message = JSON.parse(message_event.data);
      	for(var action in actions)
      		if(message.action == action)
      			actions[action](message_event.data);
    };
};