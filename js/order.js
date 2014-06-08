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
Order.prototype.companyAddress = "";
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
Order.prototype.firstDiscount = 0;
Order.prototype.secondDiscount = 0;
Order.prototype.thirdDiscount = 0;

Order.prototype.clearConstructions = function() {
	this.constructions = [];
};	

Order.prototype.addConstruction = function(construction) {
	construction.order = this;
	this.constructions.push(construction);
};

Order.prototype.updateInfo = function(options) {
	this.companyLogo = global.userInfo.companyLogo;
	this.company = global.userInfo.company;
	this.companyAddress = global.userInfo.companyAddress;
	this.companyLegalAddress = global.userInfo.companyLegalAddress;
	this.companyDirector = global.userInfo.companyDirector;
	this.companyINN = global.userInfo.companyINN;
	this.companyKPP = global.userInfo.companyKPP;
	this.companyOGRN = global.userInfo.companyOGRN;
	this.companyRS = global.userInfo.companyRS;
	this.companyBank = global.userInfo.companyBank;
	this.companyKS = global.userInfo.companyKS;
	this.companyBIK = global.userInfo.companyBIK;
	this.companyTelephone = global.userInfo.companyTelephone;
	this.pagesCount = 1;
	this.countCoeff = define.COEFF;
	this.userFIO = global.userInfo.FIO;
	this.counterFIO = global.userInfo.FIO;
	this.city = global.userInfo.city;

	for(var option in options)
		this[option] = options[option];
};

Order.prototype.fillFields = function() {
	var self = this;
	var coeff = define.COEFF;
	gid("printOrderPayType").innerHTML = this.payType;
	gid("printOrderClientType").innerHTML = this.clientType;
	gid("printOrderClientFIO").innerHTML = this.clientFIO;
	gid("printOrderClientAddress").innerHTML = this.clientAddress;
	gid("printOrderOrderNumber").innerHTML = this.number;
	gid("printOrderCity").innerHTML = this.city;
	gid("printOrderCompany").innerHTML = this.company;
	gid("printOrderCompanyLogo").src = this.companyLogo;
	gid("printOrderCompanyAddress").innerHTML = this.companyAddress;
	gid("printOrderCompanyLegalAddress").innerHTML = this.companyLegalAddress;
	gid("printOrderConstructionDetail").innerHTML = this.constructionDetail;
	gid("printOrderOrderID").innerHTML = this.id;
	gid("printOrderClientTelephone").innerHTML = this.clientTelephone;
	gid("printOrderPagesCount").innerHTML = this.pagesCount;
	gid("printOrderMeter").innerHTML = this.meter;
	gid("printOrderConstructionsCount").innerHTML = (function() {
		var count = 0;
		for(var i = 0; i < self.constructions.length; i++)
			count += parseInt(self.constructions[i].count);
		return count;
	})();
	gid("printOrderDateMeasure").innerHTML = this.dateMeasure;
	gid("printOrderCountCoeff").innerHTML = define.COEFF;
	gid("printOrderCounterFIO").innerHTML = this.counterFIO;
	gid("printOrderUserFIO").innerHTML = this.userFIO;
	gid("printOrderAdditionalService").innerHTML = (function() {
		var result = "";
		for(var i = 0; i < self.additionalService.length; i++)
			result += self.additionalService[i].name + " ";
		return result;
	})();
	gid("printOrderDateMontage").innerHTML = this.dateMontage;
	gid("printOrderDateOrder").innerHTML = this.dateOrder;
	gid("printOrderConstructionsPrice").innerHTML =  this.calculateConstructionsString();
	gid("printOrderServicePrice").innerHTML = this.calculateServicePrice() + " р.";
	gid("printOrderTotalPrice").innerHTML = this.calculateConstructionsPercentPrice() * coeff + this.calculateServicePrice() + " р.";

	gid("contractNumber").innerHTML = this.number;
	gid("contractCity").innerHTML = this.city;
	gid("contractDate").innerHTML = this.dateOrder;
	gid("contractCompanyDirector").innerHTML = this.companyDirector;
	gid("contractClient").innerHTML = this.clientFIO;
	gid("contractConstructionDetail").innerHTML = this.constructionDetail;
	gid("contractTotalPrice").innerHTML = (this.calculateConstructionsPercentPrice() * coeff + this.calculateServicePrice());
	gid("contractTableCompany").innerHTML = this.company;
	gid("contractCompanyLegalAddress").innerHTML = this.companyLegalAddress;
	gid("contractCompanyAddress").innerHTML = this.companyAddress;
	gid("contractCompanyINN").innerHTML = this.companyINN;
	gid("contractCompanyKPP").innerHTML = this.companyKPP;
	gid("contractCompanyOGRN").innerHTML = this.companyOGRN;
	gid("contractCompanyRS").innerHTML = this.companyRS;
	gid("contractCompanyKS").innerHTML = this.companyKS;
	gid("contractCompanyTelephone").innerHTML = this.companyTelephone;
	gid("contractCompanyBIK").innerHTML = this.companyBIK;
	gid("contractTableClient").innerHTML = this.client;
	gid("contractClientPassport").innerHTML = this.clientPassport;
	gid("contractClientPassportInfo").innerHTML = this.clientPassportInfo;
	gid("contractClientAddress").innerHTML = this.clientAddress;
};

Order.prototype.calculateConstructionsPrice = function() {
	var self = this;
	var total = 0;
	for(var i = 0; i < self.constructions.length; i++)
		total += parseInt(self.constructions[i].priceTable.total) * self.constructions[i].count;
	return total; 
};

Order.prototype.calculateServicePrice = function() {
	var self = this;
	var result = 0;
	for(var i = 0; i < self.additionalService.length; i++)
		result += parseInt(self.additionalService[i].price);
	return result;
};

Order.prototype.calculateConstructionsPercentPrice = function() {
	var self = this;
	var total = this.calculateConstructionsPrice();
	var percentTotal = total;
	percentTotal = percentTotal - percentTotal / 100 * self.firstDiscount;
	percentTotal = percentTotal - percentTotal / 100 * self.secondDiscount;
	percentTotal = percentTotal - percentTotal / 100 * self.thirdDiscount;
	return percentTotal;
};

Order.prototype.calculateConstructionsString = function() {
	var self = this;
	var coeff = define.COEFF;
	var total = this.calculateConstructionsPrice();
	var percentTotal = this.calculateConstructionsPercentPrice();
	return total * coeff + " - " + self.firstDiscount + "%" + " - " + this.secondDiscount + "%" + " - " + this.thirdDiscount + "%" + " = " + percentTotal * coeff + " р.";
};

Order.prototype.generateMainBlock = function() {

};

Order.prototype.process = function() {
	//insert values
	this.fillFields();
	document.getElementById("printOrderMainBlock").innerHTML = "";
	document.getElementById("printOrderMainBlock").appendChild(this.generateMainBlock());
};