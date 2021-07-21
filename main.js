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
const canvas = document.querySelector(".canvas");

brushSizeBoxes.forEach(function (sizeBox) {
  sizeBox.addEventListener("click", function (event) {
    brush.classList.replace(getSize(brush), getSize(sizeBox));
  });
});

function getColor(inp) {
  return inp.classList.item(1);
}

function getSize(inp) {
  return inp.classList.item(2);
}

//PALLETE
//
const colors = document.querySelectorAll(".palette-color");

colors.forEach(function (color) {
  color.addEventListener("click", function (event) {
    brush.classList.replace(getColor(brush), getColor(event.target));
    brushSizes.forEach(function (brushSize) {
      brushSize.classList.replace(getColor(brushSize), getColor(event.target));
    });
  });
});

//The 'surface' input is the element that is getting a new background-color.
function paint(surface) {
  surface.classList.replace(getColor(surface), getColor(brush));
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
    mouseDown = false;
    if (getSize(brush) === "small-brush") {
      const pixel = event.target;
      paint(pixel);
    }

    if (getSize(brush) === "medium-brush") {
      const pixel = event.target;
      const pixelID = Number(event.target.id);
      paint(pixel);

      let mediumArr = [];

      mediumArr.push(document.getElementById(pixelID - 50));
      mediumArr.push(document.getElementById(pixelID + 50));
      mediumArr.push(document.getElementById(pixelID - 1));
      mediumArr.push(document.getElementById(pixelID + 1));

      console.log(mediumArr);

      for (const square of mediumArr) {
        paint(square);
      }
    }
  });

  function mediumCheck(id) {
    if (id % 50 === 0 || (id - 1) % 50 === 0) {
      return false;
    } else {
      return true;
    }
  }

  //This function will listen for when the cursor enters the square.
  square.addEventListener("mouseenter", function (event) {
    const pixel = event.target;

    //This code adds a small border to the hovered square.
    square.style.border = "1px solid black";
    if (mouseDown === true && getSize(brush) === "small-brush") {
      paint(pixel);
    }

    if (mouseDown === true && getSize(brush) === "medium-brush") {
      const pixelID = Number(event.target.id);
      paint(pixel);

      // console.log(mediumCheck(pixelID));
      // console.log(typeof (mediumCheck(pixelID)));

      if (mediumCheck(pixelID)) {
        let mediumArr = [];
        mediumArr.push(document.getElementById(pixelID - 50));
        mediumArr.push(document.getElementById(pixelID + 50));
        mediumArr.push(document.getElementById(pixelID - 1));
        mediumArr.push(document.getElementById(pixelID + 1));
        for (const square of mediumArr) {
          paint(square);
        }
      }
      // if (mediumCheck(pixelID)) {
      // }
    }
  });

  //This code removes the small border.
  square.addEventListener("mouseleave", function () {
    square.style.border = null;
  });
});
