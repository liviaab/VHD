/*
	Globals
*/

var _hyperDistribution = [];


var getHyper = function(){
	return _hyperDistribution;
}

var setHyper = function(matrix){
	_hyperDistribution = matrix;
}


/*
	Methods
*/
var getHyperDistribution = function(posteriorDistributionMatrix, marginalDistributionY){
	// check if there are scaled columns
	var hyperDistributionMatrix = new Matrix();
	var finalMarginalDistribution = [];
	var columnToRemove;
	var removedColumns = [];


	for(var j = 0; j < posteriorDistributionMatrix.columns ; j++){
		if(  removedColumns.includes(j) ){
			continue;
		}

		finalMarginalDistribution.push(marginalDistributionY[j]);

		columnToRemove = posteriorDistributionMatrix.firstMultipleOfColumn(j);
		if(columnToRemove == -1){
			hyperDistributionMatrix.addColumnFromMatrix(posteriorDistributionMatrix, j);
		}
		else{
			while( columnToRemove != -1){

				hyperDistributionMatrix  = posteriorDistributionMatrix.removeColumn( columnToRemove);
				removedColumns.push(columnToRemove);
				finalMarginalDistribution[j] += marginalDistributionY[ columnToRemove ];
		
				columnToRemove = posteriorDistributionMatrix.firstMultipleOfColumn(j);			
			}	
		}
	}

	_hyperDistribution = posteriorDistributionMatrix;
	return {
		matrix: posteriorDistributionMatrix, 
		distribution: finalMarginalDistribution 
	};
}
