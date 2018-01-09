/*
	Globals
*/

var _jointDistribution = [];


var getJoint = function(){
	return _jointDistribution;
}

var setJoint = function(matrix){
	_jointDistribution = matrix;
}


/*
	Methods
*/
var getJointDistribution = function(priorProbability, channelMatrix){
	var jointMatrix = new Matrix();
	var row;
	//multiply each row x of C by the prior probability

	for(var j = 0; j < channelMatrix.columns ; j++){
		row = [];
		for(var i = 0; i < channelMatrix.rows ; i++){
			row.push(priorProbability[i] * channelMatrix.data[i][j]);
		}	
		jointMatrix.addColumn(row);
	}

	_priorDistribution = priorProbability;
	_channelMatrix = channelMatrix;
	_jointDistribution = jointMatrix;
	return jointMatrix;
}