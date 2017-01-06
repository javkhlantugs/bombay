$(document).on('turbolinks:load', function() {
     var t = $(window).height();
     var e = 120;
	$('.js-sticky-nav').css('margin-top', t - e)
});