/*
	Globals
*/

var _jointDistribution = [];


var getJoint = function(){
	return _jointDistribution;
}

var setJoint = function(matrix){	
	for(var i = 0; i < matrix.rows ; i++){
		_jointDistribution.push(matrix.data[i].slice());
	}
	_jointDistribution = {
		rows: matrix.rows, 
		columns: matrix.columns,
		data: _jointDistribution
	}
}


/*
	Methods
*/
var getJointDistribution = function(priorProbability, channelMatrix){
	var jointMatrix = new Matrix();
	var row;
	//multiply each row x of C by the prior probability

	for(var j = 0; j < getChannel().columns ; j++){
		row = [];
		for(var i = 0; i < getChannel().rows ; i++){
			row.push(priorProbability[i] * channelMatrix.data[i][j]);
		}	
		jointMatrix.addColumn(row);
	}

	/*
	_priorDistribution = priorProbability;
	_channelMatrix = channelMatrix;
	_jointDistribution = jointMatrix;
	
	
	setPrior(priorProbability);
	setChannel(channelMatrix);
	*/
	setJoint(jointMatrix);

	return jointMatrix;
}