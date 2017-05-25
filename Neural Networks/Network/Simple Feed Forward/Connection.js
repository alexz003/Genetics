function Connection(a, b, weight) {
	this.a = a;
	this.b = b;
	this.weight = weight;
	this.sending = false;
	this.sender;
	this.output = 0;
}

Connection.prototype.feedForward = function(input) {
	this.sending = true;
	this.sender = this.a.location.copy();
	
	this.output = input*this.weight;
}

Connection.prototype.update = function() {
	

	if(this.sending) {
		this.sender.x = lerp(this.sender.x, this.b.location.x, 0.1);
		this.sender.y = lerp(this.sender.y, this.b.location.y, 0.1);
		var d = this.sender.dist(this.b.location);

		if(d < 1) {
			
			this.b.feedForward(this.output);
			this.sending = false;
		}

	}
}

Connection.prototype.display = function() {
	stroke(0);
	strokeWeight(1+this.weight*4);
	fill(0);
	line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
	
	if(this.sending) {
		fill(0);
		strokeWeight(1);
		ellipse(this.sender.x, this.sender.y, 16, 16);
	}
}
