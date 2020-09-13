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
