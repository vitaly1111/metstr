const swiper=new Swiper('.swiper',{
	// Optional parameters

	loop: false,

	breakpoints: {

		480: {
			grid: {
				fill: 'row',
				rows: 2
			}

		},
		768: {
			slidesPerView:2,
			grid: {
				fill: 'row',
				rows: 2
			}

		},
		// when window width is >= 640px

	},
	// Navigation arrows
	navigation: {
		nextEl: '.portfolio__arrow-right',
		prevEl: '.portfolio__arrow-left',
		disabledClass: 'portfolio__aria-disabled'
	},


});
