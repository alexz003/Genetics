function Perceptron(c, objects) {
	this.weights = [];
	this.c = c;
	
	// Set random weight values initially
	for(var i = 0; i < objects.length; i++) {
		this.weights[i] = random(0, 1);
	}
}

// Feeds input into the activate function to get perceptron output
Perceptron.prototype.feedForward = function (forces) {
	var sum = createVector(0, 0);

	for(var i = 0; i < forces.length; i++) {
//		console.log(forces);
		forces[i].mult(this.weights[i]);
		sum.add(forces[i]);
	}
	
	// Return the sum of the forces
	return sum;
}


// Adjusts weight to account for how incorrect the guess was
Perceptron.prototype.train = function(forces, error) {
	

	for(var i = 0; i < this.weights.length; i++) {
		this.weights[i] += this.c*error.x*forces[i].x;
		this.weights[i] += this.c*error.y*forces[i].y;
		this.weights[i] = constrain(this.weights[i], 0, 1);
	}
}
