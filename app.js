$(function() {
	makeField();
	addOnClicks();
});

function makeField () {

}

//this is the basis of funcitonality on the grid, upon clicking any item in the grid this will
//activate.  It will 
function addOnClicks () {
	//we're making the ariable boxNodeList from the querySelectorAll.  This returns a node list
	//and from the .box class
	var boxNodeList = document.querySelectorAll(".box");
	//we're looping through the nodelist and attributing an onclick event to all of them
	for (var i = 0; i < boxNodeList.length; i++) {
		
		//NOTE TO SELF: this is properly attributing an onclick event to every box
		//upon clicking any box in the grid, the "onBoxClick" event is called
		$(boxNodeList[i]).click(onBoxClick);

	}
}

function onBoxClick () {

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

function fillCheck () {

}
/* create the enemy prototype and the tower prototype */