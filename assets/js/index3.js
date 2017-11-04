/*
    Global Variables 
*/

var priorValues = []
var channelMatrix = []

/*
    Events
*/
$("#btn-set-values").click(function(){
    if(!emptyTextBox()){
        setValues();
    } 
});

$(".channel-values").on("click","#btn-go", function(){
    getChannelMatrixValues();
    checkElementsChannelMatrix();
});

$(".channel-values").on("click","#btn-clear", function(){
    $('#prior-values').tagsinput('removeAll');
    $('.channel-values').html('');
    $(this).hide();
    $("#btn-go").hide();
} );

/*
    Validations
*/
var emptyTextBox = function(){
    return $("#prior-values").tagsinput('items').length == 0 ;
}

var checkElementsChannelMatrix = function(){
    if(channelMatrix.length%priorValues.length != 0 ){
        alert("There are different quantities of output numbers in the channel matrix");
        //throw new Exception("There are different quantities of output numbers in the channel matrix");      
        return false;
    }
    return true;
}

/* 
    Methods
*/

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

var setValues = function(){    
    var temp1, temp2;
    
    priorValues = getNumericValues( $("#prior-values").tagsinput('items'));
    if(priorValues == null){
        $("#prior-values").tagsinput('removeAll');  
    }
    console.log(priorValues);
    addChannelMatrix();
    addButtons();
    
    $("#btn-go").show();
    $("#btn-clear").show();
    return priorValues;
}

var addChannelMatrix = function(){
    $('.channel-values').html('');
    for(var i =0 ; i < priorValues.length ; i++){
        var input = document.createElement('input');
        $('.channel-values').append(input);
        $(input).tagsinput({
            allowDuplicates: true,
            confirmKeys: [13, 32, 44], //enter, space, comma 
            delimiter: ','
        });
    }
}

var addButtons = function(){
    $('.channel-values').append('<button type="submit" id="btn-go" class="btn btn-default">Go</button><span>');
    $('.channel-values').append('<button type="submit" id="btn-clear" class="btn btn-default">Clear</button>');    
}

var configureInputs = function(){
    $("input").tagsinput({
        allowDuplicates: true,
        confirmKeys: [13, 32, 44], //enter, space, comma 
        delimiter: ','
    });
}

var getChannelMatrixValues = function(){
    channelMatrix = [];
    var temp = [];
    $('.channel-values').children('input').each(function () {
        temp = getNumericValues($(this).tagsinput('items'));
        if(temp == null){
            $(this).tagsinput('removeAll');
        }else{
            for(var i = 0; i < temp.length; i++ ){
                channelMatrix.push(temp[i]);      
            }           
        }
    });
    console.log(channelMatrix);
    return channelMatrix;
}


var getPriorValues = function(){
    return priorValues;
}

var getChannelMatrix = function(){
    return channelMatrix;
}

$(document).ready(function(){
    configureInputs();
});