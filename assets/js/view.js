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
    Setters
*/

var setPriorValues = function(array){
    priorValues = array
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
            configureChartRow();
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
    $("#results-c1").html('<div><p>Number of inputs: ' + numEntries + '<br><br>Number of Outputs: ' + numOutputs + '</p></div>');

    $("#results-c1").append('<div><p>Source Entropy:' + HtmlArray(getPrior()) + '</p></div>');

    // $("#results").append('<div><p>Posterior Distribution:' + getPosterior().data+ '</p></div>');

    $("#results-c2").append('<div><p>Hyper Distribution: ' + HtmlMatrix(getHyper()) + '</p></div>');

    $("#results-c2").append('<div><p>Marginal Distribution: ' + HtmlArray(getMarginal()) + '</p></div>');
        
}

  