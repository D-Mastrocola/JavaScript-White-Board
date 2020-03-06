//Declare variables
const canvas = document.getElementById("artboard");
const ctx = canvas.getContext("2d");
const colorInput = document.getElementById("color-picker");
let brushSizeSlider = document.getElementById("brush-size");
let brushSizeOutput = document.getElementById("brush-size-output");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseClicked = false; 
let mouseReleased = true;
let brushType = "CIRCLE";
let color = "#ff0000";
let brushSize = 20;
let drawPoints = [];
document.addEventListener("mousedown", onMouseClick, false);
document.addEventListener("mouseup", onMouseClick, false);
document.addEventListener("mousemove", onMouseMove);
brushSizeOutput.innerHTML = brushSize;
//Waits for mouse event to execute
function onMouseClick(e) {
    if(e.type == "mousedown") {
        //if the mouse was pressed within the window and not the toolbar then mouseCliked = true
        if(e.clientX > 70) {
            mouseClicked = true;
            drawPoints = [[e.clientX, e.clientY],[e.clientX,e.clientY]];
        }
    } else {
        mouseClicked = false;
    }
}

//Waits for the mouse to move and then draws
function onMouseMove(e) {
    drawPoints[1] = drawPoints[0];
    drawPoints[0] = [e.clientX, e.clientY]; 
    if(mouseClicked) {
        if(document.getElementById("random-colors").checked) {
            ctx.strokeStyle = getRandomColor();
        }else {
            ctx.strokeStyle = color;
        }
        switch (brushType) {
            case "CIRCLE":
                ctx.beginPath();
                ctx.moveTo(...drawPoints[1]);
                ctx.lineTo(...drawPoints[0]);
                ctx.lineWidth = brushSize;
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.stroke();
                break;
            case "SQUARE":
                /*ctx.fillStyle = color;
                ctx.fillRect(e.clientX - (brushSize / 2), e.clientY - (brushSize / 2), brushSize, brushSize);*/
                ctx.beginPath();
                ctx.moveTo(...drawPoints[1]);
                ctx.lineTo(...drawPoints[0]);
                ctx.lineWidth = brushSize;
                ctx.lineJoin = 'miter';
                ctx.lineCap = 'butt';
                ctx.stroke();
                break;
            case "ERASE":
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.moveTo(...drawPoints[1]);
                ctx.lineTo(...drawPoints[0]);
                ctx.lineWidth = brushSize;
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.stroke();
                break;
        }
            
    }
    
}

//Sets the brush type
function setBrushType(str) {
    switch(str) {
        case "CIRCLE":
            brushType = "CIRCLE";
            break;
        case "SQUARE":
            brushType = "SQUARE";
            break;
        case "ERASE":
            brushType = "ERASE";
            break;
        default:
            return;
    }
}
//Creates a random hex color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Takes users input on the brush size and displays it
brushSizeSlider.oninput = function() {
    brushSizeOutput.innerHTML = this.value;
    brushSize = this.value;
};
colorInput.oninput = function() {
    color = colorInput.value;
}