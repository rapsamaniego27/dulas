/* Code javascript here */
const slider = new Dulas({
 sliderEl: document.querySelector('.slide-row'),

 controls: {
  nextEl: document.querySelector('#arrowRight'),
  prevEl: document.querySelector('#arrowLeft')
 },

 autoplay: false
});


const slider2 = new Dulas({
 sliderEl: document.querySelector('.greetings-row'),

 controls: {
  nextEl: document.querySelector('#btnNext'),
  prevEl: document.querySelector('#btnPrev')
 },

 autoplay: false
});