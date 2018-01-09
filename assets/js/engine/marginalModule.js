/*
	Globals
*/

var _marginalDistribution = []


var getMarginal = function(){
	return _marginalDistribution;
}

var setMarginal = function(array){
	_marginalDistribution = matrix;
}


/*
	Methods
*/

var getMarginalDistributionColumns = function(jointMatrix){
	var marginalDistribution = [];

	for(var j = 0; j < jointMatrix.columns ; j++){
		var sum = 0;
		for(var i = 0; i < jointMatrix.rows ; i++){
			//multiply each row x of C by the prior prob. Px
			sum += jointMatrix.data[i][j]; 	
		}	
		marginalDistribution.push(sum);
	}
	_marginalDistribution = marginalDistribution;
	return marginalDistribution;
}

var getMarginalDistributionRows = function(jointMatrix){
	var marginalDistribution = [];

	for(var i = 0; i < jointMatrix.rows ; i++){
		var sum = 0;
		for(var j = 0; j < jointMatrix.columns ; j++){
			//multiply each row x of C by the prior prob. Px
			sum += jointMatrix.data[i][j]; 	
		}	
		marginalDistribution.push(sum);
	}
	_marginalDistribution = marginalDistribution;
	return marginalDistribution;
}