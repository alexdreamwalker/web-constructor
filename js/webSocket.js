var address = "web-constructor.barstrade.ru:8081/";

var socket = new WebSocket("ws://" + address);

socket.onopen = function() {
	self.postMessage({"cmd": "connect", "result": "success", "message": "Соединение успешно установлено"});
};

socket.onclose = function(event) {
	self.postMessage({"cmd": "connect", "result": "closed", "message": "Соединение закрыто сервером(" + event.reason + " " + event.code + ")"});
};

socket.onmessage = function(event) {
	self.postMessage({"cmd": "message", "result": "ok", "message": event.data});
};

socket.onerror = function(error) {
	self.postMessage({"cmd": "connect", "result": "error", "message": "Ошибка соединения"});
};

self.addEventListener("message", function(e) {
	switch(e.data.type) {
		case "db":
			socket.send(JSON.stringify(e.data));
			break;
		case "system":
			break;
		default: break;
	};
}, false);