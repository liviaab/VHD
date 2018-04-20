function FristDegreeEquation(angularCoefficient, b){
	this.a = angularCoefficient;
	this.b = b;
}


FristDegreeEquation.prototype.Result = function( x ){
	return this.a * x + this.b;
};


FristDegreeEquation.prototype.LinesIntersection = function( equation ){
	//this.a * x + this.b = a2 * x + b2

	var x = (equation.b - this.b) / ( this.a - equation.a)
	var y = this.Result(x);

	return new Point(x, y);
};


var solveQuadratic = function(a, b, c){
	var delta = b * b - 4 * a * c
	
	if(delta < 0 ){
		throw new "No real roots.";
		return null; 
	}

	var x1 = (-b + Math.sqrt(delta) )/ (2 * a);
	var x2 = (-b - Math.sqrt(delta) )/ (2 * a);

	return new Array(x1, x2);
}

var get2ndBinomialCoefficients = function(a, b){
	return new Array( a * a, 2 * a * b, b * b );
}


var getPerpendicularBCoefficient = function(mCoeff, point){
	// y = mCoeff * x + b
	// y - 
	var b = point.y - mCoeff * point.x
	return new FristDegreeEquation(mCoeff, b);
}