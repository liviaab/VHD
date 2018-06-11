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
        $('#barycentric-container').html('');
        $('#results-c1').html('');
        $('#results-c2').html('');
        $('.chart-row').hide();
        $('.row-calculations').hide();
    });
});

/* 
    Methods
*/

var configureAndDrawChart = function(){
    getJointDistribution(getPrior(), getChannel());
    getMarginalDistributionColumns( getJoint() );
    getPosteriorDistribution(getJoint(), getMarginal());
    getHyperDistribution(getPosterior(), getMarginalDistribution());
    
    configureChartRow();
    $('.chart-row').show();
    drawDefaultChart(getPrior(), getMarginalDistribution(), getHyper());
    
    var prior2D = point3Dto2D(getPrior());
    var output2D = matrixPoints3Dto2D(getHyper());  

    drawBarycentricChart( arrayPoint2DToChartData(output2D, getFinalDistribution(), false),
                          arrayPoint2DToChartData([prior2D],getFinalDistribution(), true));
    
    showCalculations();
    
}


var showCalculations = function(){
    $("#results-c1").html("");
    $("#results-c1").append('<div><p><b>Number of inputs:</b> ' + numEntries + '<br><br><b>Number of Outputs:</b> ' + numOutputs + '</p><br><br></div>');
    $("#results-c1").append('<div><p><b>Source Entropy:</b>' + HtmlArray(getPrior()) + '</p></div>');
    $("#results-c1").append('<div><p><b>Marignal Entropy:</b>' + HtmlArray(getMarginal()) + '</p></div>');
    $("#results-c1").append('<div><p><b>Posterior Distribution:</b>' + HtmlMatrix(getPosterior())+ '</p></div>');
    $("#results-c2").html("");
    $("#results-c2").append('<div><p><b>Hyper Distribution:</b> ' + HtmlMatrix(getHyper()) + '</p></div>');
    $("#results-c2").append('<div><p><b>Final Marginal Distribution:</b> ' + HtmlArray(getFinalDistribution()) + '</p></div>');
        
}

  