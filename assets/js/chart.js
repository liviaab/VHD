$(document).ready(function(){
	setDefault();
});

var drawChart = function(alphaAngle, betaAngle){
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
	                depth: 10
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
	        series: [{
	            lineWidth: 1,
	            name: 'Reading',
	            marker: {
	                enabled: false
	            },
	            data: [[1,0,0],
			    	 [0,1,0],
			    	 [0,0,1],
			    	 [1,0,0]] 
	    	}]
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

var setDefault = function(){
	$('#container').html("");
	var chart = drawChart(60, 60);
	setDraggableChart(chart);	
}

