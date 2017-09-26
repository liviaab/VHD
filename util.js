
/*
*	Cria um objeto matriz com três propriedades:
*	- rows: quantidade de linhas
*	- columns: quantidade de colunas
*	- data: os valores que a matriz armazena
*	
*	@param {Number} numRows 
*	@param {Number} numColumns
*	@param {Object} defaultValue - pode ser numero, caractere ou string
*
*	@return {Object} - matriz
*/
var createMatrix = function(numRows, numColumns, defaultValue){
	var matrix = {
		rows: numRows,
		columns: numColumns,
		data: []
	}

	for (var i = 0 ; i < numRows ; i++){
		matrix.data.push([]);
		matrix.data[i].push(new Array(numColumns));

		for (var j = 0 ; j < numColumns; j++){
			matrix.data[i][j] = defaultValue;
		}
	}
	return matrix;
}


/*
*	Adiciona um array de valores como a última coluna da matriz
*	O parametro 'matrix' deve ser criado com a funcao'createMatrix'
*
*	@param {Object} matrix 
*	@param {Array} values 
*
*	@return {Object} - matriz com a nova coluna
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

/*
*	Adiciona a coluna de 'matrixSource' como a ultima coluna de 'matrixDest'
*	Ambos parametros 'matrixSource' e 'matrixDest' devem ser criados com a funcao'createMatrix'
*	'columnIndex' é o indice da coluna em 'matrixSource' que será copiado para 'matrixDest'
*
*	@param {Object} matrixSource
*	@param {Object} matrixDest 
*	@param {Number} columnIndex
*
*	@return {Object} - objeto matrixDest com a nova coluna
*/
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

/*
*	Remove a coluna da matriz no indice indicado 
*	O parametro 'matrix' deve ser criado com a funcao 'createMatrix'
*	'columnIndex' e o indice da coluna que sera removida
*
*	@param {Object} matrix
*	@param {Number} columnIndex
*
*	@return {Object} - objeto matriz sem a coluna no indice indicado
*/
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

/*
*	Verifica se todos os valores da coluna indicada sao zero. 
*	O parametro 'matrixObject' deve ter sido criado com a funcao 'createMatrix'
*	'columnIndex' e o indice da coluna que sera verificada
*
*	@param {Object} matrixObject
*	@param {Number} columnIndex
*
*	@return {Bool} - true se todos os valores sao zero
*/
var columnIsZero = function(matrixObject, columnIndex){
	var sum = 0;
	for(var i = 0; i < matrixObject.rows; i++){
		sum += Math.abs(matrixObject.data[i][columnIndex]);
	}

	return (sum == 0)? true : false;
}

/*
var columnMultipleOLD = function(matrix, j){
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
}*/

/*
*	Retorna o indice da primeira ocorrencia de uma coluna que é multipla do indice da coluna dada
*	O parametro 'matrix' deve ter sido criado com a funcao 'createMatrix'
*	'columnIndex' e o indice da coluna base de comparacao
*
*	@param {Object} matrix
*	@param {Number} columnIndex
*
*	@return {Number} - numero da proxima coluna que é multiplo da coluna base. Caso nao exista, e retornado o valor -1
*/
var columnMultiple = function(matrix, columnIndex){
	var prevScale, currScale, equal;

	for(var k = columnIndex+1 ; k < matrix.columns; k++ ){
		for(var i = 0; i < matrix.rows; i++){

			prevScale  = matrix.data[i][k]/matrix.data[i][columnIndex];

			if(matrix.data[i][columnIndex] == 0 || prevScale == undefined || (matrix.data[i][k] == 0 && matrix.data[i][columnIndex] == 0) ){ 
				continue;
			}
			else{
				break;
			}
		}	

		equal = true;
		
		for(var p = i+1; p < matrix.rows; p++ ){
			currScale = matrix.data[p][k]/matrix.data[p][columnIndex];
			if ( (matrix.data[p][columnIndex] == 0 && matrix.data[p][k] != 0) || (prevScale != currScale && !isNaN(currScale) && currScale != undefined)) {
				equal = false;
				break;
			}		
		}

		if(equal){
			return k;
		}
	} 
	return -1;
}