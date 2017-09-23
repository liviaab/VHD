

var createMatrix = function(numRows, numColumns, defaultValue){
	var array = {
		rows: numRows,
		columns: numColumns,
		data: []
	}

	for (var i = 0 ; i < numRows ; i++){
		array.data.push([]);
		array.data[i].push(new Array(numColumns));

		for (var j = 0 ; j < numColumns; j++){
			array.data[i][j] = defaultValue;
		}
	}
	return array;
}

/*
	@Function: addColumn
	@Param: matrix, values
	@Brief: 
		The 'matrix' parameter has to be created with the function 'createMatrix'
		The 'values' parameter is an array with values meant to be added
*/

var addColumn = function(matrix, values){
	if(values.length > matrix.rows){
		alert("Error - This column has more rows than the original matrix.");
		return;
	}

	for(var i = 0; i < matrix.rows; i++){
		matrix.data[i][matrix.columns] = values[i];
	}

	matrix.columns++;
}

var addMatrixColumn = function(matrixSource, matrixDest, columnIndex){	
	if(matrixSource.rows != matrixDest.rows){
		alert("Error - Cannot copy column. Number of rows is different.");
		return;
	}

	for(var i = 0; i < matrixSource.rows; i++){
		matrixDest.data[i][matrixDest.columns] = matrixSource.data[i][columnIndex];
	}

	matrixDest.columns++;
}

var removeColumn = function(matrix, columnIndex){

	var retMatrix = createMatrix(matrix.rows, matrix.columns-1, 0);

	var k;
	for(var i = 0; i < matrix.rows; i++){
		k = 0;
		for(var j = 0; j < matrix.columns; j++){
			if( j == columnIndex){	
				continue;
			}

			retMatrix.data[i][k] = matrix.data[i][k];
			k++;
		}
	}	
	return retMatrix;
}

var columnIsZero = function(matrixObject, columnIndex){
	var sum = 0;
	for(var i = 0; i < matrixObject.rows; i++){
		sum += Math.abs(matrixObject.data[i][columnIndex]);
	}

	return (sum == 0)? true : false;
}

// returns the first occurrence
var columnMultiple = function(matrix, j){
	var prevScale, currScale, equal;

	if(matrix.rows <= 1){ 
		return -1;
	}

	//tratar o caso da matriz com 1 linha 


	for(var k = j+1; k < matrix.columns; k++){

		if(matrix.data[0][k] == 0 || matrix.data[1][k] == 0){
			// contornar esse caso 
		}

		prevScale = matrix.data[0][j]/matrix.data[0][k];
		currScale = matrix.data[1][j]/matrix.data[1][k];


		if(prevScale != currScale){
			continue;

		}
		else{
			equal = true;
			for(var i = 2; i < matrix.rows; i++){
				
				if(matrix.data[i][k] == 0){
					continue;
				}
				currScale = matrix.data[i][j]/matrix.data[i][k];
				
				if(prevScale != currScale){
					equal = false;
					break;
				}
				prevScale = currScale;
			}

			if( equal ){
				return k;
			}
		}
	}

	return -1;
}