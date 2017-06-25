var money = 10000;
var year = 1;
var numberOfField = 16;
var fields = [];
var cropNames = ["Rice", "Corn", "Potato", "Wheat", "Vegetables", "Coffee", "Bean"];
var cost = [];

var cropSelect;
var fieldSelect;
var prices = new Map();

var isSick = false;
var isDisaster = "Normal";

var sumCostCrop = 0;

function setNewTurn() {
	addInsuranceTable();
	resetField();

	sumCostCrop = 0;
}

function startGame() {
	money = 10000;
	year = 1;
	fields = [];
	prices = new Map();

	isSick = false;
	isDisaster = "Normal";

	addNews();
	setNewTurn();
	updatePage();
	
	for(var i = 0; i < cropNames.length; ++i) {
		cost[i] = 100;
		prices.set(cropNames[i], []);
	}

	addData();
}

function updateNewTurn() {
	generatePrice();
	addNews();
	
	addEventSummary();
	addFinanceTable();
	
	setNewTurn();
	
  	$('#endYearModal').modal('toggle');

  	updatePage();
}

function getPrice(cropName, year) {
	return prices.get(cropName)[year-1];
}

function generatePrice() {
	for(var i = 0; i < cropNames.length; ++i) {
		var value = 200 + Math.round(Math.random() * 100);
		prices.get(cropNames[i]).push(value);
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

function getYourStatus() {
	if(getRandomInt(0, 3) == 0 && year != 1) {
		isSick = true;
		return writeNews("danger", "ban", "You are sick.", "You are not feeling well to work. So, you have to stay in hospital for this year.");
	}
	else {
		isSick = false;
		return writeNews("info", "info", "You are strong and ready to work.", "You are strong. So, you really want to work now.");
	}
}

function getCondition() {
	if(getRandomInt(0, 1) == 0 && year != 1) {
		if (getRandomInt(0, 1) == 0) {
			isDisaster = "Drought";
			return writeNews("danger", "ban", "Drought last year.", "All crops are dead and nothing can be sold. If you buy insurance for Drought. They will pay the money for you.");
		}
		else if (getRandomInt(0, 1) == 0) {
			isDisaster = "Storm";
			return writeNews("danger", "ban", "Big Storm last year.", "All crops are damaged and nothing can be sold. If you buy insurance for Storm. They will pay the money for you.");
		}
	}
	else {
		isDisaster = "Normal";
		return writeNews("info", "info", "No disaster last year.", "Last year is a lovely day to grow your crop. Why not start to grow your crop.");
	}
}

function getPrediction() {
	if(getRandomInt(0, 1) == 0 && year != 1) {
		if (getRandomInt(0, 1) == 0) {
			return writeNews("warning", "warning", "Drought may happen this year.", "Drought may happen this year. You should buy insurance.");
		}
		else if (getRandomInt(0, 1) == 0) {
			return writeNews("warning", "warning", "Big Storm may happen this year.", "Big Storm may happen this year. You should buy insurance.");
		}
	}
	else {
		return writeNews("info", "info", "No disaster may happen this year.", "No disaster is expected but there is no garuntee at all. You should buy insurance.");
	}
}

function getCropPrediction(cropName) {
	if(getRandomInt(0, 1) == 0) {
		if (getRandomInt(0, 1) == 0) {
			return writeNews("warning", "warning", "Price of " +cropName+ " will be low this year." , "It is a prediction that the price of " +cropName+ " will be low. It is not recommend to grow.");
		}
		else if (getRandomInt(0, 1) == 0) {
			return writeNews("success", "check", "Price of " +cropName+ " will be high this year." , "It is a prediction that the price of " +cropName+ " will be high. It is recommend to grow.");
		}
	}
	else {
		return writeNews("info", "info", "Price of " +cropName+ " will be stable this year." , "It is a prediction that the price of " +cropName+ " will be stable. It is not high or low.");
	}
}

function addNews() {
	var $displayNews = $("#displayNews");

	$displayNews.empty();

	$displayNews.append(getYourStatus());
	$displayNews.append(getCondition());

	$displayNews.append(getPrediction());

	for(var i = 0; i < cropNames.length; ++i) {
		$displayNews.append(getCropPrediction(cropNames[i]));
	}
}

function writeNews(type, sign, header, text) {
	return '<div class="alert alert-'+ type +' alert-dismissible">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            '<h4><i class="icon fa fa-' +sign+ '"></i>'+ header+ '</h4>' + text + '</div>';
}

function growCrop(i, cropName) {
	fields[i] = cropName;
	money -= cost[cropNames.indexOf(cropName)];
	sumCostCrop += cost[cropNames.indexOf(cropName)];
	var ele = $("#fieldCropId"+i).children()[0];
	ele.className = 'info-box bg-green';
	
	ele.childNodes[1].childNodes[0].innerHTML = cropName;
	ele.childNodes[0].childNodes[0].className="fa fa-leaf";

	updatePage();
}

function getEvent() {
	return isDisaster;
}

function addEventSummary() {
	var event = getEvent();

	if(event == "Normal") {
		var ele = $("#eventButton");
		ele.html(event);
		ele.attr("class", "btn btn-info");

		ele = $("#eventText");
		ele.html("Everything was fine. There was not disaster. The crop can be sold in a good price.");
	}
	else {
		var ele = $("#eventButton");
		ele.html(event);
		ele.attr("class", "btn btn-danger");

		ele = $("#eventText");
		ele.html("There was a " +event+ " disaster last year. No crop can be sold. If you buy insurance, you will get some money back.");
	}

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

	var costOfliving = -200;

	var text = "";
	var profit = 0;

	var iFromCrop = incomeFromCrop();
	var iFromInsure = incomeFromInsure();

	text += addRowFinanceTable("<strong>Income</strong>", iFromCrop + iFromInsure);
	text += addRowFinanceTable(" - Sell Crops", iFromCrop);
	text += addRowFinanceTable(" - Claim From Insurance", iFromInsure);

	var sFromCrop = -spendingFromCrop();
	var sFromInsurance = spendingFromInsure();

	text += addRowFinanceTable("<strong>Spending</strong>", sFromCrop + sFromInsurance + costOfliving);
	text += addRowFinanceTable(" - cost of crops", sFromCrop);
	text += addRowFinanceTable(" - cost of Insurance", sFromInsurance);
	text += addRowFinanceTable(" - Living cost", costOfliving);

	var profit = iFromCrop + iFromInsure + sFromInsurance + costOfliving + sFromCrop;

	text += addRowFinanceTable("<strong>Financial Summary</strong>", profit);

	$("#financeTable").html(text);

	money += profit - sFromCrop;
	year++;
}

function addInsuranceRow(text, cost, id) {
	return '<tr><td>' +text+ '</td><td>' +cost+ '</td><td><input type="checkbox" value="" id="CBinsurance'+id+'"></td></tr>';
}

function addInsuranceTable() {
	var $tableInsurance = $("#tableInsurance");

	$tableInsurance.empty();

	$tableInsurance.append(addInsuranceRow("Health Insurance", 100, "Health"));
	$tableInsurance.append(addInsuranceRow("Drought Insurance", 100, "Drought"));
	$tableInsurance.append(addInsuranceRow("Strom Insurance", 100, "Strom"));

	$("#botSuggestText").empty();
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
	var money = 0;
	if(isDisaster != "Normal") {
		if(isDisaster == "Drought" && $('#CBinsuranceDrought')[0].checked) money += 500;
		else if(isDisaster == "Strom" && $('#CBinsuranceStrom')[0].checked) money += 500;
	}
	if(isSick == true && $('#CBinsuranceHealth')[0].checked ) money += 500;

	return money;
}

function spendingFromCrop() {
	return sumCostCrop;
}

function spendingFromInsure() {
	var cost = 0;
	
	if($('#CBinsuranceHealth')[0].checked == true) cost -= 100;
	if($('#CBinsuranceDrought')[0].checked == true) cost -= 100;
	if($('#CBinsuranceStrom')[0].checked == true) cost -= 100;
	
	return cost;
}

function addRowFinanceTable(detail, money) {
	if(money < 0) return "<tr><td>" +detail+ "</td><td>(£"+money+")</td></tr>";
	else return "<tr><td>" +detail+ "</td><td>£"+money+"</td></tr>";	
}

function triggerSuggest() {
	$('#CBinsuranceHealth').prop('checked', true);
	$('#CBinsuranceDrought').prop('checked', true);
	$('#CBinsuranceStrom').prop('checked', true);

	$("#botSuggestText").empty();
	$("#botSuggestText").append(writeNews("info", "info", "Suggest to buy all insurances!", "Our Machien Learning predicts to buy all insurance."));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$( "body" ).click(function( event ) {
  var elem = event.target;
  if(elem.hasAttribute( 'fieldid' )) {
  	selectCrop(elem.getAttribute( 'fieldid' ));
  }
  else if(elem.hasAttribute( 'cropNameId' )) {
  	cropselect = elem.getAttribute( 'cropNameId' );
  	growCrop(fieldSelect, cropselect);
  	if(isSick) alert("You are sick. So, you can't work this year.");
  	else $('#selectCropModal').modal('toggle');
  }
  else if(elem.hasAttribute( 'endYear' )) {
  	updateNewTurn();
  }
  else if(elem.hasAttribute( 'readNews' )) {
  	$('#newsModal').modal('toggle');
  }
  else if(elem.hasAttribute( 'insuranceBuy' )) {
  	$('#selectInsuranceModal').modal('toggle');
  }
});

$( document ).ready(function() {
	startGame();
	$("#cropNameTable").DataTable();
	$("#InsuranceTable").DataTable();
});