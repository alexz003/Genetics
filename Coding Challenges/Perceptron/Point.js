function Point() {
	this.x = random(200);
	this.y = random(200);
	this.label = this.x >= this.y ? 1 : -1;

}

Point.prototype.show = function() {

	stroke(0);
	fill(0);
	ellipse(this.x, this.y, 8, 8);
}
