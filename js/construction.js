 function Construction(options) {
 	var self = this;
 	global.construction = this;
 	if(options.json) 
 		this.fromJSON(options.json);
 }

 Construction.prototype.priceTable = null;
 Construction.prototype.count = 1;

 Construction.prototype.calculate = function(options) {
 	var result = 0;
 	return result;
 };

 Construction.prototype.paint = function(options) {

 };

 Construction.prototype.fromJSON = function(obj) {

 };

 Construction.prototype.toJSON = function() {
 	
 };