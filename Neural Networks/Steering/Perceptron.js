function Perceptron(n) {
	this.weights = [];
	this.c = .01;
	
	// Set random weight values initially
	for(var i = 0; i < n; i++) {
		this.weights[i] = random(-1, 1);
	}
}

// Feeds input into the activate function to get perceptron output
Perceptron.prototype.feedForward = function (inputs) {
	var sum = 0;
	for(var i = 0; i < this.weights.length; i++) {
		// Stores the sum of the value to it's weight
		sum += inputs[i]*this.weights[i];
	}

	return this.activate(sum);
}

// Get's the output of our perceptron
Perceptron.prototype.activate = function (sum) {
	if(sum > 0) return 1;
	return -1;
}

// Adjusts weight to account for how incorrect the guess was
Perceptron.prototype.train = function(inputs, desired) {
	var guess = this.feedForward(inputs);
	var error = desired - guess;

	for(var i = 0; i < this.weights.length; i++) {
		this.weights[i] += this.c*error*inputs[i];
	}
}
