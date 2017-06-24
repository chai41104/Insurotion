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
	}

	addData();
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

function updateNewTurn() {
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
  	console.log("trigger");
  	$('#endYearModal').modal('toggle');
  }
});

$( document ).ready(function() {
	startGame();
	$("#cropNameTable").DataTable();
});