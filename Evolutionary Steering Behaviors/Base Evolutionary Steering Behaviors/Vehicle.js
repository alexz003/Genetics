function Vehicle(x, y, gen, dna) {
	// Physics Init Variables
	this.acceleration = createVector();
	this.velocity = p5.Vector.random2D();
	this.position = createVector(x, y);
	this.r = 3;
	this.maxforce = .5;
	this.maxspeed = 3;
	this.velocity.setMag(this.maxspeed);
	
	this.timeAlive = 0;	
	this.generation = gen;
	this.trust = 0.1;
	// Check if DNA is an array
	if(dna instanceof Array) {
		this.dna = [];

		// Copy DNA
		for(var i = 0; i < dna.length; i++) {
			// Mutation at 10%
			if(random(1) < 0.1) {
				// Steering force weights
				if(i < 2) {
					this.dna[i] = dna[i] + random(-0.2, .2);
				}
				// Perception radius
				else if(i == 3){
					this.dna[i] = dna[i] + random(-10, 10); 
				}
				// Communication radius
				else if(i == 4) {
					this.dna[i] = dna[i] + random(-5, 5);
				}
			} else {
				this.dna[i] = dna[i];
			}
		} 
	} else {
		var maxf = 3;
		this.dna = [random(-maxf, maxf), random(-maxf, maxf), random(5, 100), random(5, 100), random(5, 100)];
	} 


	this.health = 1;
}

Vehicle.prototype.update = function() {
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.maxspeed);
	this.position.add(this.velocity);
	this.acceleration.mult(0);
	this.health -= .002;
}

Vehicle.prototype.dead = function() {
	return (this.health < 0); 
}

// Create vehicle children
Vehicle.prototype.birth = function() {
	var ran = random(1);
	if(ran < 0.001) {
		// Create new child with the dna of this vehicle
		// Mutation occurs in Vehicle instantiation
		return new Vehicle(this.position.x, this.position.y, this.generation + 1, this.dna); 
	}
}

// Communicate with other vehicles for a potential boost
// in fitness(aka generation)
Vehicle.prototype.communicate = function(list) {
	var closest = null;

	for(var i = list.length - 1; i >= 0; i--) {
		var d = p5.Vector.dist(list[i].position, this.position);
		// If this child is younger and lived through fewer generations, adjust dna.
		if(d < this.dna[4] && this.generation < list[i].generation && this.timeAlive < list[i].timeAlive) {
			for(var j = 0; j < this.dna.length; j++) {
				if(random(1) < 0.001) {
					// Moves value of dna "trust" % closer to the dna of higher performing
					// vehicle.
					this.dna[j] += (list[i].dna[j] - this.dna[j])*this.trust;
					console.log('Communicated with other vehicle');
				}
			}
		}
	}

}

Vehicle.prototype.eat = function(list, index) {
	var closest = null;
	var closestD = Infinity;

	for(var i = list.length - 1; i >= 0; i--) {
		// Distance from current position
		var d = p5.Vector.dist(list[i], this.position);

		// Closest food/poison within perception radius
		if(d < this.dna[2 + index] && d < closestD) {
			closestD = d;
			closest = list[i];

			// Distance within 5 pixels
			if(d < 5) {
				list.splice(i, 1);
				// Add or subtract health
				this.health += nutrition[index];
			}
		}
	}

	if(closest) {
		var seek = this.seek(closest, index);
		seek.mult(this.dna[index]);
		seek.limit(this.maxforce);
		this.applyForce(seek);
	}
}

Vehicle.prototype.applyForce = function(force) {
	this.acceleration.add(force); 
}

Vehicle.prototype.seek = function(target, index) {
	// Vector from current location to target
	var desired = p5.Vector.sub(target, this.position); 
	var d = desired.mag();

	desired.setMag(this.maxspeed);

	var steer = p5.Vector.sub(desired, this.velocity);

	return steer;
}

Vehicle.prototype.display = function() {

	// Color based on health
	var green = color(0, 255, 0);
	var red = color(255, 0, 0);
	var col = lerpColor(red, green, this.health)

		// Draw a triangle rotated in the direction of velocity
		var theta = this.velocity.heading() + PI / 2;
	push();
	translate(this.position.x, this.position.y);
	rotate(theta);

	// Extra info
	if (debug.checked()) {
		noFill();

		// Circle and line for food
		stroke(0, 255, 0, 100);
		ellipse(0, 0, this.dna[2] * 2);
		line(0, 0, 0, -this.dna[0] * 25);

		// Circle and line for poison
		stroke(255, 0, 0, 100);
		ellipse(0, 0, this.dna[3] * 2);
		line(0, 0, 0, -this.dna[1] * 25);

		// Circle for communication range
		stroke(0, 0, 255, 100);
		ellipse(0, 0, this.dna[4] * 2);
	}

	// Draw the vehicle itself
	fill(col);
	stroke(col);
	beginShape();
	vertex(0, -this.r * 2);
	vertex(-this.r, this.r * 2);
	vertex(this.r, this.r * 2);
	endShape(CLOSE);
	pop();
}


// A force to keep it on screen
Vehicle.prototype.boundaries = function() {
	var d = 10;
	var desired = null;
	if (this.position.x < d) {
		desired = createVector(this.maxspeed, this.velocity.y);
	} else if (this.position.x > width - d) {
		desired = createVector(-this.maxspeed, this.velocity.y);
	}

	if (this.position.y < d) {
		desired = createVector(this.velocity.x, this.maxspeed);
	} else if (this.position.y > height - d) {
		desired = createVector(this.velocity.x, -this.maxspeed);
	}

	if (desired !== null) {
		desired.setMag(this.maxspeed);
		var steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(this.maxforce);
		this.applyForce(steer);
	}
}
