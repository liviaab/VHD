/*
var _PointXHeight = new Point(1/4, Math.sqrt(3)/4);
var _PointYHeight = new Point(3/4, Math.sqrt(3)/4);
var _PointZHeight = new Point(1/2, 0);
var _TriangleHeight = Math.sqrt(3)/2 ;
*/


/*		
	3D to 2d point 
*/ 

var transform3Dto2Dpoint = function(x, y, z){
	var distanceXtoXHeight = _TriangleHeight * ( 1 - x);
	var distanceYtoYHeight = _TriangleHeight * ( 1 - y);
	var distanceZtoZHeight = _TriangleHeight * ( 1 - z);

	/* 
		Igualando a distância à formula de distância entre dois pontos.
		distancia = raiz( ( x - v1x)² + (y - v1y)² ) 
		-> elevando os dois lados ao quadrado
		-> substituindo y pela equação da reta
	*/

	// reta baricentrica: y = raiz(3)/3 (-x + 1)
	// distanceXtoXHeight = raiz( ( x - 1)² + (y - 0)² ) 
	// distanceXtoXHeight = raiz( ( x - 1)² + ( - raiz(3)/3 * x +  raiz(3)/3 ))² ) 

	var binomial1 = get2ndBinomialCoefficients(1, -1);
	var binomial2 = get2ndBinomialCoefficients(- Math.sqrt(3)/3, Math.sqrt(3)/3 );
	// coeficientes da equação de segundo grau:
	var a = binomial1[0] + binomial2[0];
	var b = binomial1[1] + binomial2[1];
	var c = binomial1[2] + binomial2[2] - Math.pow(distanceXtoXHeight, 2);

	var roots = solveQuadratic(a, b, c);
	var chosenRoot1;

	if(roots.length == 0){
		throw new "No real roots";
	}
	else if(roots[0] >= _PointXHeight.x && roots[0] <= 1  && roots[1] >= _PointXHeight.x && roots[1] <= 1){
		if( line3( roots[0]) <= _PointXHeight.y && line3( roots[0]) > 0){
			chosenRoot1 = roots[0];	
		}
		else if(line3( roots[1]) <= _PointXHeight.y && line3( roots[1]) > 0){
			chosenRoot1 = roots[1];
		}
		else{
			throw  new "None of the cases";
		}
	}
	else if( roots[0] >= _PointXHeight.x && roots[0] <= 1){
		chosenRoot1 = roots[0];	
	}
	else if( roots[1] >= _PointXHeight.x && roots[1] <= 1){
		chosenRoot1 = roots[1];
	}
	else{
		throw  new "None of the cases";
	}



	
}