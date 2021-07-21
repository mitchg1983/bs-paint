/*******************
 * OUR HELPER CODE *
 *******************/

const gridWidth = 50;
let count = 0;
while (count <= gridWidth * gridWidth) {
  const canvas = document.querySelector(".canvas");
  const div = document.createElement("div");
  div.className = "square color-5";

  //Here I assign a unique ID to each square in the canvas.
  div.id = count + 1;

  canvas.appendChild(div);
  count++;
}

//BRUSH
//
const brush = document.querySelector(".brush div");
const brushSizes = document.querySelectorAll(".brush-type div div");
const brushSizeBoxes = document.querySelectorAll(".bot-size");

brushSizeBoxes.forEach(function (sizeBox) {

  sizeBox.addEventListener('click', function (event) {

    const newSize = sizeBox.classList.item(3);
    // console.log(event);
    // console.log(sizeBox.classList);
    const oldSize = brush.classList.item(2);
    console.log(oldSize);

    brush.classList.remove(oldSize);
    brush.classList.add(newSize);

  });





});

//PALLETE
//
const colors = document.querySelectorAll(".palette-color");

colors.forEach(function (color) {
  color.addEventListener("click", function (event) {
    //Get just the '2nd' class of the element clicked. This is the CSS class which holds the actual color data.
    const newColor = event.target.classList.item(1);

    //Set a variable so we can remove a class, without naming it.
    let oldColor = brush.classList.item(1);
    brush.classList.remove(oldColor);

    //Assign a new second class to the brush: the color we clicked.
    brush.classList.add(newColor);

    //Repeat this process for the brush sizes, below the canvas.
    brushSizes.forEach(function (brushSize) {

      let oldColorSize = brushSize.classList.item(1);

      brushSize.classList.remove(oldColorSize);
      brushSize.classList.add(newColor);

    })

  });
});

//I wanted to use a function here, so I could potentially change the color of something else in the program,
//if it isn't one of the squares/pixels.
//The 'canvas' input is the element that is getting a new background-color.
//'Color' is any element that has your chosen new color.
//***NOTE***//
//If no color input is provided, this will default to using the current brush color.
function paint(surface, color) {
  color === undefined ? (color = brush.classList.item(1)) : "";

  const oldColor = surface.classList.item(1);
  surface.classList.remove(oldColor);
  surface.classList.add(color);
}

//SQUARES
//
const squares = document.querySelectorAll(".canvas div");
let mouseDown = false;

addEventListener("mouseup", function () {
  mouseDown = false;
});

addEventListener("mousedown", function () {
  mouseDown = true;
});

squares.forEach(function (square) {
  //This function will listen for a click, and color that square.
  square.addEventListener("mousedown", function (event) {
    const pixel = event.target;
    paint(pixel);
    mouseDown = false;
    console.log(event);
  });

  //This function will listen for when the cursor enters the square.
  square.addEventListener("mouseenter", function (event) {
    const pixel = event.target;

    //This code adds a small border to the hovered square.
    square.style.border = "1px solid black";
    if (mouseDown === true) {
      paint(pixel);
    }
  });

    //This code removes the small border.
  square.addEventListener("mouseleave", function () {
    square.style.border = null;
  });
});
