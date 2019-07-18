(function($){
	$.fn.fineSelect = function(){
		this.each(function(){
			let $select = $(this);
			let html = '<div class="fine-select-wrap">';

			html += '<p>&nbsp;</p><ul>';
			$select.children().each(function(){
				html += '<li data-value="' + this.value + '">';
				html += this.innerText + '</li>';
			});
			html += '</ul></div>';
			$select.hide().after(html);
			
			let $result = $select.next().children(':first');
			let $list = $result.next();
			
			$result.on('click', function(){
				$list.slideToggle();
			});
			$list.children().on('click', function(){
				$result.text($(this).text());
				$select.val($(this).data('value'));
			});
		});

		$(document.body).on('click', function(e){
			let $box = $(e.originalEvent.target).parents('.fine-select-wrap');
			if ($box.length) return;
			$('.fine-select-wrap').children('ul').slideUp();
		});
		
		return this;
	}
})(jQuery);