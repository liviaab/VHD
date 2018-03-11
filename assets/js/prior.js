
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
    var temp1, temp2;
    
    priorValues = getNumericValues( $("#prior-values").tagsinput('items'));
    if(priorValues == null){
        $("#prior-values").tagsinput('removeAll');  
    }
    
    addChannelMatrix();
    addButtons();    

    return priorValues;
}

var getNumericValues = function(array){
    var ret = [];
     for (var i = 0; i < array.length ; i++) {
        temp1 = array[i].split('/');

        if(temp1.length > 2){
            alert("Invalid value '"+ array[i] + "' is NaN");
            //$("#prior-values").tagsinput('removeAll');   
            return null;
        }
        else if(temp1.length == 2){
            temp2 = Number(temp1[0])/Number(temp1[1]);
        }
        else{
            temp2 = Number(temp1[0]);
        }

        if (isNaN(temp2)){
            alert("The value '"+ array[i] + "' is NaN"); 
            //throw new Exception("The value at index "+ key + " is NaN");      
            //$("#prior-values").tagsinput('removeAll');  
            return null;     
        }
        ret.push(temp2);
    }
    return ret;
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