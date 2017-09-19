

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
		console.log("Error - This column has more rows than the original matrix.");
		return;
	}

	for(var i = 0; i < matrix.rows; i++){
		matrix.data[i][matrix.columns] = values[i];
	}

	matrix.columns++;
}

var addMatrixColumn = function(matrixSource, matrixDest, columnIndex){	
	if(matrixSource.rows != matrixDest.rows){
		console.log("Error - Cannot copy column. Number of rows is different.");
		return;
	}

	for(var i = 0; i < matrixSource.rows; i++){
		matrixDest.data[i][columnIndex] = matrixSource.data[i][columnIndex];
	}

	matrixDest.columns++;
}

var removeColumn = function(matrix, columnIndex){
	console.log('\tREMOVE COL', columnIndex);

	var retMatrix = createMatrix(matrix.rows, matrix.columns-1, 0);
	var k;

	console.log('ret matrix in', retMatrix);
	for(var i = 0; i < matrix.rows; i++){
		k = 0;
		for(var j = 0; j < matrix.columns; j++){
			if( j == columnIndex){			 	
				break;
			}
			retMatrix.data[i][k] = matrix.data[i][k];
			k++;
		}
	}	

	return retMatrix;
}