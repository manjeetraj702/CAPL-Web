// NAVIGATION BAR

let a=document.getElementById("icon")
let b=document.getElementById("search")
a.addEventListener('click',()=>{
b.classList.toggle("hidden")
})

let c=document.getElementById("bar")
let d=document.getElementById("sidebar")
c.addEventListener('click',()=>{
d.classList.toggle("hidden")
})

// NAVIGATION BAR

const carousel3Dswiper = new Swiper(".carousel-3D-swiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true
    },
		 navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination"
    }
  });

  var swiper = new Swiper(".progress-slide-carousel", {
    loop: true,
    fraction: true,
    autoplay: {
      delay: 1200,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".progress-slide-carousel .swiper-pagination",
      type: "progressbar",
    },
    });