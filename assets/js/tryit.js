$(document).ready( function(){
	$('#chart-container').hide();
	$('#button-more').hide();
	$('#button-less').hide();
	$('#scatter-axis-subtitle').hide();
	$('.scatter-axis').hide();

	$('#button-detail').click(function(){
		$('.scatter-axis').show();
		$('#scatter-axis-subtitle').show();
		drawScatterAxis('x-coordinate', 0.5, "X");
		drawScatterAxis('y-coordinate', 0.5, "Y");
		drawScatterAxis('z-coordinate', 0.5, "Z");
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
	$('#chart-container').show();
	$('#button-more').show();
}

