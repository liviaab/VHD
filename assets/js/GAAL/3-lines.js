//	A altura do triângulo equilátero de lado = 1 é a distância total de um vértice ao ponto da altura, que é sqrt(3)/2

/*
	Pontos de altura:
*/

var _PointXHeight = new Point(1/4, Math.sqrt(3)/4);
var _PointYHeight = new Point(3/4, Math.sqrt(3)/4);
var _PointZHeight = new Point(1/2, 0);
var _TriangleHeight = Math.sqrt(3)/2 ;

/*
	barycentric lines
	Line1: 	x = 1/2
	Line2: 	y = sqrt(3)/3 x
	Line3: 	y = - sqrt(3)/3 x +  sqrt(3)/3
		  	y =  sqrt(3)/3 * (-x + 1)
*/

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

/*
	Projeção de um ponto 2D qualquer nas retas baricêntricas
*/

var pointProjectionLine1 = function(x, y){
	return new Point(1/2, y);
}

var pointProjectionLine2 = function(x, y){
	var b = y - (_acp2* x );
	
	//perpendicularToLine2 = _acp2 * x2 + b;

	//a projeção de (x,y) em line2 é onde as duas retas (line2 e perpendicularToLine2) se encontram 
	// Math.sqrt(3)/3 * x2 = -Math.sqrt(3) * x2 + b;
	// x = sqrt(3)/4 * b

	var x2 = sqrt(3)/4 * b;
	var y2 = line2(x2);

	return new Point(x2, y2);
}  

var pointProjectionLine3 = function(x, y){
	var b = y - (_acp3 * x);
	
	//perpendicularToLine3 = _acp3 * x2 + b;

	//a projeção de (x,y) em line3:
	// - Math.sqrt(3)/3 * ( - x2 + 1 ) = Math.sqrt(3) * x2 + b;
	// x = ( sqrt(3) - 3 * b) / ( 3 * sqrt(3) + 1)

	var x2 = ( Math.sqrt(3) - 3 * b) / ( 3 * Math.sqrt(3) + 1)
	var y2 = line3(x2);

	return new  Point(x2, y2);
} 

/*
	Proporção entre um ponto na reta e a altura do triangulo
*/
var proportionToX = function( projectedPoint ){

	var distance = projectedPoint.Distance(_PointXHeight);

	return distance / ( _TriangleHeight );
}

var proportionToY = function( projectedPoint ){

	var distance = projectedPoint.Distance(_PointYHeight);

	return distance / ( _TriangleHeight );
}

var proportionToZ = function( projectedPoint ){

	var distance = projectedPoint.Distance(_PointZHeight);

	return distance / ( _TriangleHeight);
}

