jQuery(document).ready(function () {

	// $('.product__img').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	arrows: false,
	// 	fade: true,
	// 	lazyLoad: 'ondemand',
	// 	asNavFor: '.product-model__list'
	// });
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
});


