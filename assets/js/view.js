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
            drawDefaultChart(getPriorValues(),marginalY, hyper.matrix);
            //drawChart();         
            showCalculations();
        }   
    });

    $(".channel-values").on("click","#btn-clear", function(){
        $('#prior-values').tagsinput('removeAll');
        $('#channel-values-title').html('');
        $('.channel-values').html('');
        $(this).hide();
        $("#btn-Visualize").hide();
        $('#chart-container').html('');
        $('#results').html('');
    });
});

/* 
    Methods
*/

var showCalculations = function(){
    $("#results").html('<div><p>Number of inputs: ' + numEntries + '<br>Number of Outputs: ' + numOutputs + '</p></div>');

    // $("#results").append('<div><p>Joint Distribution:' + getJoint().data + '</p></div>');

    // $("#results").append('<div><p>Posterior Distribution:' + getPosterior().data+ '</p></div>');

    $("#results").append('<div><p>Hyper Distribution:' + HtmlMatrix(getHyper()) + '</p></div>');

    $("#results").append('<div><p>Marginal Distribution:' + getMarginal()+ '</p></div>');
    
}

  