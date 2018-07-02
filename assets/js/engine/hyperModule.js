/*
	Globals
*/

var _hyperDistribution = [];
var _finalDistribution = [];


var getHyper = function(){
	return _hyperDistribution;
}

var setHyper = function(matrix){
	_hyperDistribution = [];
	for(var i = 0; i < matrix.rows ; i++){
		_hyperDistribution.push(matrix.data[i].slice());
	}	 
	_hyperDistribution = {
		rows: matrix.rows,
		columns: matrix.columns,
		data: _hyperDistribution
	}
}

var setFinalDisttribution = function(array){
	_finalDistribution = array.slice();	
}

var getFinalDistribution = function(){
	return _finalDistribution
}

/*
	Methods
*/
var getHyperDistribution = function(posteriorDistributionMatrix, marginalDistributionY){
	// check if there are scaled columns
	//var hyperDistributionMatrix = new Matrix();
	var finalMarginalDistribution = [];
	var columnToRemove;
	var removedColumns = [];
	var posteriorData = [];
	posteriorDistributionMatrix.data.forEach( function(element, index) {
		element.forEach( function(item, internalIndex) {
			posteriorData.push(item);
		});
	});

	var copyPosteriorDistributionMatrix = new Matrix(posteriorDistributionMatrix.rows, posteriorDistributionMatrix.columns, posteriorData);

	for(var j = 0; j < copyPosteriorDistributionMatrix.columns ; j++){
		if(  removedColumns.includes(j) ){
			continue;
		}

		finalMarginalDistribution.push(marginalDistributionY[j]);

		columnToRemove = copyPosteriorDistributionMatrix.firstMultipleOfColumn(j);
		if(columnToRemove == -1){
			//hyperDistributionMatrix.addColumnFromMatrix(copyPosteriorDistributionMatrix, j);
			continue;
		}
		else{
			while( columnToRemove != -1){

				//hyperDistributionMatrix  = 
				copyPosteriorDistributionMatrix.removeColumn( columnToRemove);
				removedColumns.push(columnToRemove);
				finalMarginalDistribution[j] += marginalDistributionY[ columnToRemove ];
		
				columnToRemove = copyPosteriorDistributionMatrix.firstMultipleOfColumn(j);			
			}	
		}
	}

	setHyper(copyPosteriorDistributionMatrix);
	setFinalDisttribution(finalMarginalDistribution);

	return {
		matrix: copyPosteriorDistributionMatrix, 
		distribution: finalMarginalDistribution 
	};
}
