function Trainer(x, y, a) {
	this.inputs = [];

	this.inputs[0] = x;
	this.inputs[1] = y;
	this.inputs[2] = 1;
	
	this.answer = a;
}
// Caculates the y value given x for the line 2x + 1
function calcLine(x) {
	return 2*x + 1;
}
