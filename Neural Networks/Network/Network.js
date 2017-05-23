function Network(x, y) {
	this.location = createVector(x, y);
	this.neurons = [];
}

Network.prototype.connect = function(a, b) {
	var c = new Connection(a, b, random(1));
	a.addConnection(c);
}

Network.prototype.addNeuron = function(n) {	
	this.neurons[this.neurons.length] = n; 
}

Network.prototype.display = function() {
	push();
	translate(this.location.x, this.location.y);
	
	for(var i = 0; i < this.neurons.length; i++) {
		this.neurons[i].display();
	}

	pop();
}
