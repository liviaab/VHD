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
    alert("Fazer calculos!");

    // var array = [];

    // $('.prior-distr-values table tr').each(function() {

    //     //var values = [];

    //     $(this).find(" td input").each(function(){
    //          array.push( $(this).val());
    //     });

        
    //     console.log(array);
    // });

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

/* 
    Methods
*/

var setValues = function(){    
    var temp1, temp2;
    priorValues = $("#prior-values").tagsinput('items');
    var priorValues_decimal = [];
    // validate entries
    for (var i = 0; i < priorValues.length ; i++) {
        temp1 = priorValues[i].split('/');

        if(temp1.length > 2){
            alert("Invalid value '"+ priorValues[i] + "' is NaN");
            $("#prior-values").tagsinput('removeAll');   
            return;
        }
        else if(temp1.length == 2){
            temp2 = Number(temp1[0])/Number(temp1[1]);
        }
        else{
            temp2 = Number(temp1[0]);
        }

        if (isNaN(temp2)){
            alert("The value '"+ priorValues[i] + "' is NaN"); 
            //throw new Exception("The value at index "+ key + " is NaN");      
            $("#prior-values").tagsinput('removeAll');  
            return;     
        }
        priorValues_decimal.push(temp2);
    }
    priorValues = priorValues_decimal;
    console.log(priorValues);
    addChannelMatrix();
    addButtons();
    
    $("#btn-go").show();
    $("#btn-clear").show();
}


var addChannelMatrix = function(numInputs, numOutputs){
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
$(document).ready(function(){

configureInputs();

});