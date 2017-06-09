function Perceptron() {
	this.weights = [];
	// Learning rate
	this.lr = 0.1;
	for(var i = 0; i < 2; i++) {
		this.weights[i] = random(-1, 1);
	}
	console.log(this.weights);
}

Perceptron.prototype.guess = function(inputs) {
	var sum = 0;
	for(var i = 0; i < this.weights.length; i++) {
		sum += inputs[i]*this.weights[i];
	}
	return this.activationFunction(sum); 
}

Perceptron.prototype.activationFunction = function(n) {
	if(n >= 0) {
		return 1;
	}
	else {
		return -1;
	}
}
// Trains the perceptron with the given inputs
Perceptron.prototype.train = function(inputs, target) {
	var guess = this.guess(inputs);
	var error = target - guess;
		
	// Tunes weights
	for(var i = 0; i < this.weights.length; i++) {
		this.weights[i] += error*inputs[i]*this.lr;
		//console.log(error + ' : ' + this.weights[i]);
	}
}
