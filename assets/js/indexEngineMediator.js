/*var teste = function(){
	console.log('Teste 2');
	var prior = getPriorValues();
	var channelMatrix = getChannelMatrix();
	var channel = new Matrix(getNumEntries(), getNumOutputs(), channelMatrix);

	console.log(prior);
	console.log(channelMatrix);
	console.log(channel);

	var joint = getJointDistribution(prior, channel);
	console.log("joint:", joint);  

	var marginalY = getMarginalDistributionColumns(joint);
	console.log('marginal:', marginalY)

	var posterior = getPosteriorDistribution(joint, marginalY)
	console.log('posterior:', posterior)

	var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
	console.log('hyper:', hyper);
}*/

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

//retorna um inteiro para ser o raio. Mapeia de 0 a 10 
var mapRadius = function(radius){
	return parseInt(radius * 10);
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
		console.log('raio '+name+': ', mapRadius(weights[j]));
		temp.marker= {radius: mapRadius(weights[j])};

		retData.push(temp);
	}

	retData = {data: retData, name: serieName };
	console.log('retdata NOVO:', retData);
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
	temp.marker= {radius: radius, symbol: 'circle'};
	retData.push(temp);

	var retData = {data: retData, name: serieName };
	console.log('retdata:', retData);
	return retData;
}