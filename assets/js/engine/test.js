/*var xuxa = new Matrix(2, 2, [1,2,2,1]);
console.log('xuxa:',xuxa);

var mcol = new Matrix()
mcol.addColumn([1,3,5]);
mcol.addColumn([1,3,2]);
//mcol.addColumn([0,8]);
mcol.addRow([9,9]);
//mcol.addRow([9,9,11]);
console.log('mcol:', mcol)


var matrix = new Matrix();
matrix.addRow([1, 2])
matrix.addRow([2, 1])
//matrix.addColumn([0, 0, 0])
matrix.addColumn([0, 0])
matrix.addColumnFromMatrix(xuxa, 1);
matrix.addColumnFromMatrix(xuxa, 0);
console.log('matriz:', matrix);
//matrix.removeColumn(5);
matrix.removeColumn(2);
console.log('matriz:', matrix);
console.log(matrix.firstMultipleOfColumn(0));
console.log(matrix.firstMultipleOfColumn(1));
console.log(matrix.firstMultipleOfColumn(2));
console.log(matrix.firstMultipleOfColumn(3));
//console.log(matrix.firstColumnMultiple(4));
*/
//------------------------------------------------------------------------------------
/*
console.log('Teste 1');
var channel = new Matrix( 3, 4, [1/2, 1/2, 0, 0, 0, 1/4, 1/2, 1/4, 1/2, 1/3, 1/6, 0]);
var prior = [1/4,1/2,1/4];

var joint = getJointDistribution(prior, channel);
console.log("joint:", joint); // ok 

var marginalY = getMarginalDistributionColumns(joint);
console.log('marginal:', marginalY)

var posterior = getPosteriorDistribution(joint, marginalY)
console.log('posterior:', posterior)

var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
console.log('hyper:', hyper);
*/

//------------------------------------------------------------------------------------

console.log('Teste 2');
var channel = new Matrix( 4, 4, [1/2,1/6,1/3,0,0,1/3,2/3,0,0,1/2,0,1/2,1/4,1/4,1/2,0]);
var prior = [1/3,1/3,0,1/3];

var joint = getJointDistribution(prior, channel);
console.log("joint:", joint); // ok 

var marginalY = getMarginalDistributionColumns(joint);
console.log('marginal:', marginalY)

var posterior = getPosteriorDistribution(joint, marginalY)
console.log('posterior:', posterior)

var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
console.log('hyper:', hyper);


//------------------------------------------------------------------------------------
/*
console.log('Teste 3');

var jointEnsenble = new Matrix( 4, 4, [1/8, 1/16, 1/32,1/32,1/16,1/8,1/32, 1/32, 1/16,1/16, 1/16, 1/16, 1/4, 0,0,0] );

var marginalX = getMarginalDistributionRows(jointEnsenble);
var marginalY = getMarginalDistributionColumns(jointEnsenble);
//console.log(jointEnsenble);
console.log('Distr marginal X:',marginalX);
console.log('Distr marginal Y:', marginalY);

var posterior = getPosteriorDistribution(jointEnsenble, marginalX);
console.log('posterior:', posterior)

var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
console.log('hyper:', hyper);

*/