var drawScatterAxis = function(containerId, coordinate, title){
    Highcharts.chart(containerId, {
        chart: {           
            height: '300px'
        },

        xAxis: {
            min: 0,
            max: 1,
            gridLineWidth: 1
        },

        yAxis: {
            // Renders faster when we don't have to compute min and max
            min: -1,
            max: 1,
            minPadding: 0,
            maxPadding: 0,
            title: {
                text: null
            }
        },

        title: {
            text: title
        },

        legend: {
            enabled: false
        },

        series: [
            {
                plotOptions: {
                    line: {
                        marker: {
                            enabled: false
                        }
                    }
                },

                lineWidth: 1,
                lineColor: '#A0A0A0',                                
                data: [[-1,0], [2,0]],
                marker: {
                    enabled: false                
                },
                draggableX: false,
                draggableY: false
            },

            {            
                point: {
                    events: {
                        /*drag: function (e) {                            
                            $('#drag-x').html(
                                'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.y, 2) + '</b>');
                        },*/
                        drop: function () {
                            var value = this.series.data[0].x;
                            if(containerId == 'x-coordinate'){
                                setPriorValues( [value, getPriorValues().second(), getPriorValues().third()] );
                            }
                            else if(containerId == 'y-coordinate'){
                                setPriorValues( [getPriorValues().first(), value, getPriorValues().third()] );
                            }
                            else if(containerId == 'z-coordinate'){
                                setPriorValues( [getPriorValues().first(), getPriorValues().second(), value] );
                            }
                            
                            configureAndDrawChart();
                        }
                    }
                },
                
                stickyTracking: false,

                data: [[coordinate,0]],
                marker: {
                    radius: 5,
                    fillcolor: '#000000'
                },
                tooltip: {
                    followPointer: false,
                    pointFormat: '[{point.x:.1f}, {point.y:.1f}]'
                },
                draggableX: true,
                draggableY: false,
                dragMaxX: 1,
                dragMinX: 0,
                cursor: 'pointer'               
               
            }
        ]
    });
}


            
        