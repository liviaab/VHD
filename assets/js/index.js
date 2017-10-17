$("#num-Inputs").keypress(function(e){
    var keyCode = e.keyCode == 13 || e.which == 13;    
    if(keyCode && !emptyTextBox()){
        var numInputs = $("#num-Inputs").val();
        var numOutputs = $("#num-Outputs").val();
        setValues(numInputs, numOutputs);
    }
});

$("#num-Outputs").keypress(function(e){
    var keyCode = e.keyCode == 13 || e.which == 13;    
    if(keyCode && !emptyTextBox()){
        var numInputs = $("#num-Inputs").val();
        var numOutputs = $("#num-Outputs").val();
        setValues(numInputs, numOutputs);
    }                      
});

$("#btn-set-values").click(function(){
    if(!emptyTextBox()){
        var numInputs = $("#num-Inputs").val();
        var numOutputs = $("#num-Outputs").val();
        setValues(numInputs, numOutputs);
    } 
});

var emptyTextBox = function(){
    return $("#num-Inputs").val() == "" || $("#num-Outputs").val() == "";
}

var setValues = function(numInputs, numOutputs){
    addPriorVector(numInputs);
    addChannelMatrix(numInputs, numOutputs);
    addButtons();
    
    $("#btn-go").show();
    $("#btn-clear").show();
}

var addPriorVector = function(numInputs){
    var inputTextField = '<input type="text" class="form-control" placeholder="">';
    var tableHeadBegin = '<thead><tr>';
    var tableHeadEnd = '</tr></thead>';
    var tableHeadInner = '';
    for(var i = 0; i < numInputs ; i++ ){
        tableHeadInner += '<th>x'+ i.toString() + '</th>';
    }
    var tableBody = "<tbody><tr>";
    for(var i = 0 ; i < numInputs ; i++){
        tableBody += '<td>' + inputTextField + '</td>';
    }    
    tableBody += "</tr></tbody>";

    $(".prior-distr-values").html(tableHeadBegin + tableHeadEnd + tableHeadInner + tableBody);    
}

var addChannelMatrix = function(numInputs, numOutputs){
    var inputTextField = '<input type="text" class="form-control" placeholder="">';
    var tableHeadBegin = '<thead><tr>';
    var tableHeadEnd = '</tr></thead>';
    var tableHeadInner = '';
    for(var i = 0; i < numOutputs ; i++ ){
        tableHeadInner += '<th>y'+ i.toString() + '</th>';
    }
                            
    var tableBody = "<tbody>";
    for(var i = 0; i < numInputs ; i++){
        tableBody += '<tr>';
        for(var j = 0; j < numOutputs ; j++){
            if(j == 0){
                tableBody += 'x' + i.toString();
            }
            tableBody += '<td>' + inputTextField + '</td>';
        }
        tableBody += '</tr>';
    }
    
    tableBody += "</tbody>";
    $(".channel-distr-values").html(tableHeadBegin + tableHeadEnd + tableHeadInner + tableBody);    
}

var addButtons = function(){
    $('.channel-distr-values').append('<button type="submit" id="btn-go" class="btn btn-default">Go</button>');
    $('.channel-distr-values').append('<button type="submit" id="btn-clear" class="btn btn-default">Clear</button>');    
}

$(".channel-distr-values").on("click","#btn-go", function(){
     alert("Fazer calculos!");
} );

$(".channel-distr-values").on("click","#btn-clear", function(){
    addPriorVector(0);
    addChannelMatrix(0,0);
    $(this).hide();
    $("#btn-go").hide();
} );

/*
$("#btn-go").click(function(){
    alert("Fazer calculos!");
});


$("#btn-clear").click(function(){
    addPriorVector(0);
    addChannelMatrix(0,0);
    $(this).hide();
    $("#btn-go").hide();
});
*/


$(document).ready(function(){
    
});