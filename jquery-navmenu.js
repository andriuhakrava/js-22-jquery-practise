(function($){
	$.fn.navMenu = function(duration = 600, shift = 35){
		let $links = this.find('a[href^="#"]');
		let $sections = $();

		$links.each(function(){
			$sections = $sections.add($(this.getAttribute('href')));
		}).on('click', linkOnClick);
		
		let sections = [];
		
		$sections.each(function(){ sections.push($(this)); });
		sections.sort(function($a, $b){
			return $a.offset().top - $b.offset().top;
		})
		
		$(window).on('scroll', windowScroll).trigger('scroll');
		
		return this;

		function linkOnClick(e){
			e.preventDefault();
			let top = $(e.target.getAttribute('href')).offset().top;
			$('html, body').animate({scrollTop: top - shift}, duration);
		}

		function windowScroll(){
			$links.parents('li.active').removeClass('active');
			let scrollY = window.scrollY;
			let $active;

			for (let i = 0; i < sections.length; i++){
				if (sections[i].offset().top - 2*shift < scrollY) $active = sections[i];
			}
			if (!$active) return;
			$('a[href="#' + $active.attr('id') + '"]').parents('li').addClass('active');
		}
	};
})(jQuery);