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

	for(var i = 0; i < cropNames.length; ++i) {
		cost[i] = 100;
	}
}

function growCorp(i, cropName) {
	fields[i] = cropName;
	money -= cost[cropNames.indexOf(cropName)];
}

function updateNewTurn() {
	resetField();
}

function resetField() {
	for(var i = 0; i < numberOfField; ++i) {
		fields[i] = "None";
	}
}