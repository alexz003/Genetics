var data, users;
var dropdown1, dropdown2, scoredropdown;
var scoreP;

function preload() {
	data = loadJSON('movies.json');
}

function setup() {
	noCanvas();
	users = {};
	dropdown1 = createSelect('');
	dropdown2 = createSelect('');
	scoredropdown = createSelect('');
	scoredropdown.option('Euclidean');
	scoredropdown.option('Pearson');
	for(var i = 0; i < data.users.length; i++) {
		var name = data.users[i].name;
		dropdown1.option(name);
		dropdown2.option(name);
		users[name] = data.users[i];
	}
	
	var button = createButton('submit');
	button.mousePressed(chooseScoring);
	
	scoreP = createP('');
}

function chooseScoring() {
	if(scoredropdown.value() == 'Euclidean') 
		euclideanSimilarity();
	else
		pearsonSimilarity();
}

// Scoring using Pearson Correlation Coefficient
function pearsonSimilarity() {

	// Cleaning up the data given to us
	var ratings1 = Object.values(users[dropdown1.value()]);
	ratings1.splice(0, 2);
	var ratings2 = Object.values(users[dropdown2.value()]);
	ratings2.splice(0, 2);
	var movies = Object.keys(users[dropdown1.value()]);
	movies.splice(0, 2);

	// Needed for perason scoring
	var sum1 = 0;
	var sum2 = 0;
	var sum1sq = 0;
	var sum2sq= 0;
	var pSum = 0;

	// Number of movies
	var n = 0;
	for(var i = 0; i < movies.length; i++) {
		// Will omit any ratings that were not included in the submission
		if(ratings1[i] != null && ratings2[i] != null) {
			var rating1 = ratings1[i];
			var rating2 = ratings2[i];
			
			// Sum the ratings
			sum1 += rating1;
			sum2 += rating2;
			
			// Sum the square of the ratings
			sum1sq += (rating1*rating1);
			sum2sq += (rating2*rating2);

			//Sum the products of the ratings
			pSum += (rating1*rating2);
			n++;
		}else {
			console.log('movies[' + i + '] was not rated for one of the chosen entries.');
		}
	}
	
	// All entries were empty
	if(n == 0) {
		return 0;
	}

	//console.log('sum1: ' + sum1 + ' sum2: ' + sum2 + ' sum1sq: ' + sum1sq + ' sum2sq: ' + sum2sq + ' pSum: ' + pSum);

	var num = pSum - (sum1*sum2 / n);
	var den = sqrt((sum1sq - sum1*sum1 / n)*(sum2sq - sum2*sum2/n));
	if(den == 0) {
		return 0;
	}
	scoreP.html(num/den);
}

// Scoring using the Euclidean Distance Inverse as similarity
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
