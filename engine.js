
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



var calculatePosteriorDistribution = function(jointMatrix, initialMarginalDistribution){
	var marginalDistribution = [];
	var returnMatrix = createMatrix(jointMatrix.rows, 0, 0);


	for(var j = 0; j < jointMatrix.columns ; j++){
		if( columnIsZero(jointMatrix, j)){
			returnMatrix = removeColumn(jointMatrix, j);
			continue;
		}
		addMatrixColumn(jointMatrix,returnMatrix,j);
		marginalDistribution.push(initialMarginalDistribution[j]);
	}

	for(var j = 0; j < returnMatrix.columns; j++){
		for(var i = 0; i < returnMatrix.rows ; i++){
			returnMatrix.data[i][j] = returnMatrix.data[i][j]/marginalDistribution[j]; 	
		}	
	}
	
	return {
		matrix: returnMatrix,
		distribution: marginalDistribution
	}
}

var getHyperDistribution = function(posteriorDistributionMatrix, marginalDistributionY){
	// check if there are scaled columns
	var hyperDistributionMatrix = createMatrix(posteriorDistributionMatrix.rows, 0, 0);
	var finalMarginalDistribution = [];
	var removedColumns = [];


	for(var j = 0; j < posteriorDistributionMatrix.columns ; j++){
		if(  removedColumns.includes(j) ){
			continue;
		}

		finalMarginalDistribution.push(marginalDistributionY[j]);

		var columnToRemove = columnMultiple(posteriorDistributionMatrix, j);
		if(columnToRemove == -1){
			addMatrixColumn(posteriorDistributionMatrix, hyperDistributionMatrix, j);

		}
		else{
			while( columnToRemove != -1){

				hyperDistributionMatrix  = removeColumn(posteriorDistributionMatrix, columnToRemove);
				removedColumns.push(columnToRemove);
				finalMarginalDistribution[j] += marginalDistributionY[ columnToRemove ];
		
				columnToRemove = columnMultiple(hyperDistributionMatrix, j);			
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
var priorProbability = [1/4,1/2,1/4];

console.log("IN1", channelMatrix);
console.log("P1",priorProbability);

var jointMatrix = calculateJointDistribution(priorProbability, channelMatrix);
console.log("joint", jointMatrix);

var  marginalDistribution = calculateMarginalDistribution(jointMatrix);
// console.log("marginal", marginalDistribution);

var posteriorDistribution = calculatePosteriorDistribution(jointMatrix, marginalDistribution);
console.log("posterior" , posteriorDistribution);

var object = getHyperDistribution(posteriorDistribution.matrix, marginalDistribution);
console.log("matriz", object.matrix);
console.log("distribution", object.distribution);

console.log("\t\tOK");

var m2 = createMatrix(4,4,0);
m2.data = [[1/2, 1/6, 1/3, 0], [0, 1/3, 2/3, 0], [0, 1/2, 0, 1/2], [1/4, 1/4, 1/2, 0]]
var prior2 = [1/3, 1/3, 0, 1/3]

console.log("IN2", m2);
console.log("P2", prior2);
var joint2 = calculateJointDistribution(prior2, m2);
// console.log("j2", joint2);
var marginal2 = calculateMarginalDistribution(joint2);
// console.log("marg2", marginal2);
var posterior = calculatePosteriorDistribution(joint2, marginal2);
console.log("post", posterior);
var hyper = getHyperDistribution(posterior.matrix, marginal2);
console.log("hiper2 matriz", hyper.matrix);
console.log("hiper2 distr", hyper.distribution);
