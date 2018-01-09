var drawScatterAxis = function(containerId, coordinate, title){
    Highcharts.chart(containerId, {
        chart: {
            //zoomType: 'xy',
            height: '300px'
        },

        // boost: {
        //     useGPUTranslations: true,
        //     usePreAllocated: true
        // },

        xAxis: {
            min: 0,
            max: 1,
            gridLineWidth: 1
        },

        yAxis: {
            // Renders faster when we don't have to compute min and max
            min: -0.01,
            max: 0.01,
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

        series: [{
            //type: 'scatter',
            //color: 'rgba(152,0,67,0.1)',
            data: [[0.5,0]],
            marker: {
                radius: 3,
                fillcolor: '#000000'
            },
            tooltip: {
                followPointer: false,
                pointFormat: '[{point.x:.1f}, {point.y:.1f}]'
            }
        }]
    });
}