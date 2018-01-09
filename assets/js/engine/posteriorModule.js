/*
	Globals
*/

var _posteriorDistribution = [];

var getPosterior = function(){
	return _posteriorDistribution;
}

var setPosterior = function(matrix){
	_posteriorDistribution = matrix;
}


/*
	Methods
*/
var getPosteriorDistribution = function(jointMatrix, initialMarginalDistribution){
	var marginalDistribution = [];
	//var returnMatrix = new Matrix();


	for(var j = 0; j < jointMatrix.columns ; j++){
		if( jointMatrix.isColumnZero(j)){
			//returnMatrix = jointMatrix.removeColumn(j);
			jointMatrix.removeColumn(j);
			initialMarginalDistribution.splice(j);
		}
		//jointMatrix.addColumnFromMatrix(returnMatrix,j);
		//marginalDistribution.push(initialMarginalDistribution[j]);
	}

	for(var j = 0; j < jointMatrix.columns; j++){
		for(var i = 0; i < jointMatrix.rows ; i++){
			jointMatrix.data[i][j] = jointMatrix.data[i][j]/initialMarginalDistribution[j]; 	
		}	
	}
	_posteriorDistribution = jointMatrix;

	return {
		matrix: jointMatrix,
		distribution: initialMarginalDistribution
	}
}