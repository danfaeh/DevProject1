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
function Enemy (health) {
	this.health = health || 100;
}

function Tower(damage, cost, range) {
	this.damage = damage || 20;
	this.cost = cost || 20;
	this.range = range || 1;
}

Tower.prototype = {
	//this will determine if there is an enemy in range
	inRange: function inRange() {

	}

};

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

//FUNCTION CALLS: onBoxClick, enemySpawner
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

	//this builds the start button, when it is clicked by players the game will spawn
	//enemies that will move through the track.  This calls the "enemySpawner" function
	$("#startBtn").on('click', function () {
		enemySpawner();
	});


}

//FUNCTION CALLS: Tower constructor
//this will control what happens when you click the box, you'll likely be prompted to 
//place a tower or not.  This will call fillCheck to determine if it is kosher to build 
//here (not a track or already occupied)
function onBoxClick (e) {
	console.log(this.fillFlag);
	//this is a crude way of asking the user if they want to build a tower
	var ans = confirm("Build here?");
	//if the user confirms the above, the space isn't filled, and the player
	//has sufficient money to pay for the tower
	if (ans === true && this.fillFlag && playerOne.money >= 200) {
		//we make a new tower with 20 dmg and 200 cost
		var tower = new Tower(20, 200);
		//we're using jquery to add a div that we will use as our DOM tower element
		var $tower = $("<div></div>")
			//giving the DOM element the class "tower"
			.addClass("tower")
			//here's the positioning of the tower within the grid div
			.css({
				'top': 38 + '%',
				'left': 40 + '%'
			});
		//this will append the div we made above onto the grid div that the user selected
		$(this).append($tower);
		//removes the cost of the tower from the user
		playerOne.money -= tower.cost;
		//marks the grid div as occupied
		this.fillFlag = false;
		//alerts the user if the spot they tried to build on is a track or occupied
	} else if (ans === true && !(this.fillFlag)) {
		alert("You can't build on the track or on a filled spot!");
		//alerts the user that they dont have the cash money to buy a tower, yo.
	} else if (ans === true && playerOne.money < 200) {
		alert("You don't have the cash money for that, yo");
	}
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
	var $stage = $('#box05');
	//constructor for a new Enemy
	var enemy = new Enemy();
	//makes a new div can saves it in a variable, $enemy
	var $enemy = $("<div></div>")
		//gives $enemy the class "enemy"
		.addClass("enemy")
		//changes enemy's location on the grid through css here, more css styling
		//is in the css file
		.css({
			//distance from top, the y coordinate
			'top': $("#box05").position().top + 20,
			//distance from left, the x coordinate
			'left': $("#box05").position().left - 540

		//adds the enemy to the grid contrainer, $stage.  Makes it appear on the map	
		}).appendTo($stage);

		//this will move the enemy through the track
		animateEnemy($enemy);
}


//this will control the movement of the enemies through the track.  THIS IS HARD CODED FOR ONE TRACK.
//It currently has an entrance spot and exit spot, when it ends it should not be visible.
function animateEnemy(enemy){ 
	//this for loop will go through the array of track boxes and will append the enemy to them
	//we get the box position then animate the movement of the player
	for (var i = 0; i < trackArr.length; i++) {
		//as long as the enemy isn't in the last block, keep functioning
		if (enemy.parent != $("#box79")) {
			//boxPlace will be the position of the box we're moving into
			var boxPlace = trackArr[i].position();
			//this is going to be the left and right positions of our enemy
			var enemyLeft = boxPlace.left;
			var enemyTop = boxPlace.top;
			//here we animate the enemy to visually move from the current location to the next
			//box over one second
			enemy.animate({
				//this moves to the center of the next box
				'left': enemyLeft - 540,
				'top' : enemyTop + 20
			}, 1000);
			//this actually moves the enemy from one box to the next.  This is for accessibility later.
			trackArr[i].append(enemy);

		}
	}

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