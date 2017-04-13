$(document).ready(function () {
	 $('.bg-img, .banner, .image-holder, .project-banner, .slider-banner-item, .highlights-video').each(function() {
	 	$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')').find('> img').hide();
	 });

	$('<a href="#" class="open-menu"><span></span><span></span><span></span>Open Menu</a>').appendTo('#header');
	$('<span class="fader"/>').appendTo('#header');
	$('.open-menu').click(function(){
		$('body').toggleClass('menu-opened');
		return false;
	});

	$('.fader').click(function(){
		$('body').removeClass('menu-opened');
	});
	$('#main-nav li').each(function(){
		if ($(this).find('ul').length){
			$(this).prepend('<span class="opener"></span>');
			$(this).addClass('dropdown');
		}
	});

	$('#main-nav .opener').click(function(){
		if ($(this).parent().hasClass('opened')) {
			$(this).parent().removeClass('opened');
			$(this).siblings('ul').stop().slideUp(600);
			$(this).css({transform: 'scaleY(1)'});
		} else{
			$(this).parent().addClass('opened').siblings('.opened').removeClass('opened').children('ul').stop().slideUp(600);
			$(this).css({transform: 'scaleY(-1)'});
			$(this).siblings('ul').stop().slideDown(600);
		};
		return false;
	});//main-nav-accordion
/* Sliders */
	$('.slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		fade: true,
		arrows: false,
		autoplay: false,
		autospeed: 2000
	});
	$('.slider-banner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		fade: true,
		arrows: true,
		autoplay: false,
		autospeed: 2000
	});
	$('.slideshow-projects').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		fade: true,
		arrows: false,
		autoplay: false,
		autospeed: 2000
	});
/* Highlights video*/
	$('.highlights-video .btn-play').on('click', function() {
		var video = $(this).siblings('video').get(0);
		if(video.paused) {
			video.play();
			$(this).parent().addClass('active');
		}
		else if(video.play){
			video.pause();
			$(this).parent().removeClass('active');
		}
		return false;
	});
	$('.highlights-video video').on('click', function() {
		var video = $(this);
		if(video.paused) {
			video.play();
			$(this).parent().addClass('active');
		}
		else if(video.play){
			video.pause();
			$(this).parent().removeClass('active');
		}
		return false;
	});
/* Select */
	$('select').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;

		$this.addClass('select-hidden'); 
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next('div.select-styled');
		$styledSelect.text($this.children('option').eq(0).text());

		var $list = $('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}

		var $listItems = $list.children('li');

		$styledSelect.click(function(e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
		});

		$listItems.click(function(e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
		});

		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});
});
/* Map */
$(window).on("load resize",function(e){
	if($('body').find('#map-canvas').length){
		initialize();
	}
	if($(window).width() < 992){
		$('#main-nav .dropdown >ul').hide();
	}else{
		$('#main-nav .dropdown >ul').show();
	};
function initialize() {
	var latlng = new google.maps.LatLng(48.586176, 10.497568);
	var myOptions = {
		zoom: 16,
		scrollwheel: false,
		center: latlng,
		title: false,
		disableDefaultUI: true,
		panControl: true,
		zoomControl: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		rotateControl: true,
		scaleControl: true,
		streetViewControl: true,
		overviewMapControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{
			stylers: [{
				saturation: -9999
			}]
		}]
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
		myOptions);
	var marker = new google.maps.Marker({
		position: latlng,
		map: map
	});
}
/*Video*/
	if ($('#header-video').length) {
		var video = $('#header-video').get(0),
		preloaderVideo = $('.visual .loader');

		function checkLoad() {
			if (video.readyState > 3) {
				preloaderVideo.parent().addClass('loaded');
				video.play();
			} else {
				setTimeout(checkLoad, 100);
			}
		}
		setTimeout(checkLoad, 100);
	};
});
