/* Code javascript here */
const slider = new Dulas({
 sliderEl: document.querySelector('.slide-row'),

 controls: {
  nextEl: document.querySelector('#btnNext'),
  prevEl: document.querySelector('#btnPrev')
 },

 autoplay: false
});


const slider2 = new Dulas({
 sliderEl: document.querySelector('.greetings-row'),

 controls: {
  nextEl: document.querySelector('#greetNext'),
  prevEl: document.querySelector('#greetPrev')
 },

 autoplay: true
});

const slider3 = new Dulas({
 sliderEl: document.querySelector('.card-row'),

 controls: {
  nextEl: document.querySelector('#cardNext'),
  prevEl: document.querySelector('#cardPrev')
 },

 autoplay: false,
 slidesToScroll:2
});
