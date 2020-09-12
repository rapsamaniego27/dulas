class Dulas{
 constructor({sliderEl, controls, autoplay}){
   if(sliderEl instanceof Element){
     this.sliderEl = sliderEl;
     this.slideTrack = this.sliderEl.children[0];
     this.slides = Array.from(this.slideTrack.children);
     this.controls = controls;
     this.autoplay = autoplay
     this.counter = 1;

     /* Automatic runs */
     this.newSlides = this.clone(this.slides);
     this.delayArrange(this.newSlides);
     this.setClasses();
     this.bindControls();
     this.autoSlide(this.autoplay);
     this.autoResize();
   }else{
     console.error('No slider passed in');
   }
  
 }

 /* Arranges the slides */
arrange(slides){

   slides[1].classList.add('dulas--current');

   //Sets the overall width of Slide track based on how many slides there
   this.slideTrack.style.width = `${this.sliderEl.clientWidth * slides.length}px`;

   this.slideTrack.style.transform = `translate3d(-${this.sliderEl.clientWidth * this.counter}px, 0, 0)`;

   //Each slide will have a width of the Slider Element or Row
   slides.forEach(slide => {
    slide.style.width = `${this.sliderEl.clientWidth}px`;
   });
 
 }


 //Cloning both ends of slides
 //Returns the new set of slides
 clone(slides){
   const cloneFirst = slides[0].cloneNode(true);
   const cloneLast = slides[slides.length - 1].cloneNode(true);

   /* Add clone class to each end */
   cloneFirst.classList.add('dulas--clone');
   cloneLast.classList.add('dulas--clone');

   /* Inserts the element on each end */
   this.slideTrack.appendChild(cloneFirst);
   this.slideTrack.insertBefore(cloneLast, slides[0]);
   
   /* Returns the new set of slides */
   const newSlides = Array.from(this.slideTrack.children);
   return newSlides;

 }

 /* Next click, Prev click and transitionend */
 bindControls(){
    /* Next Button */
    this.controls.nextEl.addEventListener('click', (e)=> { 
      e.preventDefault();
      this.counter++;
      this.gotoSlide(this.counter);

      this.newSlides[this.counter].classList.add('dulas--current');
      this.newSlides[this.counter].previousElementSibling.classList.remove('dulas--current');

      this.freeze(true, this.controls.nextEl);
    });

    /* Previous Button */
    this.controls.prevEl.addEventListener('click', (e) => {
     e.preventDefault();
     this.counter--;
     this.gotoSlide(this.counter);

     this.newSlides[this.counter].classList.add('dulas--current');
     this.newSlides[this.counter].nextElementSibling.classList.remove('dulas--current');
    
     this.freeze(true, this.controls.prevEl);
  });

    /* Detects if its in the last or first clone 
       which makes infinite slide possible
    */

    this.slideTrack.addEventListener('transitionend', ()=> {
     
     /* Uses this function to check if its in either of the cloned elements */
     this.checkFirstOrLast(this.counter); 
     this.freeze(false, this.controls.nextEl);
     this.freeze(false, this.controls.prevEl);
    });
 }

 /* Function to go to a specific slide */
 gotoSlide(i){
    //slider element multiplies by any integer
    //in this case the counter variable we use
    this.slideTrack.style.transform = `translate3d(-${this.sliderEl.clientWidth * i}px, 0, 0)`;

    //The animation of the sliding
    this.slideTrack.style.transition = `transform 0.4s ease-in-out`;
 }


 /* Checks if slide is in the cloned element */
 checkFirstOrLast(i){
    /* If Counter is larger than the number of slides */
    if (i >= this.newSlides.length - 1) {
     this.newSlides[1].classList.add('dulas--current');
     this.newSlides[i].classList.remove('dulas--current');
     this.counter = 1;
     this.gotoSlide(this.counter);

     this.slideTrack.style.transition = `none`;
    }

    /* If counter is 0 */
    if (i <= 0) {
     this.newSlides[this.newSlides.length - 2].classList.add('dulas--current');
     this.newSlides[i].classList.remove('dulas--current');
     this.counter = this.newSlides.length - 2;
     this.gotoSlide(this.counter);

     this.slideTrack.style.transition = `none`;
    }
 }

/* Auto plays the slider */
/* TODO: Add clear interval in the future when hovered */
 autoSlide(condition){
   if(condition == true){
     setInterval(() => {
       this.controls.nextEl.click();
     }, 2000);
   }
 }

 /* Freezes a click event adding a pointer-events none */
 freeze(condition, element){
  if(condition == true){
   element.classList.add('dulas--freeze');
  }else{
   setTimeout(element.classList.remove('dulas--freeze'), 500);
  }
 }

/* Auto resizes the slides when it shrinks */
autoResize(){
  window.addEventListener('resize', () => {
    this.arrange(this.newSlides);
  });
}

/* Sets Default classes of this Dulas plugin */
setClasses(){
  this.sliderEl.classList.add('dulas-row');
  this.slideTrack.classList.add('dulas-track');
  
  this.newSlides.forEach(slide => {
   slide.classList.add('dulas-slide');
  });
}

/* Made a delay because the window calculates width too early  */
delayArrange(slides){
  setTimeout(window.onload = ()=>{
    this.arrange(slides);
  }, 10);
}

}
