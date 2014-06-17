var stepGrid = 5;
var color = [127, 127, 127];

var GRID = 0;
var POINTS = 1;

var NONE = -1;
var PAINT_GRID = 0;
var POLYGON = 1;
var CUBIC_SPLINE = 2;
var AKIMA_SPLINE = 3;
var CURVE = 4;
var LIGHT_POINTS = 5;
var SET_COLOR = 6;
var SET_FLAG_ROUND = 7;
var DELETE_SET = 8;
var SET_LINE_WIDTH = 9;
var CREATE_OBJECT = 10;
var DELETE_OBJECT = 11;
var HIDE_SETS = 12;
var AREA_REC = 13;
var GET_SCALE = 14;

//var cppOperator = new CPPOperator(null);
var fsOperator = new FSOperator({fileName : "data.txt"});

function initCallBack()
{
    cppOperator.postMessage('points', [], fillListPoints);
    cppOperator.postMessage('sets', [], fillListSet);
    cppOperator.postMessage('objects', [], fillListObject);
    cppOperator.postMessage('scale', [], fillFieldScale);
    cppOperator.postMessage("spline", [], null);
    paintGrid(); 
}

function changeColor(value)
{
    color = hexToRGB(value);
    clickElem("btnSetColor");
}

function paintGrid()
{
    var gridStep = parseInt(document.getElementById('gridStep').value);
    console.log("grid = " + gridStep);
    cppOperator.postMessage(PAINT_GRID, [gridStep], function(response)    {   alert(response);    }); 
}

function getSelectedIndexesVisibleForSets()
{
    var result = getSelectedIndexes("listSet");
    var flagPoints = document.getElementById('btnHidePoints');
    var flagGrid = document.getElementById('btnHideGrid');

    if(flagGrid.checked)
        result.push(GRID);

    if(flagPoints.checked)
        result.push(POINTS);

    console.log(result);
    return result;
}

/*function getSelectedPosForSpline()
{
    var buttonGroup = document.getElementsByName('radioPos');
    for (var i = 0; i < buttonGroup.length; i++)
        if (buttonGroup[i].checked)
            return parseInt(buttonGroup[i].value);

    return -1;
}*/

function getSelectedRadio(name)
{
    var buttonGroup = document.getElementsByName(name);
    for (var i = 0; i < buttonGroup.length; i++)
        if (buttonGroup[i].checked)
            return parseInt(buttonGroup[i].value);

    return -1;
}

function hexToRGB(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}


function clickElem(name)
{
    //console.log(name);
    //alert(name);
    //return;
    switch(name)
    {
        case 'grid':                    paintGrid();
                                        break;

        case 'btnBuildPolygon':         cppOperator.postMessage(POLYGON, [getListIndexes("listPointsForSet")], null);
                                        break;

        case 'btnBuildSpline':          cppOperator.postMessage(getSelectedRadio("radioSpline"), [getListIndexes("listPointsForSet"), getSelectedRadio("radioPos")], console.log());
                                        break;

        case 'btnSetColor':             cppOperator.postMessage(SET_COLOR, [getSelectedIndexes("listObject"), color], console.log());
                                        break;

        case 'btnSetRoundForGrid':      cppOperator.postMessage(SET_FLAG_ROUND, [], console.log());
                                        break;

        case 'btnDeleteSet':            cppOperator.postMessage(DELETE_SET, [getSelectedIndexes("listSet")[0]], console.log());
                                        break;

        case 'btnCreateObject':         //console.log(getDataSelectedTypeObject());
                                        cppOperator.postMessage(CREATE_OBJECT, [getListIndexes("listSetForObject"), getDataSelectedTypeObject()], console.log());
                                        break;

        case 'btnDeleteObject':         cppOperator.postMessage(DELETE_OBJECT, [getSelectedIndexes("listObject")[0]], console.log());
                                        break;

        case 'listSet':                 cppOperator.postMessage(SET_LINE_WIDTH, [getSelectedIndexes("listSet")], console.log());
                                        break;

        case 'listSetDblClick':         //alert(getSelectedIndexes("listPoints")[0]);
                                        addElementList("listSetForObject", getSelectedIndexes("listSet")[0]);
                                        break;

        case 'listPointsDblClick':     //alert(getSelectedIndexes("listPoints")[0]);
                                        addElementList("listPointsForSet", getSelectedIndexes("listPoints")[0]);
                                        break;

        case 'listPointsChange':        //alert(getSelectedIndexes("listPoints")[0]);
                                        cppOperator.postMessage(LIGHT_POINTS, [getSelectedIndexes("listPoints")], console.log());
                                        //addElementList("listPointsForSet", getSelectedIndexes("listPoints")[0]);
                                        break;

        case 'btnHideSets':             cppOperator.postMessage(HIDE_SETS, [getSelectedIndexesVisibleForSets()], console.log());
                                        break;

        case "btnClearPoints":          clearListBox(listPointsForSet);
                                        break;

        case "btnClearSetForObject":    clearListBox(listSetForObject);
                                        break;

        case "btnAreaRec":              cppOperator.postMessage(AREA_REC, [getSelectedIndexes("listObject")[0]], console.log());
                                        break;
    }

    nameElem = name;
}

function clearListBox(list)
{
  for (var i = list.options.length-1; i >= 0; i--)
  {
    list.options[i] = null;
  }
  list.selectedIndex = -1;
}

function fillListPoints(response)
{
    response = JSON.parse(response);
    console.log(response);
    var arrPoints = response["data"]['vertices'];
    var select = document.getElementById('listPoints');

    clearListBox(select);
    for (var i = 0; i < arrPoints.length; i++)
    {
        var opt = "Point " + i;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        el.x = arrPoints[i].x;
        el.y = arrPoints[i].y;
        select.appendChild(el);
    }
}

function fillListSet(response)
{
    response = JSON.parse(response);
    var arrSet = response["data"];
    var select = document.getElementById('listSet');

    //console.log(arrSet); return;

    clearListBox(select);
    for (var i = 0; i < arrSet.length; i++)
    {
        var opt = "Set " + arrSet[i]["index"];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = arrSet[i]["index"];
        select.appendChild(el);
    }
    console.log(response);
    fsOperator.setData(response);
}

function fillListObject(response)
{
    response = JSON.parse(response);
    //console.log(response);
    var arrSet = response["data"];
    var select = document.getElementById('listObject');

    //console.log(arrSet); return;

    clearListBox(select);
    for (var i = 0; i < arrSet.length; i++)
    {
        var opt = "Object " + arrSet[i]["index"];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = arrSet[i]["index"];
        select.appendChild(el);
        fillTableInfoObjects(arrSet[i]);
    }
}

function getSelectedIndexes(name)
{
    var result = [];
    var select = document.getElementById(name);
    
    for(var i = 0; i < select.options.length; i++)
    {        
        if (select.options[i].selected)
            result.push(parseInt(select.options[i].value));        
    }
    return result;
}

function getListIndexes(name)
{
    var result = [];
    var select = document.getElementById(name);
    
    for(var i = 0; i < select.options.length; i++)
    {
            result.push(parseInt(select.options[i].value));        
    }

    return result;
}

function addElementList(name, value)
{
    var select = document.getElementById(name);
    //console.log(arrSet); return;

    //clearListBox(select);
    var opt = "P. Set " + value;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = value;
    select.appendChild(el);
}

function fillTableInfoObjects(data)
{
    console.log(data);
    var table = document.getElementById("tableObjectInfo");
    var tr = document.createElement('tr');
    var td = [];

    for (var i = 0; i < 6; i++)
        td[i] = document.createElement('td');


    td[0].appendChild(document.createTextNode("Object " + data['index']));
    td[1].appendChild(document.createTextNode("color"));
    td[2].appendChild(document.createTextNode(data['width']));
    td[3].appendChild(document.createTextNode(data['height']));
    td[4].appendChild(document.createTextNode(data['price']));
    td[5].appendChild(document.createTextNode(data['totalPrice']));

    for (var i = 0; i < 6; i++)
        tr.appendChild(td[i]);

    table.appendChild(tr);
}

function fillFieldScale(response)
{
    response = JSON.parse(response);
    console.log(response);
    var field = document.getElementById("scaleField");
    field.innerHTML = "x" + response["data"];
}

function getDataSelectedTypeObject()
{
    var com = document.getElementById("comboTypeObject");

    var type = com.options[com.selectedIndex].getAttribute("IDType");
    var price = com.options[com.selectedIndex].getAttribute("price");
    //return type;
    //var res = new Array();
    //res['type'] = type;
   // res['price'] = price;
    //alert(res);
    //return {"type" : type, "price" : price};
    return [parseInt(type), parseInt(price)];
}