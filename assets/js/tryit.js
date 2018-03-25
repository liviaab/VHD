$(document).ready( function(){
	$('#chart-container').hide();
	$('#button-more').hide();
	$('#button-less').hide();
	$('#scatter-axis-subtitle').hide();
	$('.scatter-axis').hide();

	$('#button-detail').click(function(){
		$('.scatter-axis').show();
		$('#scatter-axis-subtitle').show();
		drawScatterAxis('x-coordinate', getPriorValues().first(), "X");
		drawScatterAxis('y-coordinate', getPriorValues().second(), "Y");
		drawScatterAxis('z-coordinate', getPriorValues().third(), "Z");
		$("#button-more").toggle();
		$("#button-less").toggle();
	});

	$("#button-hide").click(function(){
		$('.scatter-axis').hide();
		$('#scatter-axis-subtitle').hide();
		$("#button-less").toggle();
		$("#button-more").toggle();
	});
});


var configureChartRow = function(){
	$('#chart-container').html("");
	$('#chart-container').show();
}



