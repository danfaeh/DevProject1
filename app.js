//FUNCTION CALLS: makeField(); addOnClicks();
//on load function
$(function() {
	//makeField will set values for the flag telling if the div is buildable
	makeField();
	//addOnClicks will initialize what happenes when you click on a grid box
	addOnClicks();
	//PlayerOne will build our player and  initialize the values for them
	playerOne = new Player();
});


//this is the creater function for a new player
function Player (money) {
	//you can either pass in a value for player, mostly for testing, or the player will start with
	//a default quantity of money
	this.money = money || 1000;
}

//FUNCTION CALLS: n/a
//the makeField function will initialize the values of the div's in the field.  This will be called
//on load and will set a flag for what areas are buildable and what areas are a track (not buildable)
function makeField () {

	//this will give us an array of the elements with the track class
	var track = $(".track").get();
	//this will give us an array of the elements with the boxes class
	var boxes = $(".box").get();

	//we're iterating through all the boxes and setting their fillFlag to true, meaning they are all
	//available to be built in.  This flag will be changed later on the track so they are not available
	//to be built on
	for (var x = 0; x < boxes.length; x++) {
		boxes[x].fillFlag = true;
	}
	//we're iterating through all of the track classes and setting their fillFlag to false, this means
	//we cannot build in them
	for (var n = 0; n < track.length; n++) {
		track[n].fillFlag = false;
	}

}

//FUNCTION CALLS: onBoxClick
//this is the basis of funcitonality on the grid, upon clicking any item in the grid this will
//activate.  It will 
function addOnClicks () {
	//we're making the ariable boxes from the querySelectorAll.  This returns a node list
	//and from the .box class
	var boxes = $(".box").get();
	//we're looping through the array and attributing an onclick event to all of them
	for (var i = 0; i < boxes.length; i++) {
		//upon clicking any box in the grid, the "onBoxClick" event is called
		$(boxes[i]).click(onBoxClick);
	}
}


function onBoxClick (e) {

}

function initValues () {

}

function enemyMovement () {

}

function towerAction () {

}

function gameFlow () {

}

//make this a yes or no choice for simplicity at first
function buildChoice () {

}

//use this to check if something can be built here ---> if buildable return true
function fillCheck () {

}
/* create the enemy prototype and the tower prototype */