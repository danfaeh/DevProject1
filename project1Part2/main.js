$(function() {
	makeField();
	addOnClicks();
	sendRandom();
});

//how many clicks you've gotten
var scoreCount = 0;

//this global variable is a bank of images we're
//randomly picking from
var images = [];

function Pokemon (name, image) {
	this.name = name;
	this.image = image;
}

new Pokemon("Pikachu", );

//this builds the play field
function makeField() {

}

//gives functionality
function addOnClicks() {
	$(".item").click(function() {
		$this.remove();
	});
}

//this will create a random thing across the board to click
function sendRandom () {
	for (var i = 0; i < 50; i++) {
		window.setTimeout(makeRandom, 500 * i);
	}
}

function makeRandom () {
	var x = Math.random() * 3;
	console.log(x);

	if (x) {

	}





	return x;
}











