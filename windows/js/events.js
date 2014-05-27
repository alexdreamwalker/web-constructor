function EventObserver() {

}

EventObserver.prototype.on = function(eventName, handler) {
  if (!this._eventHandlers) this._eventHandlers = [];
  if (!this._eventHandlers[eventName]) {
    this._eventHandlers[eventName] = [];
  }
  this._eventHandlers[eventName].push(handler);
};

EventObserver.prototype.off = function(eventName, handler) {
  var handlers = this._eventHandlers[eventName];
  if (!handlers) return;
  for(var i=0; i<handlers.length; i++) {
    if (handlers[i] == handler) {
      handlers.splice(i--, 1);
    }
  }
};

EventObserver.prototype.trigger = function(eventName) {
  if (!this._eventHandlers[eventName]) return; // обработчиков для события нет
  // вызвать обработчики 
  var handlers = this._eventHandlers[eventName];
  for (var i = 0; i < handlers.length; i++) {
    handlers[i].apply(this, [].slice.call(arguments, 1));
  }
};