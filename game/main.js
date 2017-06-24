var money = 10000;
var year = 1;
var numberOfField = 16;
var fields = [];
var cropNames = ["Rice", "Corn", "Potato", "Wheat", "Vegetables", "Coffee", "Bean"];
var cost = [];

function startGame() {
	money = 10000;
	year = 1;
	fields = [];

	resetField();
	updatePage();

	for(var i = 0; i < cropNames.length; ++i) {
		cost[i] = 100;
	}
}

function updatePage() {
	$("#displayYear").html(year);
	$("#displayMoney").html("<sup style='font-size: 20px'>£</sup>" + money);
}

function growCorp(i, cropName) {
	fields[i] = cropName;
	money -= cost[cropNames.indexOf(cropName)];
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
	text = '<div class="col-md-3 col-sm-6 col-xs-12" fieldId="'+i+'">';
	text += '<div class="info-box bg-yellow" fieldId="'+i+'" id="field'+i+'">';
	text += '<span class="info-box-icon" fieldId="'+i+'"><i class="fa fa-bookmark-o" fieldId="'+i+'"></i></span>';
	text += '<div class="info-box-content" fieldId="'+i+'">';
	text += '<span class="info-box-text" fieldId="'+i+'">Bookmarks</span>';
	text += '</div></div></div>';
	return text;
}

function selectCrop(i) {
	
}

$( "body" ).click(function( event ) {
  var elem = event.target;
  if(elem.hasAttribute( 'fieldid' )) {
  	selectCrop(elem.getAttribute( 'fieldid' ));
  }
});

$( document ).ready(function() {
	startGame();
});