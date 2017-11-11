$(document).ready(function(){
	var hyperDistribution = getHyper();
	dataPoints = matrixTo3DData(hyperDistribution.matrix);
	setDefault(dataPoints);
});

var drawChart = function(alphaAngle, betaAngle, dataPoints){
	// Give the points a 3D feel by adding a radial gradient
	Highcharts.setOptions({
	    colors: $.map(Highcharts.getOptions().colors, function (color) {
	        return {
	            radialGradient: {
	                cx: 0.4,
	                cy: 0.3,
	                r: 0.5
	            },
	            stops: [
	                [0, color],
	                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
	            ]
	        };
	    })
	});

	// Set up the chart
		var chart = new Highcharts.Chart({
	        chart: {
	            renderTo: 'container',
	            margin: 100,
	            type: 'scatter3d',
	            options3d: {
	                enabled: true,
	                alpha: alphaAngle,
	                beta: betaAngle,
	                depth: 200,
	                viewDistance: 10,

	                frame: {
	                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
	                    // back: { size: 1, color: 'rgba(0,0,0,0.04)' },
	                    // side: { size: 1, color: 'rgba(0,0,0,0.06)' }
	                }
	            }
	        },
	        title: {
	            text: 'Draggable box'
	        },
	        subtitle: {
	            text: 'subtitle'
	        },
	        plotOptions: {
	            scatter: {
	                width: 10,
	                height: 10,
	                depth: 10,
	                dataLabels: {
	                    format: "{point.name}",
	                    enabled: true
	                },
	            }
	        },
	        yAxis: {
	            min: 0,
	            max: 2,
		        tickInterval: 0.5,
		        title: 'x2'
	        },
	        xAxis: {
	            min: 0,
	            max: 2,
		        tickInterval: 0.5,
		        title: 'x1',
	            gridLineWidth: 1
	        },
	        zAxis: {
	            min: 0,
	            max: 2,
		        tickInterval: 0.5,
		        title:'x3',
	        },
	        legend: {
	            enabled: false
	        },

	        series: [
		        {
		            lineWidth: 1,
		            name: 'Reading',
		            marker: {
		                enabled: false
		            },
		            data: [[1,0,0],
				    	 [0,1,0],
				    	 [0,0,1],
				    	 [1,0,0]] 
		    	},
		    	{
		    		data: dataPoints
		    	}
	    	]
	    });
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

var setDefault = function(data){
	$('#container').html("");
	var chart = drawChart(60, 60, data);
	setDraggableChart(chart);	
}

var set2D = function(data){
	$('#container').html("");
	var chart = drawChart(0, 0, data);
	setDraggableChart(chart);	
}