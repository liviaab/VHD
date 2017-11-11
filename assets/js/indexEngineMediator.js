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

var matrixTo3DData = function(matrix){
	var retData = [];

	for(j = 0; j < matrix.columns; j++){
		var temp = [] /*{
			name: 'y'+ (j+1).toString(),
			data: []
		}*/

		for(i = 0; i < matrix.rows; i++){
			temp.push(matrix.data[i][j]);
		}
		retData.push(temp);
	}
	
	console.log(retData);
	return retData;
}