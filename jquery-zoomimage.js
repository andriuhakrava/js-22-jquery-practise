(function($){
	$.fn.zoomImage = function(width = 500, height = 400){
		let $zoomImg;
		this.on('mouseenter', imageMouseEnter)
				.on('mouseleave', imageMouseLeave)
				.on('mousemove', imageMouseMove);
		return this;

		function imageMouseEnter(){
			let src = this.getAttribute('src');
			let $img = $(this);
			let imgOffset = $img.offset();
			let left = imgOffset.left + $img.outerWidth() + 4;
			let top = imgOffset.top;
			let html = '<div id="zoomImagePlugin">';

			html += '<img src="' + src + '" alt="original"></div>';
			$zoomImg = $(html);
			$zoomImg.css({
				position: 'absolute',
				left: left + 'px',
				top: top + 'px',
				width: width + 'px',
				height: height + 'px',
				border: '1px solid silver',
				overflow: 'hidden'
			});

			$zoomImg.children().css('position', 'absolute');
			$(document.body).append($zoomImg);
		}

		function imageMouseLeave(){
			if (!$zoomImg) return;
			$zoomImg.remove();
			$zoomImg = null;
		}
		
		function imageMouseMove(e){
			if (!$zoomImg) return;
			let $imgOrigin = $zoomImg.children();
			let $img = $(this);
			let imgOffset = $img.offset();
			let x = e.pageX - imgOffset.left;
			let y = e.pageY - imgOffset.top;

			x = x / $img.width();
			y = y / $img.height();
			
			let deltaX = $imgOrigin.width() - $zoomImg.width();
			let deltaY = $imgOrigin.height() - $zoomImg.height();
			
			$imgOrigin.css({
				left: -x * deltaX + 'px',
				top: -y * deltaY + 'px'
			});
		}
	}
})(jQuery);