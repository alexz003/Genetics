var network;

function setup() {
	createCanvas(640, 360);
	network = new Network(width/2, height/2);


	var a = new Neuron(-275, 0);
	var b = new Neuron(-150, 0);
	var c = new Neuron(0, 75);
	var d = new Neuron(0, -75);
	var e = new Neuron(150, 0);
	var f = new Neuron(275, 0);
	
	network.connect(a, b, 1);
	network.connect(b, c, random(1));
	network.connect(b, d, random(1));
	network.connect(c, e, random(1));
	network.connect(d, e, random(1));
	network.connect(e, f, 1);
	
	network.addNeuron(a);
	network.addNeuron(b);
	network.addNeuron(c);
	network.addNeuron(d);
	network.addNeuron(e);
	network.addNeuron(f);
}

function draw() {
	background(255);
	network.update();
	network.display();

	if(frameCount % 30 == 0) { 
		network.feedForward(random(1));
	}
}
