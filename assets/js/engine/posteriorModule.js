/*
	Globals
*/

var _posteriorMarginalDistribution = [];
var _posteriorMatrix = [];

var getMarginalDistribution = function(){
	return _posteriorMarginalDistribution;
}

var setMarginalDistribution = function(array){
	_posteriorMarginalDistribution = array.slice();
}


var getPosterior = function(){
	return _posteriorMatrix;
}

var setPosterior = function(matrix){
	for(var i = 0; i < matrix.rows ; i++){
		_posteriorMatrix.push(matrix.data[i].slice());
	}
	_posteriorMatrix = {
		rows: matrix.rows,
		columns: matrix.columns,
		data: _posteriorMatrix
	}
}



/*
	Methods
*/
var getPosteriorDistribution = function(jointMatrix, initialMarginalDistribution){
	var marginalDistribution = [];
	var arrayData =[];
	for(var i = 0 ; i < jointMatrix.rows; i++){
		for(var j = 0; j < jointMatrix.columns ; j++){
			arrayData.push(jointMatrix.data[i][j]);
		}
	}

	var copyMatrix = new Matrix(jointMatrix.rows, jointMatrix.columns, arrayData);


	for(var j = 0; j < jointMatrix.columns ; j++){
		if( copyMatrix.isColumnZero(j)){
			//returnMatrix = jointMatrix.removeColumn(j);
			copyMatrix.removeColumn(j);
			initialMarginalDistribution.splice(j);
		}
		//jointMatrix.addColumnFromMatrix(returnMatrix,j);
		//marginalDistribution.push(initialMarginalDistribution[j]);
	}

	for(var j = 0; j < copyMatrix.columns; j++){
		for(var i = 0; i < copyMatrix.rows ; i++){
			copyMatrix.data[i][j] = copyMatrix.data[i][j]/initialMarginalDistribution[j]; 	
		}	
	}
	//_posteriorDistribution = jointMatrix;
	setPosterior(copyMatrix);
	setMarginalDistribution(initialMarginalDistribution);

	return {
		matrix: copyMatrix,
		distribution: initialMarginalDistribution
	}
}