var network;

function setup() {
	createCanvas(640, 360);
	network = new Network(width/2, height/2);
	console.log(network);

	var a = new Neuron(-200, 0);
	var b = new Neuron(0, 100);
	var c = new Neuron(0, -100);
	var d = new Neuron(200, 0);
	
	network.connect(a, b);
	network.connect(a, c);
	network.connect(b, d);
	network.connect(c, d);
	
	network.addNeuron(a);
	network.addNeuron(b);	
	network.addNeuron(c);
	network.addNeuron(d);
}

function draw() {
	background(255);
	stroke(0);

	network.display();
}
