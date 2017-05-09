var data, users;
var dropdown1, dropdown2;
var scoreP;

function preload() {
	data = loadJSON('movies.json');
}

function setup() {
	noCanvas();
	users = {};
	dropdown1 = createSelect('');
	dropdown2 = createSelect('');
	for(var i = 0; i < data.users.length; i++) {
		var name = data.users[i].name;
		dropdown1.option(name);
		dropdown2.option(name);
		users[name] = data.users[i];
	}
	
	var button = createButton('submit');
	button.mousePressed(euclideanSimilarity);
	
	scoreP = createP('');
}

function euclideanSimilarity() {
	var name1 = dropdown1.value();
	var name2 = dropdown2.value();
	
	var ratings1 = users[name1];
	var ratings2 = users[name2];

	var titles = Object.keys(ratings1);
	
	var i = titles.indexOf('name');
	titles.splice(i, 1);
	var j = titles.indexOf('timestamp');
	titles.splice(j, 2);
	
	var sum = 0;
	for(var i = 0; i < titles.length; i++) {
		var title = titles[i];
		var rating1 = ratings1[title];
		var rating2 = ratings2[title];
		var diff = rating1 - rating2;
		sum += diff*diff;
	}	
	var d = sqrt(sum);

	var similarity = 1/(1+d);
	scoreP.html(similarity);
}
