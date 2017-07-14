var mm = jQuery.noConflict();
var ww = document.body.clientWidth;

mm(document).ready(function() {
	mm(".nav li a").each(function() {
		if (mm(this).next().length > 0) {
			mm(this).addClass("parent");
		};
	})
	
	mm(".toggleMenu").click(function(e) {
		e.preventDefault();
		mm(this).toggleClass("active");
		mm(".nav").toggle(500);
	});
	adjustMenu();
})

mm(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww < 768) {
		mm(".toggleMenu").css("display", "inline-block");
		if (!mm(".toggleMenu").hasClass("active")) {
			mm(".nav").hide();
		} else {
			mm(".nav").show();
		}
		mm(".nav li").unbind('mouseenter mouseleave');
		mm(".nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			mm(this).parent("li").toggleClass("hover");
		});
	} 
	else if (ww >= 768) {
		mm(".toggleMenu").css("display", "none");
		mm(".nav").show();
		mm(".nav li").removeClass("hover");
		mm(".nav li a").unbind('click');
		mm(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	mm(this).toggleClass('hover');
		});
	}
}

