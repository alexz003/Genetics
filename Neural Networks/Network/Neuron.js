function Neuron(x, y) {
	this.location = createVector(x, y);
	this.connections = [];
}

Neuron.prototype.addConnection = function(c) {
	this.connections.push(c);
}

Neuron.prototype.display = function() {
	
	// Display Neuron
	stroke(1);
	fill(0);
	ellipse(this.location.x, this.location.y, 16, 16);

	// Display connections
	for(var i = 0; i < this.connections.length; i++) {
		this.connections[i].display();
	}
}
