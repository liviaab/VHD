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
            addChannelMatrix();
            addButtons();  
        } 
    });

    $(".channel-values").on("click","#btn-Visualize", function(){
        setValues();
        getChannelMatrixValues();
        if(checkElementsChannelMatrix()){
            // $("#button-more").toggle();
            setChannel(getChannelMatrix());
            configureAndDrawChart();
            _priorValues = []
            _channelMatrix = [];
            _jointDistribution = [];
            _marginalDistribution = [];
            _posteriorDistribution = [];
            _hyperDistribution = [];
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

var configureAndDrawChart = function(){
    var joint = getJointDistribution(getPrior(), getChannel());
    var joint2 = getJoint();

    var marginalY = getMarginalDistributionColumns(joint);
    var marginal2 = getMarginal();

    var posterior = getPosteriorDistribution(joint, marginalY)
    var post2  = getPosterior();

    var hyper = getHyperDistribution(posterior.matrix, posterior.distribution);
    var hyper2 = getHyper();

    configureChartRow();
    
    drawDefaultChart(getPrior(), getMarginal(), getHyper());
    
    var prior2D = point3Dto2D(getPrior());


    drawBarycentricChart({}, point2DToChartData(prior2D));
    
    showCalculations();
    
}


var showCalculations = function(){
    $("#results-c1").html("");
    $("#results-c1").append('<div><p>Number of inputs: ' + numEntries + '<br><br>Number of Outputs: ' + numOutputs + '</p></div>');
    $("#results-c1").append('<div><p>Source Entropy:' + HtmlArray(getPrior()) + '</p></div>');

    // $("#results").html('<div><p>Posterior Distribution:' + getPosterior().data+ '</p></div>');
    $("#results-c2").html("");
    $("#results-c2").append('<div><p>Hyper Distribution: ' + HtmlMatrix(getHyper()) + '</p></div>');
    $("#results-c2").append('<div><p>Marginal Distribution: ' + HtmlArray(getMarginal()) + '</p></div>');
        
}

  