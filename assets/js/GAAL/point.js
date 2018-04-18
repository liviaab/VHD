function Point(x, y){
	this.x = x;
	this.y = y;
}


Point.prototype.Distance = function( point ){
	return Math.srqt( (point.x - this.x) + (point.y - this.y) );
};

