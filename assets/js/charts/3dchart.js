/*

	Globals

*/

var _chart ;

var drawChart = function(alphaAngle, betaAngle, outputPoints, priorPoints){
	
	var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart-container',
            margin: 10,
            type: 'scatter3d',
            options3d: {
                enabled: true,
                alpha: alphaAngle,
                beta: betaAngle,
                depth: 600,
                viewDistance: 10 ,
            }
        },
        title: {
            text: 'Hyper Distribution'
        },/*
        subtitle: {
            text: 'subtitle'
        },*/
        plotOptions: {
            scatter3d: {
                dataLabels: {
                    format: "{point.name}",
                    enabled: true,
                    allowOverlap: true                    
                }
            }
        },
        tooltip:{
        	formatter: function(){
        		return  '<b>'+ this.series.name +' - '+ this.point.name + '</b><br/>' +
        				'x: ' + this.point.x + '<br/>' +
        				'y: ' + this.point.y + '<br/>'+
        				'z: ' + this.point.z + '<br/>'+
        				'p: ' + this.point.p
        	}
        },

        yAxis: {
            min: 0,
            max: 1.5,
	        tickInterval: 0.5,
	        labels: {
	            skew3d: true
	        },
	        title:{
	        	text: 'I2',
                color: '#717469'
	        },
            gridLineColor: '#C0C0C0'
        },
        xAxis: {
            min: 0,
            max: 1.5,
	        tickInterval: 0.5,
	        labels: {
	            skew3d: true
	        },
	        title:{ 
	        	text: 'I1'
	        },
            gridLineWidth: 1 ,
            gridLineColor: '#C0C0C0'
        },
        zAxis: {
            min: 0,
            max: 1.5,
	        tickInterval: 0.5,
	        labels: {
	            skew3d: true
	        },
	        title:{
	        	text:'I3'
	        },
            gridLineColor: '#C0C0C0'
        },
        legend: {
            enabled: false
        },

        series: [
        	// 1st serie - triangle
	        {
	            lineWidth: 1,
	            lineColor: '#000000',
	            name: 'Limits',
	            marker: {
	                enabled: false,
	                symbol: 'circle',
	            },
	            data: [[1,0,0], [0,1,0], [0,0,1], [1,0,0]] 
	    	},		    	
	    	// 2nd serie - output (black) points
	    	outputPoints,

	    	// 3rd serie - prior (green) point
	    	priorPoints
    	]	    	
    });	
    _chart = chart
    return chart;    
}

var setDraggableChart = function(chart){
	$(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
        e = chart.pointer.normalize(e);

        var posX = e.pageX,
            posY = e.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive

        $(document).bind({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                newBeta = Math.min(100, Math.max(-100, newBeta));
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                newAlpha = Math.min(100, Math.max(-100, newAlpha));
                chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).unbind('.hc');
            }
        });
    });
}

var drawDefault = function(outputPoints, priorPoints){
	$('#chart-container').html("");
	var chart = drawChart(60, 60, outputPoints, priorPoints);
	setDraggableChart(chart);	
}

var draw2D = function(outputPoints, priorPoints){
	$('#chart-container').html("");
	var chart = drawChart(0, 0, outputPoints, priorPoints);
	setDraggableChart(chart);	
}