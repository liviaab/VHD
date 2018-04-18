function FristDegreeEquation(angularCoefficient, b){
	this.a = angularCoefficient;
	this.b = b;
}


Point.prototype.Result = function( x ){
	return this.a * x + this.b;
};


Point.prototype.LinesIntersection = function( acoef2, b2){
	//this.a * x + this.b = acoe2f * x + b2

	var x = (b2 - this.b) / ( this.a - acoef2)
	var y = this.Result(x);

	return new Point(x, y);
};


var solveQuadratic = function(a, b, c){
	var delta = b * b - 4 * a* c
	
	if(delta < 0 ){
		throw new "No real roots.";
	}

	var x1 = (-b + Math.sqrt(delta) )/ 2 * a;
	var x2 = (-b - Math.sqrt(delta) )/ 2 * a;

	return new Array(x1, x2);
}

var get2ndBinomialCoefficients = function(a, b){
	return new Array( a * a, 2 * a * b, b * b );
}