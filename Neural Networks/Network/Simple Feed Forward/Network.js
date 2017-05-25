function Network(x, y) {
	this.location = createVector(x, y);
	this.neurons = [];
	this.connections = [];
}

Network.prototype.feedForward = function(input) {
	var start = this.neurons[0];
	start.feedForward(input);
}

Network.prototype.update = function() {
	for(var i = 0; i < this.connections.length; i++) {
		this.connections[i].update();
	}
}

Network.prototype.connect = function(a, b, weight) {
	var c = new Connection(a, b, weight);
	a.addConnection(c);
	this.connections.push(c);
}

Network.prototype.addNeuron = function(n) {	
	this.neurons.push(n); 
}

Network.prototype.display = function() {
	push();
	translate(this.location.x, this.location.y);
	
	for(var i = 0; i < this.neurons.length; i++) {
		this.neurons[i].display();
	}

	for(var i = 0; i < this.connections.length; i++) {
		this.connections[i].display();
	}

	pop();
}
