/*
	Linear transformation:
	α = √2 / 2 * (2 * x + y)
	β = √6 / 2 * y


*/

var point3Dto2D = function (array) {
	var x = array[0];
	var y = array[1];
	var z = array[2];

	var alpha = Math.sqrt(2) / 2 * ( 2 * x + y);
	var beta = Math.sqrt(6) / 2 * y

	var point2D = {}
	point2D.alpha = alpha;
	point2D.beta = beta;
	
	return point2D;
}

var point2Dto3D = function (array) {
	var alpha = array[0];
	var beta = array[1];

	var y = 2 * beta / Math.sqrt(6);
	var x = (alpha - Math.sqrt(2)/2 * y ) / Math.sqrt(2);
	var z = 1 - x - y;

	point3D = {};
	point3D.x = x;
	point3D.y = y;
	point3D.z = z;

	return point3D;

}

var matrixPoints3Dto2D = function(matrix){
	var retArray = [];
	for(j = 0; j < matrix.columns ; j++){
		var pointArray = [];
		for(i = 0; i < matrix.rows ; i++){
			pointArray.push(matrix.data[i][j]);
		}

		var point2D = point3Dto2D(pointArray);
		retArray.push(point2D);
	}

	return retArray;
}

/*
var point2DToChartData = function(point){
	var retObject = {};

	retObject = {                    
                    //name: 'Limits',
                    marker: {
                        enabled: true,
                        //symbol: 'circle',
                    },
                    data: [ [point.alpha, point.beta]]
                }

    return retObject;
}
*/

var arrayPoint2DToChartData = function(array, outputDistribution, isPrior){
	console.log(array);
	// [{point.alpha, point.beta}, {point.alpha, point.beta} , {point.alpha, point.beta} ]
	var retObject = {};
	var retData  = [];

	array.forEach( function(element, index) {
		//var item = [element.alpha, element.beta];
		
		var item = {};

		item.x = element.alpha; 
		item.y = element.beta;
		item.name = (isPrior)? 'Prior':'Output '+ index.toString();
		item.p = (isPrior)? getPriorRadius(outputDistribution) : mapRadius(outputDistribution[index]);
		item.marker= {	radius: item.p
						//fillColor: '#663300' 
					};
		
		retData.push( item );
	});

	retObject = {                    
                    //name: (array.length == 1)? 'Prior': 'Output',
                    marker: {
                        enabled: true,
                        //symbol: 'circle',
                    },
                    data: retData
                }

    return retData;

}
