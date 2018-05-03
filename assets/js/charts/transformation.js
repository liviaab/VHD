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