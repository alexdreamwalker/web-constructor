 function Construction(options) {
 	var self = this;
 }

 Construction.prototype.calculate = function(options) {
 	var result = 0;
 	return result;
 };

 Construction.prototype.paint = function(options) {

 };

 Construction.prototype.toJSON = function() {
 	var str = JSON.stringify(this);
 	console.log(str);
 	return str;
 };