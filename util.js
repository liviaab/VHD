
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