$( document ).ready(function(){
	$(".step-panel").each(function(e) {
        if (e != 0)
            $(this).addClass("hidden");
    });

	$(".steps-content div.step-panel:first").removeClass("hidden").addClass("active");

	$("a.next.round ").click(function() {
		if ($(".steps-content div.step-panel.active").next().length != 0){
	 		$(".steps-content div.step-panel.active").next().removeClass("hidden").addClass("active");
		 	$(".steps-content div.step-panel.active").prev().removeClass("active").addClass("hidden"); 		        
		}
	    else {
		 	$(".steps-content div.step-panel.active").removeClass("active").addClass("hidden");	      
			$(".steps-content div.step-panel:first").removeClass("hidden").addClass("active");	        
	    }
	    return false;
	});
});


