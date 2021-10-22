

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

$('.header__contacts-burger').click(function(){
	$('.header__contacts').slideToggle();
})


$('.open__modal').click(()=>{
	$('.page__overlay-modal').show(400).css('display','flex');
})


 $('.modal__close').click(()=>{
	$('.page__overlay-modal').hide(400);
}) 

$('.page__overlay').click((e)=>{
	if (e.target.classList.contains('page__overlay')){
		$('.page__overlay-modal').hide(400);
	}
})
