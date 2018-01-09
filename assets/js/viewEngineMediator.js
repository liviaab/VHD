/*
	Validations
*/

var check3DVisualization = function(array){
	if(array.length != 3){
		// console.log("3D visualization is not available");
		alert("3D visualization is not available");
		// throw new Exception("3D visualization is not available");
	}
}

/*
	Methods
*/

//retorna um inteiro para ser o raio do ponto da saida do canal a ser representado no grafico 3d. Mapeia de 0 a 10 
var mapRadius = function(radius){
	var r = radius * 10;
	if(r == 0 && radius > 0){
		r = 1;
	}
	return r;
}

var getPriorRadius = function(outputDistribution){
	var sum = 0;
	for(var i = 0; i < outputDistribution.length; i++){
		sum += mapRadius(outputDistribution[i]);
	}
	return sum;
}

var matrixTo3DData = function(matrix, weights, serieName ){
	var retData = [];
	for(j = 0; j < matrix.columns; j++){		
		var temp = {};
		
		temp.name = 'y'+ (j+1).toString();
		temp.x = matrix.data[0][j];
		temp.y = matrix.data[1][j];
		temp.z = matrix.data[2][j];
		temp.p = weights[j];
		temp.marker= {	radius: mapRadius(weights[j]),
						//fillColor: '#663300' 
					};
	 

		retData.push(temp);
	}

	retData = {data: retData, name: serieName };
	return retData;

}

var priorTo3DData = function(array, radius, serieName){
	if(array.length > 3){
		// console.log("3D visualization is not available");
		alert("3D visualization is not available");
		// throw new Exception("3D visualization is not available");
	}

	var retData = [], temp = {};

	temp.name = 'π';
	temp.x = array[0];
	temp.y = array[1];
	temp.z = array[2];
	temp.p = 1;
	temp.marker= {	radius: radius, 
					symbol: 'circle',
					//fillColor: '#6666FF'
				};
	retData.push(temp);

	var retData = {data: retData, name: serieName };
	return retData;
}

var drawDefaultChart = function(priorDistribution, marginalDistribution, hyperDistribution ){

	var outputSerie = matrixTo3DData(hyperDistribution, marginalDistribution, "Output");
	var priorSerie =priorTo3DData(priorDistribution, getPriorRadius(marginalDistribution), "Prior");
	drawDefault( outputSerie, priorSerie);
}