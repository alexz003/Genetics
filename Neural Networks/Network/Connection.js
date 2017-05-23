function Connection(a, b, weight) {
	this.a = a;
	this.b = b;
	this.weight = weight;
}

Connection.prototype.display = function() {
	stroke(0);
	strokeWeight(this.weight*4);
	fill(0);
	line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
}
