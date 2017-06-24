var money = 10000;
var year = 1;
var numberOfField = 16;
var fields = [];
var cropNames = ["Rice", "Corn", "Potato", "Wheat", "Vegetables", "Coffee", "Bean"];
var cost = [];

var cropSelect;
var fieldSelect;
var prices = {};

function startGame() {
	money = 10000;
	year = 1;
	fields = [];
	prices = {};

	resetField();
	updatePage();

	for(var i = 0; i < cropNames.length; ++i) {
		cost[i] = 100;
		prices.set(cropNames[i], []);
	}

	addData();
}

function getPrice(cropName, year) {
	return prices.get(cropNames[i])[year-1];
}

function generatePrice() {
	for(var i = 0; i < cropNames.length; ++i) {
		var value = 100 + (Math.random() * 100);
		prices.get(cropNames[i]).append(value);
	}
}

function addData() {
	var tableEle = $("#tableCrop");
	tableEle.empty();
	for(var i = 0; i < cropNames.length; ++i) {
		tableEle.append("<tr cropNameId='" +cropNames[i]+ "'><td cropNameId='" +cropNames[i]+ "'>" +cropNames[i]+ "</td><td cropNameId='" +cropNames[i]+ "'>" +cost[i]+ "</td></tr>");
	}
}

function updatePage() {
	$("#displayYear").html(year);
	$("#displayMoney").html("<sup style='font-size: 20px'>£</sup>" + money);
}

function growCorp(i, cropName) {
	fields[i] = cropName;
	money -= cost[cropNames.indexOf(cropName)];
	var ele = $("#fieldCropId"+i).children()[0];
	ele.className = 'info-box bg-green';
	ele.childNodes[1].childNodes[0].innerHTML = cropName;

	updatePage();
}

function getEvent() {
	return "Normal";
}

function addEventSummary() {
	var event = getEvent();

	if(event == "Normal") {
		var ele = $("#eventButton");
		ele.html(event);
		ele.attr("class", "btn btn-info");

		ele = $("#eventText");
		ele.html("Everything is fine. They are not disaster. The crop can be sold in a good price.");
	}
	// add more

}

function updateNewTurn() {
	generatePrice();

	addEventSummary();
	addFinanceTable();

  	$('#endYearModal').modal('toggle');
	resetField();
  	updatePage();
}

function resetField() {
	var $cropFields = $("#cropFields");
	$cropFields.empty();
	for(var i = 0; i < numberOfField; ++i) {
		fields[i] = "None";
		$cropFields.append(newFieldHTML(i));
	}
}

function newFieldHTML(i) {
	text = '<div class="col-md-3 col-sm-6 col-xs-12" fieldId="'+i+'" id="fieldCropId'+i+'">';
	text += '<div class="info-box bg-yellow" fieldId="'+i+'" id="field'+i+'">';
	text += '<span class="info-box-icon" fieldId="'+i+'"><i class="fa fa-bookmark-o" fieldId="'+i+'"></i></span>';
	text += '<div class="info-box-content" fieldId="'+i+'">';
	text += '<span class="info-box-text" fieldId="'+i+'">empty</span>';
	text += '</div></div></div>';
	return text;
}

function selectCrop(i) {
	$('#selectCropModal').modal('toggle');
	fieldSelect = i;
}

function addFinanceTable() {

	var text = "";
	var profit = 0;

	var iFromCrop = incomeFromCrop();
	var iFromInsure = incomeFromInsure();

	text += addRowFinanceTable("<strong>Income</strong>", iFromCrop + iFromInsure);
	text += addRowFinanceTable(" - Sell Crops", iFromCrop);
	text += addRowFinanceTable(" - Claim From Insurance", iFromInsure);

	var sFromCrop = spendingFromCrop();
	var sFromInsurance = spendingFromInsure();

	text += addRowFinanceTable("<strong>Spending</strong>", sFromCrop + sFromInsurance);
	text += addRowFinanceTable(" - cost of crops", sFromCrop);
	text += addRowFinanceTable(" - cost of Insurance", sFromInsurance);

	var profit = iFromCrop + iFromInsure;

	text += addRowFinanceTable("<strong>Financial Summary</strong>", profit);

	$("#financeTable").html(text);

	money += profit;
	year++;
}

function incomeFromCrop() {
	if(getEvent() != "Normal") return 0;
	else {
		var income = 0;
		for(var i = 0; i < fields.length; ++i) {
			if(fields[i] != "None") {
				income += getPrice(fields[i], year);
			}
		}		
		return income;
	}
}

function incomeFromInsure() {
	return 10;
}

function spendingFromCrop() {
	return -10;
}

function spendingFromInsure() {
	return -10;
}

function addRowFinanceTable(detail, money) {
	if(money < 0) return "<tr><td>" +detail+ "</td><td>(£"+money+")</td></tr>";
	else return "<tr><td>" +detail+ "</td><td>£"+money+"</td></tr>";	
}

$( "body" ).click(function( event ) {
  var elem = event.target;
  if(elem.hasAttribute( 'fieldid' )) {
  	selectCrop(elem.getAttribute( 'fieldid' ));
  }
  else if(elem.hasAttribute( 'cropNameId' )) {
  	cropselect = elem.getAttribute( 'cropNameId' );
  	growCorp(fieldSelect, cropselect);
  	$('#selectCropModal').modal('toggle');
  }
  else if(elem.hasAttribute( 'endYear' )) {
  	updateNewTurn();
  }
});

$( document ).ready(function() {
	startGame();
	$("#cropNameTable").DataTable();
});