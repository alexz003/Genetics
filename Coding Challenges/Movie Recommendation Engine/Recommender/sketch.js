var data, users;
var dropdown1, scoredropdown;
var scoresGiven = [];
var scoreP;

var resultDivs = [];


function preload() {
	data = loadJSON('movies.json');
}

function setup() {
	noCanvas();
	users = {};

	var titles = data.titles;	
	for(var i = 0; i < titles.length; i++) {
		var div = createDiv(titles[i]);
		var dropdown = createSelect('');
		dropdown.title = titles[i];
		dropdown.option('not seen');
		dropdown.parent(div);
		for(var star = 1; star < 6; star++) {
			dropdown.option(star);
		}	
		scoresGiven.push(dropdown);
	}
	scoredropdown = createSelect('');
	scoredropdown.option('Euclidean');
	scoredropdown.option('Pearson');

	var button = createButton('submit');
	button.mousePressed(predictRatings);
	scoreP = createP('');
}

function predictRatings() {
	var newUser = {};
	for(var i = 0; i < scoresGiven.length; i++) {
		var title = scoresGiven[i].title;
		newUser[title] = scoresGiven[i].value();
		if(newUser[title] == 'not seen') {
			newUser[title] = null;
		}
	}
	findNearestNeighbors(newUser);
}

function findNearestNeighbors(person1) {
	for(var i = 0; i < resultDivs.length; i++) {
		resultDivs[i].remove();
	}
	resultDivs = [];

	var scores = {};
	for(var i = 0; i < data.users.length; i++) {
		var other = data.users[i];
		if(scoredropdown.value() == 'Euclidean') {
			scores[other.name] = euclideanSimilarity(person1, other);
		} else { 
			scores[other.name] = pearsonSimilarity(person1, other);
			//console.log(scores[other.name]);
		}
	}
	data.users.sort(compareSimilarity);
	
	function compareSimilarity(a, b) {
		var score1 = scores[a.name];
		var score2 = scores[b.name];
		return score2 - score1;

	}

	for(var i = 0; i < data.titles.length; i++) {
		var title = data.titles[i];
		//console.log(data);
		if(person1[title] == null) {

			var k = 5;
			var weightedSum = 0;
			var simSum = 0;
			for(var j = 0; j < k; j++) {
				var name = data.users[j].name;
				var score = scores[name];
				var ratings = data.users[j];
				var rating = ratings[title];
				//console.log('name: ' + name + ' score: ' + score + ' ratings: ' + ratings + ' rating: ' + rating);
				if(rating != null) {
					weightedSum += rating*score;
					simSum += score;
				}
				//console.log('weighted: ' + weightedSum + ' sim: ' + simSum);
			}

			var val = weightedSum/simSum;
			//console.log(val);
			var stars = nf(parseFloat(weightedSum) / parseFloat(simSum), 1, 2);
			//console.log(stars);
			var div = createDiv(title + ': ' + stars);
			resultDivs.push(div);
			div.parent(scoreP);
		}
	}	
	/*
	var k = 5;
	for(var i = 0; i < k; i++) {
		var name = data.users[i].name;
		var div = createDiv(name + ': ' + scores[name]);
		resultDivs.push(div);
		div.parent(scoreP);
	}
	*/

}

// Scoring using Pearson Correlation Coefficient
function pearsonSimilarity(ratings1, ratings2) {
	
	var movies = Object.keys(ratings1);
	
	// Needed for perason scoring
	var sum1 = 0;
	var sum2 = 0;
	var sum1sq = 0;
	var sum2sq= 0;
	var pSum = 0;

	// Number of movies
	var n = 0;
	for(var i = 0; i < movies.length; i++) {
		//console.log(ratings1);
		//console.log(ratings2);
		// Will omit any ratings that were not included in the submission
		if(ratings1[movies[i]] != null && ratings2[movies[i]] != null) {
			var rating1 = parseInt(ratings1[movies[i]]);
			var rating2 = parseInt(ratings2[movies[i]]);
			//console.log('rating1: ' + rating1 + ' rating2: ' + rating2);	
			// Sum the ratings
			sum1 += rating1;
			sum2 += rating2;
			//console.log('sum1: ' + sum1 + ' sum2: ' + sum2);
			// Sum the square of the ratings
			sum1sq += (rating1*rating1);
			sum2sq += (rating2*rating2);

			//Sum the products of the ratings
			pSum += (rating1*rating2);
		
			n++;
		}
	}
	
	// All entries were empty
	if(n == 0) {
		return 0;
	}

	//console.log('sum1: ' + sum1 + ' sum2: ' + sum2 + ' sum1sq: ' + sum1sq + ' sum2sq: ' + sum2sq + ' pSum: ' + pSum);

	var num = pSum - (sum1*sum2 / n);
	var den = sqrt((sum1sq - sum1*sum1 / n)*(sum2sq - sum2*sum2/n));
	//console.log(num + ' : ' + den);
	if(den == 0 || num == 0) {
		return 0;
	}
	
	return num/den;
}

// Scoring using the Euclidean Distance Inverse as similarity
function euclideanSimilarity(ratings1, ratings2) {
	
	var titles = Object.keys(ratings1);
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
