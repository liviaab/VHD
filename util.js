

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
		console.log("Wrror - This column has more rows than the original matrix.");
		return;
	}

	for(var i = 0; i < matrix.rows; i++){
		matrix.data[i][matrix.columns] = values[i];
	}

	matrix.columns++;
}