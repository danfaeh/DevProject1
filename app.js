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

var enemyCounter = 0;

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

//tower constructor
function Tower(damage, cost, x, y) {
	this.damage = damage || 20;
	this.cost = cost || 200;
	this.x = x;
	this.y = y;
}

Tower.prototype = {
	//this will determine if there is an enemy in range
	shoot: function shoot() {
		//console.log(this.parent());
		var rangeArr = $(this).parent();
		console.log(rangeArr);
		console.log(Math.abs(this.x - $("#enemy0").position().left));
		if ((Math.abs(this.x - $("#enemy0").position().left) < 10) && 
				(this.y - $("#enemy0").position().top) < 10) {


			enemy.health -= this.damage;
			var theTower = this;
			window.setTimeout(function () {
				towerShootsShit(theTower);
			}, 2500);
		}
		
	}


};

/*FUNCTION CALLS: n/a
the makeField function will initialize the values of the div's in the field.  This will be called
on load and will set a flag for what areas are buildable and what areas are a track (not buildable) */
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

	//**NOTE: this will NOT work if enemySpawner isn't called through an anonymous function**
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
	//this is a crude way of asking the user if they want to build a tower
	var ans = confirm("Build here?");
	//if the user confirms the above, the space isn't filled, and the player
	//has sufficient money to pay for the tower
	if (ans === true && this.fillFlag && playerOne.money >= 200) {



		//we're using jquery to add a div that we will use as our DOM tower element
		var $tower = $("<div></div>")
			//giving the DOM element the class "tower"
			.addClass("tower")
			//here's the positioning of the tower within the grid div
			.css({
				'top': 20 + 'px',
				'left': 30 + 'px'
			});
		//this will append the div we made above onto the grid div that the user selected
		$(this).append($tower);

		//we make a new tower with 20 dmg and 200 cost
		var tower = new Tower(20, 200, $tower.position().left + $tower.parent().position().left, 
							  $tower.parent().position().top);
		//console.log($tower.position());
		//console.log(tower);


		//removes the cost of the tower from the user
		playerOne.money -= tower.cost;
		//marks the grid div as occupied
		this.fillFlag = false;
		//alerts the user if the spot they tried to build on is a track or occupied
		//console.log(tower);
		towerShootsShit(tower);
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
	var enemyQuantity = numOfEnemies || 1;

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
	enemy = new Enemy();
	//makes a new div can saves it in a variable, $enemy
	var $enemy = $("<div></div>")
		//gives $enemy the class "enemy"
		.addClass("enemy")
		.attr('id', "enemy" + enemyCounter)
		//changes enemy's location on the grid through css here, more css styling
		//is in the css file
		.css({
			//distance from top, the y coordinate
			'top': $("#box05").position().top + 20,
			//distance from left, the x coordinate
			'left': $("#box05").position().left - 540

		//adds the enemy to the grid contrainer, $stage.  Makes it appear on the map	
		}).appendTo($stage);
		enemyCounter++;
		console.log($enemy);

		//this will move the enemy through the track
		animateEnemy($enemy);

}

//FUNCTION CALLS: n/a
//this will control the movement of the enemies through the track.  THIS IS HARD CODED FOR ONE TRACK.
//It currently has an entrance spot and exit spot, when it ends it should not be visible.
function animateEnemy(enemy){ 
	//this for loop will go through the array of track boxes and will append the enemy to them
	//we get the box position then animate the movement of the player
	for (var i = 0; i < trackArr.length; i++) {

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
		//moves the enemy from one box to the next.  This is for accessibility later (firing)
		trackArr[i].append(enemy);

	}


	console.log($("#enemy0").position().left);
	console.log($("#enemy0").position().top);
	if ($(".enemy").position().left == 28.4375 && $(".enemy").position().top == 20) {
		console.log("here");
		//when top and left = specific coordinates,
		//$(".enemy").remove();
	}

}

//makes the tower shoot shit
function towerShootsShit (tower) {
	tower.shoot();
	if (enemy.health === 0) {
		$("#enemy0").remove();
	}
}

function checkSurroundings () {



}



















