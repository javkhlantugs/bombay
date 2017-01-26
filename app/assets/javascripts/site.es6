$(document).on('turbolinks:load', function() {
	var hei = $(window).height();
	var navHei = 221;
	$('.js-sticky-nav').css('margin-top', hei - navHei)
})