var ptron;
var t = [];
var count = 0;
var n = 2000;

function setup() {
	var canvas = createCanvas(400, 400);

	ptron = new Perceptron(3);

	for(var i = 0; i < n; i++) {
		var x = random(-width/2, width/2);
		var y = random(-height/2, height/2);
		var a = 1;
		if(y < calcLine(x))
			a = -1;
		t[i] = new Trainer(x, y, a);
	}

}

function draw() {
	background(255);
	translate(width/2, height/2);

	ptron.train(t[count].inputs, t[count].answer);
	count = (count + 1) % t.length;

	for(var i = 0; i < count; i++) {
		stroke(0);
		var guess = ptron.feedForward(t[i].inputs);
		if(guess > 0)
			 noFill();
		else
			fill(0);

		ellipse(t[i].inputs[0], t[i].inputs[1], 8, 8);
	}
}

