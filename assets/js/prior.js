
/*
    Validations
*/
var emptyTextBox = function(){
    return $("#prior-values").tagsinput('items').length == 0 ;
}

/* 
    Methods
*/

var configureInputs = function(){
    $("input").tagsinput({
        allowDuplicates: true,
        confirmKeys: [13, 32, 44], //enter, space, comma 
        delimiter: ','
    });    
}

var setValues = function(){    
    priorAsNumbers = [];
    $("#prior-values").tagsinput('items').forEach(element =>{ priorAsNumbers.push(math.eval(element.trim()));});
    setPrior( priorAsNumbers);
    
    if(getPrior() == null){
        $("#prior-values").tagsinput('removeAll');  
    }  
}

Array.prototype.first = function () {
    return this[0];
};

Array.prototype.second = function () {
    return this[1];
};

Array.prototype.third = function () {
    return this[2];
};