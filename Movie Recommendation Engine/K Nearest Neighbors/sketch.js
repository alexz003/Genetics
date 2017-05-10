var data, users;
var dropdown1, scoredropdown;
var scoreP;

var resultDivs = [];


function preload() {
	data = loadJSON('movies.json');
}

function setup() {
	noCanvas();
	users = {};
	dropdown1 = createSelect('');
	scoredropdown = createSelect('');
	scoredropdown.option('Euclidean');
	scoredropdown.option('Pearson');
	for(var i = 0; i < data.users.length; i++) {
		var name = data.users[i].name;
		dropdown1.option(name);
		users[name] = data.users[i];
	}
	
	var button = createButton('submit');
	button.mousePressed(findNearestNeighbors);
	
	scoreP = createP('');
}

function findNearestNeighbors() {
	for(var i = 0; i < resultDivs.length; i++) {
		resultDivs[i].remove();
	}
	resultDivs = [];

	var name = dropdown1.value();
	var scores = {};
	for(var i = 0; i < data.users.length; i++) {
		var other = data.users[i];
		// Avoid checking your own score against yourself
		if(other.name != name) {
			if(scoredropdown.value() == 'Euclidean') {
				scores[other.name] = euclideanSimilarity(users[name], users[other.name]);
			} else { 
				scores[other.name] = pearsonSimilarity(users[name], users[other.name]);
			}
		} else {
			scores[other.name] = -1;
		} 
	}
	data.users.sort(compareSimilarity);
	
	function compareSimilarity(a, b) {
		var score1 = scores[a.name];
		var score2 = scores[b.name];
		return score2 - score1;

	}

	var k = 5;
	for(var i = 0; i < k; i++) {
		var name = data.users[i].name;
		resultDivs[i] = createDiv(name + ': ' + scores[name]);
	}

}

// Scoring using Pearson Correlation Coefficient
function pearsonSimilarity(person1, person2) {

	// Cleaning up the data given to us
	var ratings1 = Object.values(users[person1.name]);
	ratings1.splice(0, 2);
	var ratings2 = Object.values(users[person2.name]);
	ratings2.splice(0, 2);
	var movies = Object.keys(users[person1.name]);
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
	return num/den;
}

// Scoring using the Euclidean Distance Inverse as similarity
function euclideanSimilarity(ratings1, ratings2) {
	
	var titles = Object.keys(ratings1);
	
	var j = titles.indexOf('timestamp');
	titles.splice(j, 2);

	var sum = 0;
	for(var i = 0; i < titles.length; i++) {
		var title = titles[i];
		var rating1 = ratings1[title];
		var rating2 = ratings2[title];
		
		if(rating1 != null && rating2 != null) {
			var diff = rating1 - rating2;
			sum += diff*diff;
		}
	}	
	var d = sqrt(sum);

	var similarity = 1/(1+d);
	return similarity;
}
