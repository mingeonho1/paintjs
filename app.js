const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const Initial_color = "rgb(0, 0, 0)";
const saveBtn = document.getElementById("JsSave");

canvas.width = 1000;
canvas.height = 700;

ctx.fillStyle="white";
ctx.fillRect(0,0,1000,700);
ctx.strokeStyle = Initial_color;
ctx.fillStyle = Initial_color;
ctx.lineWidth = 2.5; 

let painting = false;
let filling = false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeClick(){
    if(filling === true){
        filling = false;
        mode.innerHTML = "Fill";
    } else {
        filling = true;
        mode.innerHTML = "Paint"
    }
}

function canvasClick(){
    if(filling){
        ctx.fillRect(0,0,1000,700);
    }
}

function rightClick(event){
    event.preventDefault();
}

function saveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "®PAINTING";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", rightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", changeRange);
}

if(mode){
    mode.addEventListener("click", modeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", saveClick)
}