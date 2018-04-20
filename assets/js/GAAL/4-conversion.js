
/*		
	3D to 2d point 
*/ 

var transform3Dto2Dpoint = function(x, y, z){
	//Projeção na reta baricentrica z
	var pointC = new Point(_PointZHeight.x, z);
	var pointB, finalPoint;

	// y = distancia de _PointYHeight até o ponto B;
	// y * y = (_PointYHeight.x - Bx)² + (_PointYHeight.y - By)²
	// mas By = Math.sqrt(3)/3 * Bx, entao
	// y * y = (_PointYHeight.x - Bx)² + (_PointYHeight.y - Math.sqrt(3)/3 * Bx)²

	var firstTermCoefficients = get2ndBinomialCoefficients(_PointYHeight.x , -1);
	var secondTermCoefficients = get2ndBinomialCoefficients(_PointYHeight.y , -Math.sqrt(3)/3);

	var sumIntegers = firstTermCoefficients[0] + secondTermCoefficients[0] - y * y;
	var sum1stDegree = firstTermCoefficients[1] + secondTermCoefficients[1];
	var sum2ndDegree = firstTermCoefficients[2] + secondTermCoefficients[2] ;

	var roots = solveQuadratic(sum2ndDegree, sum1stDegree, sumIntegers);
	var chosenRoot = null;

	if((roots[0] > _verticeX.x || roots[0] < _verticeY.x) && (roots[1] > _verticeX.x || roots[1] < _verticeY.x)){
		//ambas fora do triangulo
		throw new "No suitable roots"
	}
	else if((roots[0] <= _verticeX.x && roots[0] >= _verticeY.x) && (roots[1] <= _verticeX.x && roots[1] >= _verticeY.x)){
		//ambas dentro do triangulo
		//melhorar e checar verificação
		if( line2(roots[0]) >= _verticeY.y &&  line2(roots[0]) <= _verticeZ.y){
			chosenRoot = roots[0];
		}
		else{
			chosenRoot = roots[1];
		}
	}
	else if(roots[0] > _verticeX.x || roots[0] < _verticeY.x){
		chosenRoot = roots[1];
	}
	else if(roots[1] > _verticeX.x || roots[1] < _verticeY.x){
		chosenRoot = roots[0];
	}

	pointB = new Point(chosenRoot, line2(chosenRoot) );

	if(pointB.x != pointC.x || pointB.y != pointC.y ){
		//calcular interesção das retas;
	}
	else{
		finalPoint = new Point(pointB.x, pointB.y);
	}


	return finalPoint;
	

}
