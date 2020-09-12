<!-- Heading -->
#  **Dulas.js**

<!-- Description -->
**Dulas** is a basic Javascript Slider Library made customizable for Developers to manipulate the code from the in and out.

This library is heavily inspired by Kevin Powell's style of arranging the slides, Dev Ed's style of making it an infinite slider and I threw in my own custom made functions like `gotoSlide(i)`. 


## Getting Started

The **container** doesn't get read by the library but it is important for it to exist so that you may set its main Width and Height in the CSS. Example CSS below.

```CSS
/* Custom Slides */
.slide-container{
  max-width: 1366px;
  margin: 0 auto;
}
```

The **row** and **track** classes are vital as the library looks for these elements and later on the **slides** inside it, then loops it through.


### Setting up the HTML

```HTML
<!-- Container -->
<div class="slide-container">
 <!-- The row which will be used to pass in argument -->
   <div class="slide-row">
    <!-- The Tracker containing all the slides -->
     <div class="slide-track">

       <!-- The Slides -->
        <div class="slide">
          <img src="https://github.com/rapsamaniego27/dulas/blob/master/images/stock1.jpg?raw=true">
        </div>

        <div class="slide">
          <img src="https://github.com/rapsamaniego27/dulas/blob/master/images/stock2.jpg?raw=true">
        </div>

        <div class="slide">
          <img src="https://github.com/rapsamaniego27/dulas/blob/master/images/stock3.jpg?raw=true">
        </div>
       
     </div>

     <!-- Slide Controls is definitely 
     customizable to your own liking-->
     <div class="slide-controls">
       <button id="btnPrev">Previous</button>
       <button id="btnNext">Next</button>
     </div>
   </div>

 </div>
```

### Instantiating Dulas Object

```Javascript
/* Code javascript here */
const slider = new Dulas({
 /* The SLider Row Element */
 sliderEl: document.querySelector('.slide-row'),

 /* The Controls Elements */
 controls: {
  nextEl: document.querySelector('#btnNext'),
  prevEl: document.querySelector('#btnPrev')
 },

 /* You can set this to true for auto-sliding */
 autoplay: false
});

```


## Under The Hood

### Constructor
The Dulas object grabs 3 elements **sliderEl**, **controls** and **autoplay**.

It first verifies if **sliderEl** is an existing element in the DOM. If it's true, it will declare the variables as well as running the functions, else it will console log an error.

```Javascript
class Dulas{
 constructor({sliderEl, controls, autoplay}){
   /* Verification */
   if(sliderEl instanceof Element){
     /* Variables here */
     

     /* Automatic function runs here*/
     
   }else{
     console.error('No slider passed in');
   }
  
 }
}

```

### Methods

#### **arrange()**
A slide-set is passed in to this method then arranges them accordingly. Which **slideTrack**'s width is calculated by the number of slides there are.

Using the `translate3d(-width, 0, 0)`, we pass in a negative width which makes the sliders move.

Then lastly looping through the **slides** and setting their width by its parent track.

```Javascript
arrange(slides){

}
```

#### **clone()**
This method clones the slide-set appending and prepending on both ends of the slide-set and returns the newSlides array, declaring it above to make an update and calling it below.

`this.newSlides = this.clone(this.slides);`

```Javascript
 clone(slides){
   const cloneFirst = slides[0].cloneNode(true);
   const cloneLast = slides[slides.length - 1].cloneNode(true);

   /* Add clone class to each end */


   /* Inserts the element on each end */
  
   
   /* Returns the new set of slides */
   return newSlides;

 }
```

#### **gotoSlide()**
A method to go to a specific slide by passing a number as long as its in the range of a slider length.

When a value is passed in, it uses it to multiply the width of the **sliderEl** to go to the specific slide.

You may also change the animation of the sliding below.

```Javascript
 gotoSlide(i){
    //slider element multiplies by any integer
    //in this case the counter variable we use
    this.slideTrack.style.transform = `translate3d(-${this.sliderEl.clientWidth * i}px, 0, 0)`;

    //The animation of the sliding
    this.slideTrack.style.transition = `transform 0.4s ease-in-out`;
 }

```

#### **bindControls()**
We bind the Next / Prev clicks and a transitionend listener which makes Infinite Sliding possible. 

For both Next and Prev Click listeners we make sure to either increase or decrease the `this.counter` variable in the constructor variable and we pass in the counter to `gotoSlide(counter)`. Then we make some adjustments to pass in the **current** class.

For Transition End listener, when a transition ends, we check run this method `this.checkFirstOrLast(this.counter)` to see if the slide is in the last Element or first element passing in the current **counter**

```Javascript
 /* Next click, Prev click and transitionend */
 bindControls(){
    /* Next Button */
    this.controls.nextEl.addEventListener('click', (e)=> { 
     
    });

    /* Previous Button */
    this.controls.prevEl.addEventListener('click', (e) => {
    
  });

    /* Detects if its in the last or first clone 
       which makes infinite slide possible
    */

    this.slideTrack.addEventListener('transitionend', ()=> {
     
     /* Uses this function to check if its in either of the cloned elements */
    
    });
 }

```

#### **checkFirstOrLast()**
This method checks if the slide element is in the **first clone** or **last clone**

We pass in the **number** or **counter** in this method.

```Javascript
/* Checks if slide is in the cloned element */
 checkFirstOrLast(i){
    /* If Counter is larger than the number of slides */
    

    /* If counter is 0 */
    
  
 }
```

#### **checkFirstOrLast()**
This library will run the **autoSlide** method.

When **autoplay** is set to true, it will trigger a click on the **this.controls.nextEl** element.

```Javascript
 autoSlide(condition){
   if(condition == true){
     setInterval(() => {
       this.controls.nextEl.click();
     }, 2000);
   }
 }
```

#### **freeze()**
This method passes in 2 arguments, **condition** and an **element** to freeze.

If condition is set to true, it will add a **freeze** class to the element, else it will remove it..

```Javascript
/* Freezes a click event adding a pointer-events none */
 freeze(condition, element){
  if(condition == true){
   element.classList.add('dulas--freeze');
  }else{
   setTimeout(element.classList.remove('dulas--freeze'), 500);
  }
 }
```

I made this method for End users not to spam clicks on the Slider as it ruins the Design and Code of the Slider. So making it freeze on click gives a delay that will prevent them from spamming the clicks.

```Javascript
/* Adding the freeze class on click */
this.freeze(true, this.controls.nextEl);

/* Removing the freeze class after transition ends */
this.freeze(false, this.controls.nextEl);
```

#### **autoResize()**
This is automatically run in the **constructor** above.
Whenever a window is resized, it runs the `arrange()` method for the slides to respond accordingly to the screen.

```Javascript
/* Auto resizes the slides when it shrinks */
autoResize(){
  window.addEventListener('resize', () => {
    this.arrange(this.newSlides);
  });
}
```

#### **setClasses()**
Sets default classes for this plugin

```Javascript
setClasses(){
  this.sliderEl.classList.add('dulas-row');
  this.slideTrack.classList.add('dulas-track');
  
  this.newSlides.forEach(slide => {
   slide.classList.add('dulas-slide');
  });
}

```

#### **delayArrange()**
It's like the `arrange()` method, however this one gives a delay upon a windows reload.. 

Without this delay, the window calculates the **clientWidth** very differently and gives an inaccurate value of the slider element width.

```Javascript
delayArrange(slides){
  setTimeout(window.onload = ()=>{
    this.arrange(slides);
  }, 10);
}
```

## **Styling**
Dulas injects its own CSS to the elements **row**, **track** and **slide**

### **dulas-row**
The width of this is a 100% of the **container** e element that you constructed. This is why the container element must be set before this.

```CSS
.dulas-row{
  width:100%;
  display: block;
  overflow: hidden;
  position: relative;
}
```

### **dulas-track**
This contains the slides and for that its position needs to be relative, so that it does not move, and stays in place.
```CSS
.dulas-track{
  position: relative;
}

```

### **dulas-slide**
Slides are floated left and has a display of block.

```CSS
.dulas-slide{
 float: left;
 display: block;
}
```

### **dulas-freeze**
A modifier to halt an element from clicking.
```CSS
.dulas--freeze{
 pointer-events:none;
}
```




