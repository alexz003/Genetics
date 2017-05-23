var ptron;
var t = [];
var count = 0;
var n = 2000;
var vehicles = [];
var objects = [];

function setup() {
	var canvas = createCanvas(400, 400);
	angleMode(RADIANS);
	for(var i = 0; i < 5; i++) {
		objects[i] = {};
		objects[i].location = createVector(floor(random(0, 400)), floor(random(0, 400)));
	}
	for(var i = 0; i < 25; i++) {
		vehicles[i] = new Vehicle(random(0, 400), random(0, 400), random(.01, .05), objects);
	}
}

function draw() {
	background(255);
	//console.log(vehicle);	
	
	var loc = createVector(width/2, height/2);
//	console.log(mouse);
	for(var i = 0; i < vehicles.length; i++) {
		vehicles[i].steer(objects);	
		vehicles[i].update();
		vehicles[i].display();
	}

	// Create objects
	for(var i = 0; i < objects.length; i++) {
		stroke(0);
		strokeWeight(2);
		fill(255);
		rect(objects[i].location.x, objects[i].location.y, 20, 20);
	}

	// Draw circle at center of screen
	stroke(0);
	strokeWeight(2);
	fill(0);
	ellipse(width/2, height/2, 20, 20);
}

