
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

var calculatePosteriorDistributions = function( jointMatrix, marginalDistributionY){
	//normalize the columns of J

	var posteriorDistributionMatrix = createMatrix(jointMatrix.rows, jointMatrix.columns, 0);
	for(var j = 0; j < jointMatrix.columns; j++){
		for(var i = 0; i < jointMatrix.rows ; i++){

			//multiply each row x of C by the prior prob. Px
			posteriorDistributionMatrix.data[i][j] = jointMatrix.data[i][j]/marginalDistributionY[j]; 	
		}	
	}
	return posteriorDistributionMatrix;
}

var getHyperDistribution = function(posteriorDistributionMatrix, marginalDistributionY){
	// check if there are equal columns
	var finalMarginalDistribution = [];
	var equal = true, multiple = true;
	var scaleFactorPrev, scaleFactorCurr;
	var columnValues, columnValuesToCompare ;
	var hyperDistributionMatrix = createMatrix(posteriorDistributionMatrix.rows, 0, 0);
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

				if( posteriorDistributionMatrix.data[i][j] != posteriorDistributionMatrix.data[i][k] ){
					equal = false;
				}

				scaleFactorCurr	= posteriorDistributionMatrix.data[i][k]/posteriorDistributionMatrix.data[i][j];
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


