function scrollTop(selector, duration){
	let $body = $('body');
	if (typeof duration === 'string' || typeof selector === 'number') 
		[selector, duration] = [duration, selector];
	if (selector === undefined) selector = '.scrolltop';
	if (duration === undefined) duration = 600;

	if (selector !== '*' && !$body.is(selector)) return;

	let $toTop = $('#scrollTopPlugin');
	if (!$toTop.length){
		$body.append('<div class="to-top" id="scrollTopPlugin"></div>');
		$toTop = $('#scrollTopPlugin');
	}

	$toTop.on('click', function(){
		if ($body.hasClass('scrollTop-scrolling')) return;
		$window.trigger('beforeScrollUp');
		$body.addClass('scrollTop-scrolling');
		$('html, body').animate({scrollTop: 0}, duration, function(){
			$body.removeClass('scrollTop-scrolling');
			$(window).trigger('afterScrollUp');
		});
	}).hide();
	
	let $window = $(window);

	$window.on('scroll', function(){
		$toTop['fade' + ($window.scrollTop() > $window.height() ? 'In' : 'Out')]();
	});
}