var _barycentricChart

var drawBarycentricChart = function(outputPoints, priorPoints){

    Highcharts.chart('barycentric-container', {

        title: {
            text: 'Barycentric coordinates'
        },

        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },

        // yAxis: {
        //     title: {
        //         text: 'Number of Employees'
        //     }
        // },

        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'middle'
        // },

        // plotOptions: {
        //     series: {
        //         label: {
        //             connectorAllowed: false
        //         },
        //         pointStart: 2010
        //     }
        // },
        chart: {
            type: 'scatter',
        },

        plotOptions: {
            scatter: {
                dataLabels: {
                    format: "{point.name}",
                    enabled: true
                },
            }
        },

        series: [{
            lineWidth: 1,
            lineColor: '#A0A0A0',
            name: 'Limits',
            marker: {
                enabled: false,
                symbol: 'circle',
            },
            data: [ [0,0], [1/2, Math.sqrt(3)/2], [1,0],[0,0]]
        } ,
        // 2nd serie - output (black) points
            outputPoints,

            // 3rd serie - prior (green) point
            {

                data: [[1/2,1/3]]
            }
            ],

        // responsive: {
        //     rules: [{
        //         condition: {
        //             maxWidth: 500
        //         },
        //         chartOptions: {
        //             legend: {
        //                 layout: 'horizontal',
        //                 align: 'center',
        //                 verticalAlign: 'bottom'
        //             }
        //         }
        //     }]
        // }

    });


}