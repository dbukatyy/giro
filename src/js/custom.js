jQuery(document).ready(function () {

     const msgText = $('.form__txt').html(),
           time = 1;
     let flag = true;
	
	AOS.init({
		disable: window.innerWidth < 600
	});

	$(window).on('scroll', e => {
		const currentScroll = $(e.target).scrollTop() + window.innerHeight / 2,
			  scrollVal = $(e.target).scrollTop(),
			  counterOffset = $('.counter').offset().top;

		if ( $(e.target).scrollTop() > 200 ) {
			$('.header').addClass('active');
		} else {
			$('.header').removeClass('active');
		}

		if ( flag && (currentScroll > counterOffset)) {

			$('.counter-list').each(function(){
			  $('.counter__number').each(function(){
			    var 
			    i = 1,
			    num = $(this).data('num'),
			    step = 1000 * time / num,
			    that = $(this),
			    int = setInterval(function(){
			      if (i <= num) {
			        that.html(i);
			      }
			      else {
			        clearInterval(int);
			      }
			      i++;
			    },step);
			  });
			});

			flag = false;
		}

		$('.banner').css('background-position', `50% ${-scrollVal/2}px`)		  	

	})

	$('.nav__link').on('click', e => {
		e.preventDefault();

		const sectionId = $(e.target).attr('href'),
			  sectionOffset = $(`${sectionId}`).offset().top;

			 $('html, body').animate({
			 	scrollTop: sectionOffset
			 },1000);
	
	})

	$('.review').slick({
		slidesToShow:1,
		slidesToScroll: 1,
		dots: true
		// centerMode: true,
	});

	$('.product-model__item img').on('click', e => {
		const imgSrc = $(e.target).data('src'),
			  targetImg = $(e.target).closest('.product').find(`.product__img-item img[src="${imgSrc}"]`),
			  thumbnailContainer = $(e.target).closest('.product-model__item'),
			  targetImgContainer = targetImg.closest('.product__img-item');

			  thumbnailContainer.addClass('active');
			  thumbnailContainer.siblings('.product-model__item').removeClass('active');

			  targetImgContainer.addClass('active');
			  targetImgContainer.siblings('.product__img-item').removeClass('active');

		})

	$('.catalog__nav-link').on('click', e => {
		const tabSelector = $(e.target).data('tab'),
			  targetTab = $(e.target).closest('.container').find(`.catalog__products[data-tab="${tabSelector}"]`),
			  linkSiblings = $(e.target).siblings('.catalog__nav-link'),
			  targetTabSiblings = targetTab.siblings('.catalog__products');

			  $(e.target).addClass('active');
			  linkSiblings.removeClass('active');

			  targetTab.addClass('active');
			  targetTabSiblings.removeClass('active');

		})

		$('.video__btn').on('click', e => {
			$('.video__over').addClass('active');
			document.querySelector('.preview').play();

			document.querySelector('.preview').addEventListener('ended', e => {
				$('.video__over').removeClass('active');
			})
		})

		$('.btn').on('click', e => {
			$('.form__wrapp').addClass('active');

			setTimeout(() => $('.form').addClass('active'), 200);
		})

		$('.form__close').on('click', e => {
			$('.form').removeClass('active');

			setTimeout(() => $('.form__wrapp').removeClass('active'), 200);

			$('.form__txt').html(msgText).css('color', 'rgba(15,124,255,1)');

	        $('.form')[0].reset();
			
		})


		$('.form__btn').on('click', function (e) {
		
			e.preventDefault();

			var msg = $('.form__txt'),
	            // msgText =  msg.html(),
	            form = $(this).closest('.form'),
	            inputs =  form.find('.form__field'),
	            // errorMsg = form.find('.error'),
	            valid = validate();


	        function validate () {
	       
	            var valid = true;

	            inputs.each( function () {

	                if ( $(this).val() === '' ) {
	                    valid = false;
	                    return false;
	                } 
	            });
	               
	            return valid;
	        }

	        function showMessage(data) {
	            msg.html(data);
	            // msg.addClass('msg_active');
	        }

	        if (valid) {

	             $.ajax({    
	                url: form.attr('action'),
	                data: form.serialize(),
	                type: 'POST',
	                success: function(data){
	                    showMessage(data);
	                    msg.css('color', 'rgba(39,179,101,.8)');
	                  	form[0].reset();
	                },
	                error: function(){
	                    showMessage('Ошибка отправки. Пожалуйста, повторите попытку.');
	                    msg.css('color', 'rgba(158,26,47,.8)');
	                     setTimeout(function () {
	                        showMessage(msgText);
	                        msg.css('color', 'rgba(15,124,255,1)');
	                    }, 3000);
	                }
	                // complete: function(){
	                //     setTimeout(function () {
	                //         showMessage(msgText);
	                //         msg.css('color', 'rgba(15,124,255,1)');
	                //     }, 3000);
	                // }
	            });
	         } else {
	            showMessage('Пожалуйста, заполните все поля.')
	            msg.css('color', 'rgba(158,26,47,.8)');
	            // setTimeout( function () {
	            //     msg.removeClass('msg_active');
	            // }, 5000);
	         }
		});
});


