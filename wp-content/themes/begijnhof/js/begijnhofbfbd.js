(function($) {
	$(document).ready(function () {
        // faq
        $(".faq").click(function() {
            $(this).find('div').slideToggle(300);
            $(this).addClass('open');
        });

        // news-load-more
        $('.news-page .load-more').click(function() {
            var length = $('#news .item').length;
            var numb = length + 6;

            if(numb >= $('#news').attr('data-count')) {
                $('.btn-container').css('display', 'none');
            }

            $("#news").load('?template=news&numb='+numb);
        });

        //mobile-nav
        $('#toggle-nav').click(function() {
            $('#container-top-navigation').slideToggle(300);
        });

        /*// banner-slider
        if($("#banner .slide").length > 1 && $(window).width() > 767) {
            $("#banner > figure.slide:gt(0)").hide();
            setInterval(function() {
              $('#banner > figure.slide:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#banner');
            },  5000);
        }*/

        // lightbox
		$('.omg_lightbox').click(function(e) {
			e.preventDefault();
			var container = $('#image-overlay .container');
			getContainerHeight(container);

			fillContainer($('.omg_lightbox').index(this));
			container.css('marginTop', ($(window).innerHeight() - container.height()) / 2);
		});

		function getContainerHeight(container) {
			var height = $(window).outerHeight() - 200;
			if(height > 800) {
				container.height(770);
			} else {
				container.height(height);
			}
		}

		function fillContainer(numb) {
			var container = $('#image-overlay .container');
			var height = container.height();
			var length = $('.omg_lightbox').length;


			var img = Array();
			img[0] = $(".omg_lightbox")[numb].getAttribute('href');
			img[1] = $(".omg_lightbox")[numb].getAttribute('data-caption');

			if(img[1]) {
				height = height - 40;
			}

			var next = parseFloat(numb) + 1;
			var prev = parseFloat(numb) - 1;
			if(numb == 0) { prev = ""; }
			if(numb == length - 1) { next = ""; }

			$('#image-overlay .container').empty();
			$('#image-overlay').fadeIn('500');
			$('<span class="icon-close">x</span>').appendTo(container);
				if(prev != undefined && prev.length != 0) { $('<span class="prev icon-arrow-prev" data-prev="'+prev+'"></span>').appendTo(container); }
				if(next != undefined && next.length != 0) { $('<span class="next icon-arrow-next" data-next="'+next+'"></span>').appendTo(container); }
			$('<figure style="line-height: '+height+'px;"></figure>').appendTo(container);
			$('<img src="'+img[0]+'" alt="" style="max-height: '+height+'px" />').appendTo('#image-overlay .container figure');

			if(img[1]) {
				$('<figcaption>'+img[1]+'</figcaption>').appendTo('#image-overlay .container figure');
			}
		}

		$('body').bind("click touchstart", function(ev) {
			if ($(ev.target).hasClass('overlay') === true || $(ev.target).hasClass('icon-close') === true) {
				$('.overlay').fadeOut('100');
				$('.video-overlay .container iframe').attr('src', $('.video-overlay .container iframe').attr('src'));
				ev.preventDefault();
			}
			if($(ev.target).hasClass('next') === true || $(ev.target).hasClass('prev') === true || $(ev.target).hasClass('icon') === true) {
				if($(ev.target).hasClass('prev') === true) {
					var numb = $('.prev').attr('data-prev');
				} else {
					var numb = $('.next').attr('data-next');
				}
				fillContainer(numb);
			}
		});
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				$('.overlay').fadeOut('100');
			}
		});
        //restaurations
        $('#restaurations .restau:nth-child(n+7)').addClass('hidden');
        var visible = 6;
        var cnt = $('#restaurations .restau').length;
        $('#restaurations .restaurationButtons .newerContainer').toggleClass('hidden');
        $('#restaurations .restaurationButtons .older').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $('#restaurations .restau').addClass('hidden');
            $('#restaurations .restau:nth-child(n+'+(visible+1)+'):nth-child(-n+'+(visible+6)+')').removeClass('hidden');
            visible += 6;
            if (visible >= cnt) $('#restaurations .restaurationButtons .olderContainer').addClass('hidden');
            if (visible > 6) $('#restaurations .restaurationButtons .newerContainer').removeClass('hidden');
        });
        $('#restaurations .restaurationButtons .newer').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            visible -= 12;
            $('#restaurations .restau').addClass('hidden');
            $('#restaurations .restau:nth-child(n+'+(visible+1)+'):nth-child(-n+'+(visible+6)+')').removeClass('hidden');
            visible += 6;
            if (visible <= 6) $('#restaurations .restaurationButtons .newerContainer').addClass('hidden');
            if (visible < cnt) $('#restaurations .restaurationButtons .olderContainer').removeClass('hidden');
        });
    });

    //mobile navigation fix
    if ('ontouchstart' in window){
        $('#menu-hoofdnavigatie .menu-item-has-children > a').one('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var id = $(this).attr('id');
            $(id + ' .sub-menu').slideToggle();
        });
    }

}(jQuery));
//map initialisation on patrimonium (doesn't use jquery)
function initMap() {
    var str = document.querySelector('.coord').innerHTML;
    var arrCoord = str.split('-');
    var uluru = {lat: parseFloat(arrCoord[0].replace(/(^\s+|\s+$)/g,'')), lng: parseFloat(arrCoord[1].replace(/(^\s+|\s+$)/g,''))};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}
