var teste = function(){
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
}