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
		
		//initializes all boxes with fillFlag, which will be used to see if its available to
		//place a tower on.  True == available, false == not available.  The track will be filled
		//in onBoxClick array
//		boxNodeList[i].fillFlag = true;

		//upon clicking any box in the grid, the "onBoxClick" event is called
		$(boxNodeList[i]).click(onBoxClick(e));

	}
}


//THIS IS NOT WORKING, YOU NEED TO MAKE AN OBJECT AND LINK THAT OBJECT TO EACH
//ONE OF THE DIVS 

function onBoxClick (e) {
	//this will give us a nodelist of the 
	var trackNL = document.querySelectorAll(".track");
	var boxNodeList = document.querySelectorAll(".box");

	//we're looping through the nodelist and attributing an onclick event to all of them
	for (var i = 0; i < boxNodeList.length; i++) {
		
		//initializes all boxes with fillFlag, which will be used to see if its available to
		//place a tower on.  True == available, false == not available.  The track will be filled
		//in onBoxClick array
		boxNodeList[i].fillFlag = true;
	}
		console.log(boxNodeList);


	//loops through the boxes that will be the track and marks that they are occupied so no
	//towers can build on there
	for (var x = 0; x < trackNL.length; x++) {

		trackNL[x].fillFlag = false;

	}
	console.log(trackNL);

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