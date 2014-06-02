function Order(options) {

};

Order.prototype.constructionDetail = "";

Order.prototype.constructions = [];
Order.prototype.additionalService = [];
Order.prototype.companyLogo = "";
Order.prototype.payType = "";
Order.prototype.clientType = "";
Order.prototype.clientFIO = "";
Order.prototype.clientAddress = "";
Order.prototype.clientTelephone = "";
Order.prototype.clientPassport = "";
Order.prototype.clientPassportInfo = "";
Order.prototype.number = "";
Order.prototype.city = "";
Order.prototype.company = "";
Order.prototype.comanyAddress = "";
Order.prototype.companyLegalAddress = "";
Order.prototype.companyDirector = "";
Order.prototype.companyINN = "";
Order.prototype.companyKPP = "";
Order.prototype.companyOGRN = "";
Order.prototype.companyRS = "";
Order.prototype.companyBank = "";
Order.prototype.companyKS = "";
Order.prototype.companyBIK = "";
Order.prototype.companyTelephone = "";
Order.prototype.id = "";
Order.prototype.pagesCount = 1;
Order.prototype.meter = "";
Order.prototype.dateMeasure = "";
Order.prototype.countCoeff = define.COEFF;
Order.prototype.counterFIO = "";
Order.prototype.userFIO = "";
Order.prototype.dateMontage = "";
Order.prototype.dateOrder = "";
Order.prototype.firstDiscount = "";
Order.prototype.secondDiscount = "";
Order.prototype.thirdDiscount = "";

Order.prototype.clearConstructions = function() {
	this.constructions = [];
};	

Order.prototype.addConstruction = function(construction) {
	construction.order = this;
	this.constructions.push(construction);
};

Order.prototype.generateMainBlock = function() {

};

Order.prototype.process = function() {
	//insert values

	document.getElementById("printOrderMainBlock").innerHTML = "";
	document.getElementById("printOrderMainBlock").appendChild(this.generateMainBlock());
};