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
    priorValues = $("#prior-values").tagsinput('items').map(Number);

    // validate entries
    for (var i = 0; i < priorValues.length ; i++) {
        if (isNaN(priorValues[i])){
            alert("The value at index "+ i + " is NaN"); 
            //throw new Exception("The value at index "+ key + " is NaN");      
            $("#prior-values").tagsinput('removeAll');  
            return;     
        }
    }
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