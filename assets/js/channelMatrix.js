
/*
    Validations
*/

var checkElementsChannelMatrix = function(){

    if(channelMatrix.length%getPrior().length != 0 ){
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

var addChannelMatrix = function(){
    $('#channel-values-title').html('<b>Channel Matrix</b>');
    $('.channel-values').html('');
    for(var i =0 ; i < getPrior().length ; i++){
        var input = document.createElement('input');
        input.setAttribute("method", "post");
        input.setAttribute("data-role", "tags-input");

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
    $("#btn-Visualize").show();
    $("#btn-clear").show();
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

