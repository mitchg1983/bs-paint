//Canvas construction code.
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

//Declare global variables.
const brush = document.querySelector(".brush div");

const brushSizes = document.querySelectorAll(".brush-type div div");

const brushSizeBoxes = document.querySelectorAll(".bot-size");

const canvas = document.querySelector(".canvas");

const colors = document.querySelectorAll(".palette-color");

const squares = document.querySelectorAll(".canvas div");

let oldNcolor = '';

let oldScolor = '';

let oldEcolor = '';

let oldWcolor = '';

let oldCcolor = ''

let mouseDown = false;

let justPainted = false;

//Global event listeners, tracking mouse click position.
addEventListener("mouseup", function () {
  mouseDown = false;
});

addEventListener("mousedown", function () {
  mouseDown = true;
});

////////////////
////////////////
////////////////Declare global functions.

//This function returns, as a string, the current background color of the input element.
function getColor(inp) {
  return inp.classList.item(1);
}

//Same as above, but returns the brush size.
function getSize(inp) {
  return inp.classList.item(2);
}

//PAINT FUNCTION - The 'surface' input is the element that is getting a new background-color.
function paint(surface, color) {
  if (color === undefined) {
    surface.classList.replace(getColor(surface), getColor(brush));
  } else {
    surface.classList.replace(getColor(surface), color);
  }
}

//This function takes in one of the squares on the canvas, as an input. Specifically that
//sqaure's 'id', which we set at the beginning of the program. The 'id' of the squares is sequential,
//so some math can determine if the cursor is at, or close to, an edge of the canvas.
function sizeCheck(id) {
  //These statements check the current brush size before performing any calculations.
  if (getSize(brush) === "medium-brush") {
    if (id % 50 === 0) {
      return "right";
    }

    if ((id - 1) % 50 === 0) {
      return "left";
    } else {
      return "clear";
    }
  }
}

//'Highlights' the currenlty hovered square on the canvas.
function cursorBorder(square) {
  square.style.border = "1px solid black";
}

////////////////
////////////////
////////////////Assign functions to the interactable elements of the program.

//Functionality for changing the brush size.
brushSizeBoxes.forEach(function (sizeBox) {
  sizeBox.addEventListener("click", function () {
    brush.classList.replace(getSize(brush), getSize(sizeBox));
  });
});

//Functionality to change the current brush color.
colors.forEach(function (color) {
  color.addEventListener("click", function (event) {
    brush.classList.replace(getColor(brush), getColor(event.target));
    //The above code applies the new color to the brush. The code below will change
    //the color of the brush-sizes on the bottom of the canvas.
    brushSizes.forEach(function (brushSize) {
      brushSize.classList.replace(getColor(brushSize), getColor(event.target));
    });
  });
});

//Painting functionality for the canvas.
squares.forEach(function (square) {
  //////   Listen for a click!   //////
  square.addEventListener("mousedown", function (event) {
    //small-brush
    if (getSize(brush) === "small-brush") {
      const pixel = event.target;
      paint(pixel);
    }

    //medium-brush
    if (getSize(brush) === "medium-brush") {
      const pixel = event.target;
      const pixelID = Number(event.target.id);
      paint(pixel);

      //This array will be filled with the additional squares to paint, due to the larger brush size.
      let mediumArr = [];

      if (sizeCheck(pixelID) === "clear") {
        mediumArr.push(document.getElementById(pixelID - 50));
        mediumArr.push(document.getElementById(pixelID + 50));
        mediumArr.push(document.getElementById(pixelID - 1));
        mediumArr.push(document.getElementById(pixelID + 1));

        //Paint the additional squares in our array.
        for (const square of mediumArr) {
          paint(square);
        }

        //This line helps our shade function for larger brush sizes.
        justPainted = true;
      }
    }

    //Race-Condition fix. The mouseenter eventlistener will not fire.
    mouseDown = false;
  });

  //////   Listen for when the cursor enters the square!   /////
  square.addEventListener("mouseenter", function (event) {
    const pixel = event.target;
    oldCcolor = getColor(square);


    //These two statements help our shade function for larger brush sizes.
    if (mouseDown === false) {
      justPainted = false;
    };

    if (mouseDown === true) {
      justPainted = true;
    };

    //Highlight the 'hovered' square with a thin, black border.
    cursorBorder(square);

    //Highlight the brush size area. Will have no effect if small-brush is selected.
    if (getSize(brush) === "medium-brush") {
      //I assigned each square/pixel of the canvas a unique id - starting at the number 1.
      const pixelID = Number(event.target.id);
      // oldNcolor = '';
      // oldScolor = '';
      // oldEcolor = '';
      // oldWcolor = '';

      if (sizeCheck(pixelID) === "clear") {





        const N = document.getElementById(pixelID - 50);
        oldNcolor = getColor(N);
        paint(N, "cecece");

        const S = document.getElementById(pixelID + 50);
        oldScolor = getColor(S);
        paint(S, "cecece");

        const E = document.getElementById(pixelID - 1);
        oldEcolor = getColor(E);
        paint(E, "cecece");

        const W = document.getElementById(pixelID + 1);
        oldWcolor = getColor(W);
        paint(W, "cecece");
      }

      // if (sizeCheck(pixelID) === "left") {
      //   console.log("we got a left brush");

      //   document.getElementById(pixelID - 50).style.backgroundcolor =
      //     getColor(brush);
      //   document.getElementById(pixelID + 50).style.backgroundcolor =
      //     getColor(brush);
      //   document.getElementById(pixelID + 1).style.backgroundcolor =
      //     getColor(brush);
      // }

      // if (sizeCheck(pixelID) === "right") {
      //   document.getElementById(pixelID - 50).style.backgroundcolor =
      //     getColor(brush);
      //   document.getElementById(pixelID + 50).style.backgroundcolor =
      //     getColor(brush);
      //   document.getElementById(pixelID - 1).style.backgroundcolor =
      //     getColor(brush);
      // }
    }

    //small-brush
    if (mouseDown === true && getSize(brush) === "small-brush") {
      paint(pixel);
    }

    //medium-brush
    if (mouseDown === true && getSize(brush) === "medium-brush") {
      //I assigned each square/pixel of the canvas a unique id - starting at the number 1.
      const pixelID = Number(event.target.id);

      //Same as above, paint the currently hovered pixel.
      paint(pixel);

      //This array will be filled with the additional squares to paint, due to the larger brush size.
      let mediumArr = [];

      //If the sizeCheck function determines the cursor in not at one of the edges of the screen, this will paint
      //all of the pixels in the brush size.
      if (sizeCheck(pixelID) === "clear") {
        mediumArr.push(document.getElementById(pixelID - 50));
        mediumArr.push(document.getElementById(pixelID + 50));
        mediumArr.push(document.getElementById(pixelID - 1));
        mediumArr.push(document.getElementById(pixelID + 1));

        for (const square of mediumArr) {
          paint(square);
        }
      }
      if (sizeCheck(pixelID) === "left") {
        mediumArr.push(document.getElementById(pixelID - 50));
        mediumArr.push(document.getElementById(pixelID + 50));
        mediumArr.push(document.getElementById(pixelID + 1));

        for (const square of mediumArr) {
          paint(square);
        }
      }

      if (sizeCheck(pixelID) === "right") {
        mediumArr.push(document.getElementById(pixelID - 50));
        mediumArr.push(document.getElementById(pixelID + 50));
        mediumArr.push(document.getElementById(pixelID - 1));

        for (const square of mediumArr) {
          paint(square);
        }
      }
    }

    
  });

  //////   Listen for when the cursor EXITS the square!   /////
  //Remove the 'highlight' border from the square we just left.
  square.addEventListener("mouseleave", function (event) {
    square.style.border = null;

    //Remove the lightgray shading, indicating the larger brush-size, and replace it with the previous color.
    //justPainted will stop this 'color replacement' if the user has painted with a large brush size,
    //but not yet left the square.
    if (getSize(brush) === 'medium-brush' && mouseDown === false && justPainted === false) {
      const pixelID = Number(event.target.id);


      if (sizeCheck(pixelID) === "clear") {
      const N = document.getElementById(pixelID - 50);
      paint(N, oldNcolor)

      const S = document.getElementById(pixelID + 50);
      paint(S, oldScolor);

      const E = document.getElementById(pixelID - 1);
      paint(E, oldEcolor);

      const W = document.getElementById(pixelID + 1);
      paint(W, oldWcolor);
    }
  }

  });
});
