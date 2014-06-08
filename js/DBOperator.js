var ajaxReq = null;

function DBOperator() //class for database manipulations. Get the UIOperator object to modify visual representation
{
	this.ajaxReq = new AjaxRequest();
	ajaxReq = this.ajaxReq.request;

	this.actionType = "POST";
	this.filialPath = "http://filial.barstrade.ru/phpLib/AjaxRequest.php";
	this.moneyPath = "http://money.barstrade.ru/externalAPI.php";
	this.cacheBoxPath = "http://cachebox.barstrade.ru/externalAPI.php";
	this.dataType = "application/x-www-form-urlencoded; charset=UTF-8";
}

DBOperator.prototype.sendFilialRequest = function(action, request, array) //send 'array' of data with seted 'action' and run 'request'
{
	var postString = "action=" + action;
	if(array != 'null') for(var key in array)
	{
		var propString = "&" + key + "=" + array[key];
		postString += propString;
	}
	console.log(postString);
	var reqFunction = function()
	{
		if(ajaxReq.readyState == 4 && ajaxReq.status == 200)
		{
			var responseText = ajaxReq.responseText;
			console.log(responseText);
			request(responseText);
		}
	}
	this.ajaxReq.send(this.actionType, this.filialPath, reqFunction, this.dataType, postString, true);
};

DBOperator.prototype.sendSynchFilialRequest = function(action, request, array) //send 'array' of data with seted 'action' and run 'request'
{
	var postString = "action=" + action;
	if(array != 'null') for(var key in array)
	{
		var propString = "&" + key + "=" + array[key];
		postString += propString;
	}
	console.log(postString);
	var reqFunction = function()
	{
		if(ajaxReq.readyState == 4 && ajaxReq.status == 200)
		{
			var responseText = ajaxReq.responseText;
			console.log(responseText);
			request(responseText);
		}
	}
	this.ajaxReq.send(this.actionType, this.filialPath, reqFunction, this.dataType, postString, false);
};