var _barycentricChart

var drawBarycentricChart = function(outputPoints, priorPoints){
    $('#barycentric-container').html("");
    $('#barycentric-container').show();

    priorPoints["draggableX"] =  true;
    priorPoints["draggableY"] =  true;
    priorPoints["dragMinX"] = 0;
    priorPoints["dragMinY"] = 0;
    priorPoints["dragMaxX"] = 1 - this.y ;
    priorPoints["dragMaxY"] = 1 - this.x;

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
                },
                point: {
                    events: {
                        drag: function (e) {
                            // Returning false stops the drag and drops                            
                           
                            if ( ! PointInTriangle( {x: e.x , y: e.y }) ) {
                                this.x = e.dragStart.x;
                                this.y = e.dragStart.y;                                
                                return false;
                            }
                            else{                                
                                return true;   
                            }

                            
                            // $('#drag').html(
                            //     'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.y, 2) + '</b>');
                            
                            
                        },

                        drop: function () {
                            
                            if ( ! PointInTriangle( {x:this.x , y:this.y }) ) {
                                this.x = e.dragStart.x;
                                this.y = e.dragStart.y;                                   
                               //return false;
                            }
                            else{
                                //return true;   
                            }
                            
                            // $('#drop').html(
                            //     'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                            var point3D = point2Dto3D([this.x, this.y]);
                            setPrior( [point3D.x, point3D.y, point3D.z] );
                            setChannel(getChannelMatrix());

                            configureAndDrawChart();
                                                   
                        }
                    }
                },
                //stickyTracking: false     
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
            },
            gridLineColor: '#A0A0A0'
        },
        xAxis: {
            min: 0,
            max: 1.5,
            tickInterval: 0.25,          
            title:{ 
                text: 'X'
            },
            gridLineWidth: 1 ,
            gridLineColor: '#A0A0A0'
        },

        series: [{
                    lineWidth: 1,
                    lineColor: '#000000',
                    name: 'Limits',
                    marker: {
                        enabled: false,
                        //symbol: 'circle'
                    },
                    data: [ [0,0], [ Math.sqrt(2)/2, Math.sqrt(6)/2 ], [ Math.sqrt(2), 0 ], [0,0]]

                }
                
                , outputPoints
                , priorPoints

                ]

    });
}

/*
    Globals
*/

var _vertice1 = 
    {
        x: 0,
        y: 0
    }

var _vertice2 = 
    {
        x:  Math.sqrt(2)/2,
        y: Math.sqrt(6)/2 
    }

var _vertice3 = 
    {
        x: Math.sqrt(2),
        y: 0
    }

/*
    ------------
*/

var sign = function (p1, p2, p3)
{
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

var PointInTriangle = function(pt)
{
    var b1, b2, b3;

    b1 = sign(pt, _vertice1, _vertice2) < 0.0;
    b2 = sign(pt, _vertice2, _vertice3) < 0.0;
    b3 = sign(pt, _vertice3, _vertice1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
}