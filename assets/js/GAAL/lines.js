/*
	barycentric lines
	Line1: 	x = 1/2
	Line2: 	y = sqrt(3)/3 x
	Line3: 	y = - sqrt(3)/3 x +  sqrt(3)/3
		  	y =  sqrt(3)/3 * (-x + 1)
*/

// var line1 = function(x, y){
// 	// x = 1/2
// 	return y;
// }

var line2 = function(x){
	return  Math.sqrt(3)/3 * x
} 

var line3 = function(x){
	return Math.sqrt(3)/3 * ( -x + 1)
}

/*
	Angular coefficient of the perpendicular line
*/

//var _acp1 = y
var _acp2 = -Math.sqrt(3)
var _acp3 =  Math.sqrt(3)