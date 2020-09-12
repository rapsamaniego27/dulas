<!-- Heading -->
#  Dulas

<!-- Description -->
**Dulas** is a Javascript Slider Library made customizable for Developers to manipulate the code from the in and out.

This library is heavily inspired by Kevin Powell's style of arranging the slides, Dev Ed's style of making it an infinite slider and I threw in my own custom made functions like `gotoSlide(i)`. 


## Getting Started
The **container** doesn't get read by the library but it is important for it to exist so that you may set its main Width and Height in the CSS.

The **row** and **track** classes are vital as the library looks for these elements and later on the **slides** inside it, then loops it through.


```HTML
<!-- Container -->
<div class="slide-container">
 <!-- The row which will be used to pass in argument -->
   <div class="slide-row">
    <!-- The Tracker containing all the slides -->
     <div class="slide-track">

       <!-- The Slides -->
       <div class="slide">
         <img src="./images/stock1.jpg" alt="Image" title="Image" class="">
       </div>
       
     </div>

     <!-- Slide Controls is definitely customizable to your own liking-->
     <div class="slide-controls">
       <button id="btnPrev">Previous</button>
       <button id="btnNext">Next</button>
     </div>
   </div>

 </div>
```


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
