/*
* 	Constructs a matrix object with the properties number of rows, number od columns and data.
*	Cria um objeto matriz com três propriedades:
*	- rows: quantidade de linhas
*	- columns: quantidade de colunas
*	- data: os valores que a matriz armazena, linhas em forma de array
*	
*	@param {Number} numRows 
*	@param {Number} numColumns 
*	@param {Array} data 
*
*/
function Matrix(numRows, numColumns, data) {
	if(numRows == undefined || numColumns == undefined || data == undefined){
		this.rows = undefined;
		this.columns = undefined;
		this.data = []
	}
	else{
		this.rows = numRows;
		this.columns = numColumns;
		this.data = []
		
		var k = 0;
		for (var i = 0 ; i < numRows ; i++){
			this.data.push([]);
			this.data[i].push(new Array(numColumns));

			for (var j = 0 ; j < numColumns; j++){
				this.data[i][j] = data[k];
				k++;
			}
		}		
	}	
}

/*
*	Adiciona um array de valores como a última coluna da matriz
*
*	@param {Array} values 
*
*/

Matrix.prototype.addColumn = function(values){
	if(values.length != this.rows && this.rows != undefined ){
		throw new Exception("Error - This column doesn't have the same amount of rows as the original matrix.");
	}

	if(this.columns == undefined){
		this.columns = 1;
	}
	else{
		this.columns++;
	}

	if(this.rows == undefined){
		this.rows = values.length;
		for(var i = 0; i < this.rows ; i++){
			this.data.push([]);
		}
	}

	var rowLimit = (this.rows == undefined )? values.length : this.rows;
	for(var i = 0; i < rowLimit; i++){
		this.data[i][this.columns-1] = values[i];
	}
};

/*
*	Adiciona um array de valores como a última linha da matriz
*
*	@param {Array} values 
*
*/
Matrix.prototype.addRow = function(values){
	if(values.length != this.columns && this.columns != undefined){
		throw new Exception("Error - This row doesn't have the same amount of columns as the original matrix.");
	}

	if(this.rows == undefined){
		this.rows = 1
	}
	else{
		this.rows++;
	}  

	if(this.columns == undefined ){
		this.columns = values.length
	};

	var columnLimit = (this.columns == undefined)? values.length : this.columns;
	this.data.push([]);
	for(var i = 0; i < columnLimit; i++){
		this.data[this.rows-1][i] = values[i];
	}
};

/*
*	Adiciona a coluna indicada pelo index 'columnIndex' de 'matrixSource' como a ultima coluna
*
*	@param {Object} matrixSource
*	@param {Number} columnIndex
*
*/
Matrix.prototype.addColumnFromMatrix= function(matrixSource, columnIndex){
	if(matrixSource.rows != this.rows && this.rows != undefined ){
		throw new Exception(" Error - Cannot copy column. Number of rows is different.");
	}

	if(this.columns == undefined){
		this.columns = 1;
	}
	else{
		this.columns++;
	}

	if(this.rows == undefined){
		this.rows = matrixSource.rows;
		for(var i = 0; i < this.rows ; i++){
			this.data.push([]);
		}
	}

	for(var i = 0; i < matrixSource.rows; i++){
		this.data[i][this.columns -1] = matrixSource.data[i][columnIndex];
	}
};

/*
*	Remove a coluna da matriz no indice indicado 
*
*	@param {Number} columnIndex  - indice da coluna que sera removida
*
*/
Matrix.prototype.removeColumn = function(columnIndex){
	if(this.columns == undefined || this.columns -1 < columnIndex){
		throw new Exception("There's no such column to be removed.");
	}

	var retMatrix = new Matrix();
	for(var i = 0 ; i < this.columns ; i++){
		if(i == columnIndex){
			continue;
		}
		retMatrix.addColumnFromMatrix(this, i)
	}
	
	this.data = retMatrix.data;
	this.rows = retMatrix.rows;
	this.columns = retMatrix.columns;
};

/*
*	Verifica se todos os valores da coluna indicada sao zero. 
*
*	@param {Number} columnIndex - indice da coluna que sera verificada
*
*	@returns {Bool} - true se todos os valores da coluna sao zero
*/
Matrix.prototype.isColumnZero= function(columnIndex){
	if(this.columns == undefined || this.columns -1 < columnIndex){
		throw new Exception("There's no such column to be removed.");
	}

	var sum = 0;
	for(var i = 0; i < this.rows; i++){
		sum += Math.abs(this.data[i][columnIndex]);
	}

	return (sum == 0)? true : false;	
};

/*
*	Retorna o indice da primeira ocorrencia de uma coluna que é multipla do indice da coluna dada
*
*	@param {Number} columnIndex
*
*	@return {Number} - numero da proxima coluna que é multiplo da coluna base. 
*	Caso nao exista, e retornado o valor -1
*/
Matrix.prototype.firstMultipleOfColumn= function(columnIndex){
	if(columnIndex > this.columns - 1){
		throw new Exception("There's no such column.");	
	}
	if(this.columns == undefined || this.columns == 0){
		return -1;
	}

	var prevScale, currScale, equal;
	for(var k = columnIndex+1 ; k < this.columns; k++ ){
		for(var i = 0; i < this.rows; i++){

			prevScale  = this.data[i][k]/this.data[i][columnIndex];

			if(this.data[i][columnIndex] == 0 || prevScale == undefined || (this.data[i][k] == 0 && this.data[i][columnIndex] == 0) ){ 
				continue;
			}
			else{
				break;
			}
		}	

		
		//equal = false;
		
		for(var p = i+1; p < this.rows; p++ ){
			currScale = this.data[p][k]/this.data[p][columnIndex];
			if ( (this.data[p][columnIndex] == 0 && this.data[p][k] != 0) || (prevScale != currScale && !isNaN(currScale) && currScale != undefined)) {
				//equal = false;
				break;
			}		
		}

		if(prevScale == currScale){
			//equal = true;
			return k;
		}

		/*
		if(equal){
			
		}
		*/
	} 
	return -1;
}

var consoleMatrix = function(matrix){
	console.table(matrix.data);
}

var HtmlMatrix = function(matrix){

	var htmlTable = $("<table></table>");
	var tbody = $("<tbody></tbody>")
	var row = $("<tr></tr>");
	var cell = $("<td></td>");
	
	for(var i = 0 ; i < matrix.rows ; i++){
		var newRow = row.clone();
		for (var j = 0 ; j < matrix.columns ; j++){
			newRow.append(cell.clone().text(matrix.data[i][j].toFixed(5)));
		}
		tbody.append(newRow);
	}

	htmlTable.append(tbody);
	//console.log(htmlTable.prop('outerHTML'));
	return htmlTable.prop('outerHTML');
}

var HtmlArray = function(array){

	var htmlTable = $("<table></table>");
	var tbody = $("<tbody></tbody>")
	var row = $("<tr></tr>");
	var cell = $("<td></td>");

	var newRow = row.clone();			
	for(var i = 0 ; i < array.length ; i++){
		newRow.append(cell.clone().text(array[i].toFixed(5)));
	}
	tbody.append(newRow);

	htmlTable.append(tbody);
	//console.log(htmlTable.prop('outerHTML'));
	return htmlTable.prop('outerHTML');
}
