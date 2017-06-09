var canvas;
var perc;
var points = [];

function setup() {
	for(var i = 0; i < 100; i++) {
		points[i] = new Point();
	}
	canvas = createCanvas(200, 200);
	perc = new Perceptron();
	var inputs = [-1, 0.2];
	var guess = perc.guess(inputs);
	console.log(guess);
}

function draw() {
	background(255);
	stroke(0);
	line(0, 0, 200, 200);
	for(var i = 0; i < 100; i++) {
		var inputs = [points[i].x, points[i].y];
		var target = points[i].label;
		points[i].show();

		var guess = perc.guess(inputs);
		if(guess == target) {
			fill(0, 255, 0);
		} else {
			fill(255, 0, 0);
		}
		noStroke();
		ellipse(points[i].x, points[i].y, 4, 4);
	}
}

function mousePressed() {
	for(var i = 0; i < 100; i++) {
		var input = [points[i].x, points[i].y];
		var target = points[i].label;
		perc.train(input,target);
	}
}
