var xuxa = new Matrix(2, 2, [1,2,2,1]);
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
console.log(matrix.firstColumnMultiple(0));
console.log(matrix.firstColumnMultiple(1));
console.log(matrix.firstColumnMultiple(2));
console.log(matrix.firstColumnMultiple(3));
//console.log(matrix.firstColumnMultiple(4));






