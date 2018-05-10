var _barycentricChart

var drawBarycentricChart = function(outputPoints, priorPoints){

    _barycentricChart = new Highcharts.chart(/*'barycentric-container',*/ {

        title: {
            text: 'Barycentric coordinates'
        },

        chart: {
            renderTo: 'barycentric-container',
            type: 'scatter'
        },

        plotOptions: {
            scatter: {
                dataLabels: {
                    format: "{point.name}",
                    enabled: true,
                    allowOverlap: true                    
                }
            },
            series: {
                label: {
                    connectorAllowed: false
                }                
            }
        },
        
        tooltip:{
            formatter: function(){
                return  '<b>' + this.point.name + '</b><br/>' +
                        'x: ' + this.point.x + '<br/>' +
                        'y: ' + this.point.y + '<br/>'+                        
                        'p: ' + this.point.p
            }
        },

        yAxis: {
            min: 0,
            max: 1.5,
            tickInterval: 0.25,
            title:{
                text: 'Y'
            }
        },
        xAxis: {
            min: 0,
            max: 1.5,
            tickInterval: 0.25,          
            title:{ 
                text: 'X'
            },
            gridLineWidth: 1 
        },

        series: [{
                    lineWidth: 1,
                    lineColor: '#A0A0A0',
                    name: 'Limits',
                    marker: {
                        enabled: false,
                        //symbol: 'circle'
                    },
                    data: [ [0,0], [ Math.sqrt(2)/2, Math.sqrt(6)/2 ], [  Math.sqrt(2), 0 ], [0,0]]
                }
                
                , outputPoints
                , priorPoints

                ]

    });
}