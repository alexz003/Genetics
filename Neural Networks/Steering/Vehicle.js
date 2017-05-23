function Vehicle(x, y, c, objects) {
	this.objects = objects;
	this.brain = new Perceptron(c, objects);
	//console.log(this.brain);
	this.location = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.maxSpeed = 10;
	this.maxForce = random(0.1, 1);
}

Vehicle.prototype.update = function() {
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.maxForce);
	this.location.add(this.velocity);
	this.acceleration.mult(0);
}

Vehicle.prototype.display = function() {
	var theta = this.velocity.heading() + PI / 2;
	push();
	translate(this.location.x, this.location.y);
	rotate(theta);
	
	var col = color(255, 0, 0);
	fill(col);
	stroke(col);
	beginShape();
	vertex(0, -6);
	vertex(-3, 6);
	vertex(3, 6);
	endShape(CLOSE);
	pop();
}

Vehicle.prototype.steer = function(targets) {
	var forces = [];
	for(var i = 0; i < targets.length; i++) {  
		forces[i] = this.seek(targets[i]); 
	}

	var result = this.brain.feedForward(forces);	
	this.applyForce(result);

	// We are trying to move towards the center of the screen
	var desired = createVector(width/2, height/2);
	var error = p5.Vector.sub(desired, this.location);

	//console.log(result + ' ' + error);
	this.brain.train(forces, error);

}

Vehicle.prototype.seek = function (target) {
	var desired = p5.Vector.sub(target.location, this.location);
	desired.normalize();
	desired.mult(this.maxSpeed);
	desired.setMag(this.maxSpeed);
	
	var steer = p5.Vector.sub(desired, this.velocity);
	steer.limit(this.maxForce);
	return steer;
}

Vehicle.prototype.applyForce = function (force) {
	this.acceleration.add(force);
}
