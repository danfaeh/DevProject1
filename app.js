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

//This is a global variable, bite me
var trackArr = [$("#box05"),$("#box15"),$("#box25"),$("#box24"),$("#box23"),
$("#box22"),$("#box32"),$("#box42"),$("#box52"),$("#box62"),$("#box63"),$("#box64"),$("#box65"),
$("#box55"),$("#box56"),$("#box57"),$("#box67"),$("#box77"),$("#box78"),$("#box79"),$("#box69"),
$("#box59"),$("#box49"),$("#box39"),$("#box38"),$("#box37"),$("#box27"),$("#box17"),$("#box07")];


//this is the creater function for a new player
function Player (money) {
	//you can either pass in a value for player, mostly for testing, or the player will start with
	//a default quantity of money
	this.money = money || 1000;
}

//this is the creater function for a new enemy
function Enemy (x, y, health) {
	this.health = health || 100;

	this.x = x;
	this.y = y;
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

//this will control what happens when you click the box, you'll likely be prompted to 
//place a tower or not.  This will call fillCheck to determine if it is kosher to build 
//here (not a track or already occupied)
function onBoxClick (e) {

}

//FUNCTION CALLS: calledByEnemySpawner
//this function is called when you spawn an enemy, this will take an argument that 
//determines the amount of enemies
function enemySpawner (numOfEnemies) {
	//this is the number of enemies we're going to send in, it has a default value
	var enemyQuantity = numOfEnemies || 2;

	//a loop that will call the "calledByEnemySpawner" function over an interval of 2000*i, it 
	//loops as many times as the enemy quantity
	for (var i = 0; i < enemyQuantity; i++) {
		window.setTimeout(calledByEnemySpawner, 2000*i);
	}
}

//FUNCTION CALLS: animateEnemy
//this is the function that will control the enemy spawning behavior, 
//it will take one argument, numOfEnemies, that determines how many enemies
//there are.  This has a default of 15.  The enemies are a div on the #gridContainer
//and the x/y is styled in this function.
function calledByEnemySpawner () {
	//grabs the container of all of the divs (the map)
	var $stage = $('#box05'), 
		//sets a variable for the x coordinate, the % from left
	     enemyX=47, 
	     //sets a variable for the y coordinate, the % from top
	     enemyY = 0;

	//makes a new div can saves it in a variable, $enemy
	var enemy = new Enemy();
	enemy.x = enemyX;
	enemy.y = enemyY; 
	var $enemy = $("<div></div>")
		//gives $enemy the class "enemy"
		.addClass("enemy")
		//changes enemy's location on the grid through css here, more css styling
		//is in the css file
		.css({
			//distance from top, the y coordinate
			'top': enemyY + '%',
			//distance from left, the x coordinate
			'left': enemyX + '%'

		//adds the enemy to the grid contrainer, $stage.  Makes it appear on the map	
		}).appendTo($stage);

		//this will move the enemy through the track
		animateEnemy($enemy);
}


//this will control the movement of the enemies through the track.  THIS IS HARD CODED FOR ONE TRACK.
//It currently has an entrance spot and exit spot, when it ends it should not be visible.
function animateEnemy(enemy){ 
//ENEMY IS AN OBJECT
	console.log(enemy);

	for (var i = 0; i < trackArr.length; i++) {
		if (enemy.parent != $("#box79")) {
			var boxPlace = trackArr[i].position();
			var enemyLeft = boxPlace.left;
			var enemyTop = boxPlace.top;
			enemy.animate({
				'left': enemyLeft - 540,
				'top' : enemyTop + 20
			}, 1000);
			console.log(enemyTop);

			trackArr[i].append(enemy);

		}
	}

	//animate to change the location over time, THEN append to a new place


/*
	//moves the enemy div over time to the exit
	enemy.animate({
		'top': '30%'
	}, 3000);
	//set x and y
	//have tower object scout for x and y, shoot if coordinates in range

	enemy.animate({
		'left': '20%'
	}, 4000);

	enemy.animate({
		'top': '80%'
	}, 5000);

	enemy.animate({
		'left': '47%'
	}, 4000);

	enemy.animate({
		'top': '68%'
	}, 2000);

	enemy.animate({
		'left': '65%'
	}, 3000);

	enemy.animate({
		'top': '93%'
	}, 3000);

	enemy.animate({
		'left': '83%'
	}, 3000);

	enemy.animate({
		'top': '43%'
	}, 5000);

	enemy.animate({
		'left': '65%'
	}, 3000);

	enemy.animate({
		'top': '0%'
	}, 4000);

*/

	console.log(enemy);
}


function towerAction () {

}

//make this a yes or no choice for simplicity at first
function buildChoice () {

}

//use this to check if something can be built here ---> if buildable return true
function fillCheck () {

}
/* create the enemy prototype and the tower prototype */