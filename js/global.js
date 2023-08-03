
window.setTimeout(function(){
$(".loading").fadeOut(500)


var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 22,
    mobile: true,
    live: true
});
wow.init();

},400)

$(document).ready(function(){
	$(window).load(function () {
          $(".mobile-inner-header-icon").click(function(){
            $(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
            $(".mobile-inner-nav").slideToggle(250);
          });
          $(".mobile-inner-nav li").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });
          $(".mobile-inner-nav li").click(function(){
            $(this).find('dl').slideToggle(200)
          })
        });

})

$(document).ready(function(){

$(".section1 .left .link a img").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });

$(".section4 .content .left>*").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });
$(".section5 .content .left>*").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });

$(".section6 .list .item").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });

$(".section7 .content .left>*").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });
$(".section10 .left>*").each(function( index ) {
            $( this ).css({'animation-delay': (index/10)+'s'});
          });







$('.section1 .left .title').addClass('wow zoomIn')


$('.section1 .left .dec,.section2 .content .left .title,.section4 .content .left>*,.section7 .content .left>*,.section10 .left>*').addClass('wow fadeInLeft')


$('.section4 .content .right,.footer .con').addClass('wow bounceInDown')

$('.section5 .content .right,.section6 .list .item').addClass('wow bounceInUp')



$('.section1 .left .link a img,.section2 .content .left .dec').addClass('wow fadeInRight')



$('.section1 .right .img4').addClass('wow bounce')

$('.footer .pig').addClass('wow jello')


$('.titlemodel .en').addClass('wow fadeInDown')

$('.titlemodel .en1,.section5 .content .left>*').addClass('wow fadeInUp')


$('.section2 .content .right').addClass('wow puffIn')


$('.section1 .right .img1').addClass('wow rotate_1')
$('.section1 .right .img2').addClass('wow rotate_2')
$('.section3 .item:nth-child(1),.section3 .item:nth-child(3)').addClass('wow rotate_3')
$('.section3 .item:nth-child(2),.section3 .item:nth-child(4),.section10 .right').addClass('wow rotate_4')
$('.section6 .u1').addClass('wow rotate_5')
$('.section7 .content .right').addClass('wow rubberBand')

$('.section8 .list .item').addClass('wow swing')

$('.section9 .item').addClass('wow zoomInDown')


$('.section10 .right .pig').hover(function(){
  $(this).toggleClass('animated tada')
})




$('.section3 .item.last').addClass('wow rotate_5')



var section6 = new Swiper('.section6 .swiper-container', {
        pagination: '.section6 .swiper-pagination',
        paginationClickable: '.section6 .swiper-pagination',
        nextButton: '.section6 .swiper-button-next',
        prevButton: '.section6 .swiper-button-prev',
        autoplay:false,
        autoplayDisableOnInteraction: false,
        speed:500,
        slidesPerView: 3,
        spaceBetween: 0,
        breakpoints: {
          640: {
            noSwiping : false,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            noSwiping : false,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            noSwiping : false,
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }
});



function height(){
  var sc = $(window).scrollTop();
  if (sc > 200) {
      $("body").addClass("current");
    } else {
      $("body").removeClass("current");
    }
}
height()
$(window).scroll(function () {
  height()
});






});