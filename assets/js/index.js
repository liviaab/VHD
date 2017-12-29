/*
    Global Variables 
*/

var priorValues = []
var channelMatrix = []
var numEntries = 0;
var numOutputs = 0;

/*
    Getters
*/

var getPriorValues = function(){
    return priorValues;
}

var getChannelMatrix = function(){
    return new Matrix(numEntries, numOutputs, channelMatrix);
}

var getNumEntries = function(){
    return numEntries;
}

var getNumOutputs = function(){
    return numOutputs;
}

/*
    Events
*/
$(document).ready(function(){
    configureInputs();

    $("#btn-set-values").click(function(){
        if(!emptyTextBox()){
            setValues();
        } 
    });

    $(".channel-values").on("click","#btn-Visualize", function(){
        getChannelMatrixValues();
        if(checkElementsChannelMatrix()){
            var joint = getJointDistribution(getPriorValues(), getChannelMatrix());
            // console.log("joint:"); 
            // printMatrix(joint);

            var marginalY = getMarginalDistributionColumns(joint);
            // console.log('marginal:', marginalY)

            var posterior = getPosteriorDistribution(joint, marginalY)
            // console.log('posterior:')
            // printMatrix(posterior.matrix);

            var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
            // console.log('hyper:');
            // printMatrix(hyper.matrix)
            setChartParameters(getPriorValues(),marginalY, hyper.matrix);
            //drawChart();         
        }   
    });

    $(".channel-values").on("click","#btn-clear", function(){
        $('#prior-values').tagsinput('removeAll');
        $('#channel-values-title').html('');
        $('.channel-values').html('');
        $(this).hide();
        $("#btn-Visualize").hide();
        $('#container').html('');
    } );
});

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

    if(channelMatrix.length != numEntries* numOutputs){
        alert("Missing entries in the channel matrix");
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
    //console.log(priorValues);
    addChannelMatrix();
    addButtons();
    
    $("#btn-Visualize").show();
    $("#btn-clear").show();
    return priorValues;
}

var addChannelMatrix = function(){
    $('#channel-values-title').html('Channel Matrix');
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
    $('.channel-values').append('<button type="submit" id="btn-Visualize" class="btn btn-default">Visualize</button><span>');
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
    numEntries = 0;
    numOutputs = 0;
    var temp = [];
    
    $('.channel-values').children('input').each(function () {
        temp = getNumericValues($(this).tagsinput('items'));
        if(temp == null){
            $(this).tagsinput('removeAll');
        }else{
            for(var i = 0; i < temp.length; i++ ){
                channelMatrix.push(temp[i]);      
            }   
            numOutputs = temp.length;  
        }
        numEntries++;
    });
    //console.log(channelMatrix);
    return channelMatrix;
}

