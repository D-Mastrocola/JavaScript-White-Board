let points = [];

let brushType = 'CIRCLE';
let backgroundColor = 255;
let colorInput = document.getElementById("color-picker");
let color = colorInput.value;
let brushSizeText = document.getElementById('brush-size-output');
let brushSizeSlider = document.getElementById('brush-size');

let brushSize = brushSizeSlider.value;
function setup() {
  createCanvas(windowWidth, windowHeight - 70);
  background(backgroundColor);
}
function mouseReleased() {
  print(points);
  points = [];
}
function draw() {
  if (mouseIsPressed && mouseY >= 0) {
    points.push({ x: mouseX, y: mouseY });
    noFill();
    stroke(color);
    strokeWeight(brushSize);
    strokeJoin(BEVEL)
    if(brushType === 'SQUARE') strokeCap(SQUARE);
    if(brushType === 'CIRCLE') strokeCap(ROUND);
    if(brushType === 'ERASER')  {
        strokeCap(ROUND);
        stroke(backgroundColor)
    }
    
    beginShape();
    for (let i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    endShape();
  }
}
function setBrushType(type) {
    brushType = type;
}

brushSizeSlider.oninput = function() {
    brushSizeText.innerHTML = this.value;
    brushSize = this.value;
};
colorInput.oninput = function() {
    color = colorInput.value;
}