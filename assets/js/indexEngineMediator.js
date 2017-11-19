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

var matrixTo3DData = function(matrix, serieName){
	var retData = [];

	for(j = 0; j < matrix.columns; j++){
		var name = 'y'+ (j+1).toString();
		var temp = [name] ;

		for(i = 0; i < matrix.rows; i++){
			temp.push(matrix.data[i][j]);
		}
		retData.push(temp);
	}

	retData = {data: retData, name: serieName };
	console.log('retdata:', retData);
	return retData;
}

var priorTo3DData = function(array, serieName){
	if(array.length > 3){
		// console.log("3D visualization is not available");
		alert("3D visualization is not available");
		// throw new Exception("3D visualization is not available");
	}

	var name = 'π';
	var retData = [], temp = [];

	temp.push(name);
	for(var i = 0; i < array.length ; i++ ){
		temp.push(array[i]);
	}
	retData.push(temp);

	var retData = {data: retData, name: serieName };
	console.log('retdata:', retData);
	return retData;
}