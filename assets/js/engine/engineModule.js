/*
	Globals
*/

var _priorDistribution = [];
var _channelMatrix = [];

var getPrior = function(){
	return _priorDistribution;
}

var getChannel = function(){
	return _channelMatrix;
}

var setPrior = function(array){
	_priorDistribution = [];
	for(var i =0 ;i< array.length; i++){
		_priorDistribution.push(  math.fraction( array[i] ));
	}
	
}

var setChannel = function(matrix){
	_channelMatrix = [];

	for(var i = 0; i < matrix.rows ; i++){
		_channelMatrix.push(matrix.data[i].slice());
	}
	_channelMatrix = {
		rows: matrix.rows, 
		columns: matrix.columns,
		data: _channelMatrix
	}
}


/*
	Considerações:
	A matriz que representa o canal tem como entradas as linhas e como saída as colunas;
	Todas as matrizes aqui utilizadas DEVEM ser criadas com o método Matrix();
*/
var getEntropy = function(array){
	var entropy = 0;
	for(var i = 0 ; i < array.length ; i++){
		entropy += (array[i] == 0)? 0 : array[i] * [ Math.log( 1/ array[i] ) / Math.log(2) ];
	}

	return entropy;
}

var getConditionalEntropyRows = function(matrix){
	var arrayResult = [];
	for( var i = 0 ; i < matrix.rows ; i++){
		
		arrayResult.push(getEntropy(matrix.data[i]));
		
	}
	return arrayResult;
}

var getConditionalEntropyColumns = function(matrix){
	var columnArray;
	var arrayResult = [];
	for(var j = 0 ; j < matrix.columns ; j++){
		columnArray = []
		for(var i = 0; i < matrix.rows; i++){
			columnArray.push(matrix.data[i][j]);
		}
		arrayResult.push(getEntropy(columnArray));
	}
	return arrayResult;
}

var sumArray = function(array){
	var result = 0;
	for( var i = 0 ; i < array.length ; i++){		
		result += array[i];		
	}
	return result;
}

