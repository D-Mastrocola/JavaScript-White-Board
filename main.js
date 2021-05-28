let points = [];

let brushType = "CIRCLE";
let backgroundColor = 255;
let colorInput = document.getElementById("color-picker");
let color = colorInput.value;
let brushSizeText = document.getElementById("brush-size-output");
let brushSizeSlider = document.getElementById("brush-size");

let brushSize = brushSizeSlider.value;
function setup() {
  createCanvas(windowWidth, windowHeight - 70);
  background(backgroundColor);
}
function mouseReleased() {
  points = [];
}
function draw() {
  if (mouseIsPressed && mouseY >= 0) {
    points.push({ x: mouseX, y: mouseY });
    if (points.length > 2) points.shift();
    fill(color);
    noStroke();
    for (let i = 1; i < points.length; i++) {
      let vector = createVector(points[i].x, points[i].y);
      vector.sub(points[i - 1].x, points[i - 1].y);
      let incVector = vector.copy();
      incVector.normalize();
      incVector.mult(2);
      let distance = incVector.copy();
      do {
        let newX = points[i].x - distance.x;
        let newY = points[i].y - distance.y;
        if (brushType === "CIRCLE") {
          ellipse(newX, newY, brushSize);
        }
        if (brushType === "SQUARE") {
          rect(newX - brushSize/2, newY -brushSize/2, brushSize, brushSize);
        }
        if (brushType === "ERASER") {
            fill(backgroundColor);
            ellipse(newX, newY, brushSize / 2);
          }
        distance.add(incVector);
      } while (distance.mag() < vector.mag());
      if (brushType === "CIRCLE") {
        ellipse(mouseX, mouseY, brushSize / 2);
      }
      if (brushType === "SQUARE") {
        rect(mouseX - brushSize/2, mouseY -brushSize/2, brushSize, brushSize);
      }
      if (brushType === "ERASER") {
        fill(backgroundColor);
        ellipse(mouseX, mouseY, brushSize);
      }
      dist;
    }
  }
}
function setBrushType(type) {
  brushType = type;
}

brushSizeSlider.oninput = function () {
  brushSizeText.innerHTML = this.value;
  brushSize = this.value;
};
colorInput.oninput = function () {
  color = colorInput.value;
};
