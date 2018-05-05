/*
	Globals
*/

var _hyperDistribution = [];


var getHyper = function(){
	return _hyperDistribution;
}

var setHyper = function(matrix){
	for(var i = 0; i < matrix.rows ; i++){
		_hyperDistribution.push(matrix.data[i].slice());
	}	 
	_hyperDistribution = {
		rows: matrix.rows,
		columns: matrix.columns,
		data: _hyperDistribution
	}
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

	setHyper(posteriorDistributionMatrix);

	return {
		matrix: posteriorDistributionMatrix, 
		distribution: finalMarginalDistribution 
	};
}
