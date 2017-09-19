
var calculateJointDistribution = function(priorProbability, channelMatrix){
	var jointMatrix = createMatrix(channelMatrix.rows, channelMatrix.columns, 0);
	
	for(var j = 0; j < channelMatrix.columns ; j++){
		for(var i = 0; i < channelMatrix.rows ; i++){
			//multiply each row x of C by the prior prob. Px
			jointMatrix.data[i][j] = priorProbability[i] * channelMatrix.data[i][j];	
		}	
	}
	return jointMatrix;
}

var calculateMarginalDistribution = function(jointMatrix){
	//array marginalDistributionY ;
	//sum the columns of J
	var marginalDistributionY = [];
	console.log('asda', jointMatrix);

	for(var j = 0; j < jointMatrix.columns ; j++){
		var sum = 0;
		for(var i = 0; i < jointMatrix.rows ; i++){
			//multiply each row x of C by the prior prob. Px
			sum += jointMatrix.data[i][j]; 	
		}	
		marginalDistributionY.push(sum);
	}
	return marginalDistributionY;
}

var calculatePosteriorDistributions = function( jointMatrix, initialMarginalDistribution){
	//normalize the columns of J

	console.log('JM', jointMatrix);

	//remove undefined columns
	var undefinedColumn;
	var posteriorDistributionMatrix = createMatrix(jointMatrix.rows, 0, 0);
	var marginalDistribution = [];

	for (var j = 0; j < jointMatrix.columns ; j++){
		undefinedColumn = true;
		for (var i = 0; i < jointMatrix.rows; i++){		

			if(jointMatrix.data[i][j] != 0 && jointMatrix.data[i][j] != NaN){
				console.log('column ',j, ' has numbers. Add ',initialMarginalDistribution[j]);
				undefinedColumn = false;
				break;
			}
		}

		if(undefinedColumn == true){
			console.log('\t', j+1, " column is zero");
			console.log(jointMatrix.numRows, jointMatrix.numColumns);
			posteriorDistributionMatrix = removeColumn(jointMatrix, j);
		}	
		else{
			marginalDistribution.push(initialMarginalDistribution[j]);
			addMatrixColumn(jointMatrix, posteriorDistributionMatrix, j)
		}	
	}

	var returnMatrix = createMatrix(jointMatrix.rows, jointMatrix.columns, 0);
	for(var j = 0; j < jointMatrix.columns; j++){
		for(var i = 0; i < jointMatrix.rows ; i++){
			returnMatrix.data[i][j] = jointMatrix.data[i][j]/marginalDistribution[j]; 	
		}	
	}
	console.log('the end', returnMatrix, marginalDistribution);
	
	return {
		matrix: returnMatrix,
		distribution: marginalDistribution
	}
}


var getHyperDistribution = function(posteriorDistributionMatrix, marginalDistributionY){
	// check if there are equal columns
	var finalMarginalDistribution = [];
	var equal = true, multiple = true;
	var scaleFactorPrev, scaleFactorCurr;
	var columnValues, columnValuesToCompare ;
	var hyperDistributionMatrix 	= createMatrix(posteriorDistributionMatrix.rows, 0, 0);
	var markedColumns = [];

	for(var j = 0; j < posteriorDistributionMatrix.columns-1 ; j++){

		columnValues = [];
		columnValuesToCompare = [];
		if(  markedColumns.indexOf(j) > -1 ){
			continue;
		}

		for(var k = j+1 ; k < posteriorDistributionMatrix.columns; k++){
			equal = false;
			scaleFactorPrev = posteriorDistributionMatrix.data[0][k]/posteriorDistributionMatrix.data[0][j];
			scaleFactorCurr = 1;
			
			for(var i = 0; i < posteriorDistributionMatrix.rows; i++){
				columnValues[i] = posteriorDistributionMatrix.data[i][j];
				columnValuesToCompare[i] = posteriorDistributionMatrix.data[i][k];

				if( posteriorDistributionMatrix[i][j] != posteriorDistributionMatrix[i][k] ){
					equal = false;
				}

				scaleFactorCurr	= posteriorDistributionMatrix[i][k]/posteriorDistributionMatrix[i][j];
				if(scaleFactorCurr != scaleFactorPrev){
					multiple = false;
				}
				scaleFactorPrev = scaleFactorCurr;
			}			

			if(j+1 == k){
				addColumn(hyperDistributionMatrix, columnValues);
				finalMarginalDistribution.push(marginalDistribution[j]);
			}
				
			if(equal || multiple) {				
				markedColumns.push(k);
			}else{
				if(j == (posteriorDistributionMatrix.columns - 2) && k == (posteriorDistributionMatrix.columns -1) ){
					addColumn(hyperDistributionMatrix, columnValuesToCompare);
					finalMarginalDistribution.push(marginalDistribution[k]);
				}
			}
		}
	}

	return {
		matrix: hyperDistributionMatrix, 
		distribution: finalMarginalDistribution 
	};
}


var channelMatrix = createMatrix(3,4,'');
channelMatrix.data = [[1/2, 1/2, 0, 0], [0, 1/4, 1/2, 1/4], [1/2, 1/3, 1/6, 0]];
console.log(channelMatrix);

var priorProbability = [1/4,1/2,1/4]
console.log(priorProbability);

var jointMatrix = calculateJointDistribution(priorProbability, channelMatrix);
console.log("joint", jointMatrix);

var  marginalDistribution = calculateMarginalDistribution(jointMatrix);
console.log("marginal", marginalDistribution);

var posteriorDistribution = calculatePosteriorDistributions(jointMatrix, marginalDistribution);
console.log("posterior" , posteriorDistribution);

var object = getHyperDistribution(posteriorDistribution, marginalDistribution);
console.log("matriz", object.matrix);
console.log("distribution", object.distribution);


var m2 = createMatrix(4,4,0);
m2.data = [[1/2, 1/6, 1/3, 0], [0, 1/3, 2/3, 0], [0, 1/2, 0, 1/2], [1/4, 1/4, 1/2, 0]]
var prior2 = [1/3, 1/3, 0, 1/3]

console.log("m2", m2);
console.log("prior", prior2);
var joint2 = calculateJointDistribution(prior2, m2);
console.log("j2", joint2);
var marginal2 = calculateMarginalDistribution(joint2);
console.log("marg2", marginal2);
var posterior = calculatePosteriorDistributions(joint2, marginal2);
console.log("post", posterior);
var hyper = getHyperDistribution(posterior, marginal2);
console.log("hiper2", hyper.matrix);