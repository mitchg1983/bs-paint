/*******************
 * OUR HELPER CODE *
*******************/

/*
 * Here we add the squares to the canvas dynamically.
 * You can mostly leave this section alone!
 * But if you want to change how wide the canvas is,
 * there are just two steps:
 * 
 * 1. Change the `gridWidth` value below.
 * 2. Change the `grid-template-rows` and
 * `grid-template-columns` to match.
 *
 * To make the second one happen, the number to change
 * is the first argument to `repeat`, currently set at 10.
 */
const gridWidth = 10;
let count = 0;
while (count <= gridWidth * gridWidth) {
  const canvas = document.querySelector('.canvas');
  const div = document.createElement('div');
  div.className = 'square color-5';
  canvas.appendChild(div);
  count++;
}


//BRUSH
//
const brush = document.querySelector('.brush div');


//PALLETE
//
//This selects the five color options.
const colors = document.querySelectorAll('.palette-color');

//Loop through all the color options, assign them all an event listener.
colors.forEach(function (color){
  color.addEventListener('click', function (event) {
    //Upon clicking a color, get the list of all the classes associated with the chosen element.
    //More specifically, get just the '2nd' class of the element. This should always be the color.
    const newColor = event.target.classList.item(1);

    //Set a variable so we can remove a class, without naming it.
    let oldColor = brush.classList.item(1);
    brush.classList.remove(oldColor);

    //Assign a new second class to the brush, the color we clicked.
    brush.classList.add(newColor);
  })
})


function paint(canvas, color) {

  const oldColor = canvas.classList.item(1);
  
  canvas.classList.remove(oldColor);

  canvas.classList.add(color);
}



//SQUARES
//
const squares = document.querySelectorAll('.canvas div');

squares.forEach(function (square) {
  square.addEventListener('click', function (event) {

    const currentColor = brush.classList.item(1);
    const oldColor = event.target.classList.item(1);



  })
})










































// You probably should NOT do these in the order below.
// That is, you probably should NOT do all the queries,
// THEN all the functions,
// THEN all the wiring.

// Instead, it'll be easier if you go one action at a time!
// So, add a query for the palette colors.
// THEN add an event listener function for what happens when one is clicked.
// THEN wire those two together, so that when the palette elements are clicked,
// the function runs.
//
// And proceed from there to getting the squares working.
//

// ALSO.
// You do not have to follow the sections below. If you're doing your functions inline, it doesn't make a lot of sense to separate the event listener functions from their wiring!

/***********
 * QUERIES *
***********/

// Add queries for all your squares, palette colors, and brush here.
// (Note the singular or plural used in that sentence!)



/****************************
 * EVENT LISTENER FUNCTIONS *
****************************/

// Now add some functions to handle clicking one particular square
// and clicking one particular palette color. You can leave them
// empty at first, though a console.log just to know they're being
// run as event listeners (after the next step is set up) isn't a
// bad idea for testing purposes.



/**************************
 * WIRING IT ALL TOGETHER *
**************************/

// Now: wiring up our event listeners to our html node elements.
// You'll need to add the appropriate event listener for each
// square and for each palette color from the functions you
// wrote above.
