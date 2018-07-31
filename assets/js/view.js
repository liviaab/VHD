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
        
        getChannelMatrixValues();
        setChannel(getChannelMatrix());

        if( validateFields() ){                        
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
        clearPage();
    });
});

/* 
    Methods
*/
function clearPage(){
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
}

function sumPrior() {
    var result = math.sum(getPrior());
    return math.number(result);
}

var validateFields = function(){
    
    if (sumPrior() != 1) {
        alert("The sum of the initial probabilities (prior) is not 1")
        return false;
    }
    
    for(var i = 0; i < numEntries ; i++){
        var temp = math.sum(getChannel().data[i])
        
        if(math.number(temp) != 1){
            alert("The sum of the probabilities of the "+(i + 1) +" of the channel is not 1");
            return false;
        }
    }

    if(channelMatrix.length % getPrior().length != 0 ){
        alert("There are different quantities of output numbers in the channel matrix");
        //throw new Exception("There are different quantities of output numbers in the channel matrix");      
        return false;
    }

    if(channelMatrix.length != numEntries * numOutputs){
        alert("Missing entries in the channel matrix");
        return false;
    }

    return true;
}

var configureAndDrawChart = function(){
    getJointDistribution(getPrior(), getChannel());
    getMarginalDistributionColumns( getJoint() );
    getPosteriorDistribution(getJoint(), getMarginal());
    getHyperDistribution(getPosterior(), getMarginalDistribution());
    
    if(getPrior().length == 3){
        configureChartRow();
        $('.chart-row').show();
        drawDefaultChart(getPrior(), getFinalDistribution(), getHyper());
        
        var prior2D = point3Dto2D(getPrior());
        var output2D = matrixPoints3Dto2D(getHyper());  

        drawBarycentricChart( arrayPoint2DToChartData(output2D, getFinalDistribution(), false),
                              arrayPoint2DToChartData([prior2D],getFinalDistribution(), true));
        
    }
    else{
        alert("Can not generate a view with "+getPrior().length.toString()  +" entries.");
    }

    showCalculations();
    
}


var showCalculations = function(){
    $("#results-c1").html("");
    $("#results-c1").append('<div><p><b>Number of inputs:</b> ' + numEntries + '<br><br><b>Number of Outputs:</b> ' + numOutputs + '</p><br></div>');
    $("#results-c1").append('<div><p><b>Source Entropy:</b>' + HtmlArray(getPrior()) + '</p></div>');
    $("#results-c1").append('<div><p><b>Marignal Entropy:</b>' + HtmlArray(getMarginal()) + '</p></div>');
    /*$("#results-c1").append('<div><p><b>Posterior Distribution:</b>' + HtmlMatrix(getPosterior())+ '</p></div>');*/
    $("#results-c2").html("");
    $("#results-c2").append('<div><p><b>Hyper Distribution:</b> ' + HtmlMatrix(getHyper()) + '</p></div>');
    $("#results-c2").append('<div><p><b>Final Marginal Distribution:</b> ' + HtmlArray(getFinalDistribution()) + '</p></div>');
        
}

  