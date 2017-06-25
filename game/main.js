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
var isDisaster = "None";

function startGame() {
	money = 10000;
	year = 1;
	fields = [];
	prices = new Map();

	isSick = false;
	isDisaster = "None";

	addNews();
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
		var value = 100 + Math.round(Math.random() * 10000) / 100.0;
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
		isDisaster = false;
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

	addNews();

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
  	growCorp(fieldSelect, cropselect);
  	$('#selectCropModal').modal('toggle');
  }
  else if(elem.hasAttribute( 'endYear' )) {
  	updateNewTurn();
  }
  else if(elem.hasAttribute( 'readNews' )) {
  	$('#newsModal').modal('toggle');
  }
});

$( document ).ready(function() {
	startGame();
	$("#cropNameTable").DataTable();
});