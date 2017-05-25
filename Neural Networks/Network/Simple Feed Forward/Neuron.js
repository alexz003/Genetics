function Neuron(x, y) {
	this.location = createVector(x, y);
	this.sum = 0;
	this.connections = [];
	this.r = 32;
}

Neuron.prototype.feedForward = function(input) {
	this.sum += input;
	if(this.sum > 1) {
		this.fire();
		this.sum = 0;
	}
}

Neuron.prototype.fire = function() {
	this.r = 64;
	for(var i = 0; i < this.connections.length; i++) {
		this.connections[i].feedForward(this.sum);
	}
}

Neuron.prototype.addConnection = function(c) {
	this.connections.push(c);
}

Neuron.prototype.display = function() {
	
	// Display Neuron
	stroke(0);
	strokeWeight(1);
	
	var b = map(this.sum, 0, 1, 255, 0);

	fill(b);
	ellipse(this.location.x, this.location.y, this.r, this.r);

	this.r = lerp(this.r, 32,.1);
}
