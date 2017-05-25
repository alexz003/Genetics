var network;

function setup() {
	createCanvas(640, 360);
	network = new Network(width/2, height/2);


	var a = new Neuron(-275, 75);
	var b = new Neuron(-275, -75);
	var c = new Neuron(-175, 75);
	var d = new Neuron(-175, -75);
	var e = new Neuron(-75, 75);
	var f = new Neuron(-75, -75);
	var g = new Neuron(25, 0);

	network.connect(a, c, random(1));
	network.connect(a, d, random(1));
	network.connect(b, c, random(1));
	network.connect(b, d, random(1));
	network.connect(c, f, random(1));
	network.connect(d, e, random(1));
	network.connect(e, g, 1);
	network.connect(f, g, 1);
	
	network.addNeuron(a);
	network.addNeuron(b);
	network.addNeuron(c);
	network.addNeuron(d);
	network.addNeuron(e);
	network.addNeuron(f);
	network.addNeuron(g);

	network.addStartingNeuron(a);
	network.addStartingNeuron(b);
}

function draw() {
	background(255);
	network.update();
	network.display();

	if(frameCount % 30 == 0) { 
		network.feedForward(random(1));
	}
}
