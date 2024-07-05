const colorPicker=document.getElementById('textColor')
const canvasColor=document.getElementById('canvasColor');
const fontSize=document.getElementById('fontSize');
const canvas=document.getElementById('myCanvas');
const clearBtn=document.getElementById('clearBtn');
const saveBtn=document.getElementById('saveBtn');
const retrieveBtn=document.getElementById('retrieveBtn');
const ctx=canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    // Function to resize the canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.8; // 80% of the window's width
        canvas.height = window.innerHeight * 0.5; // 60% of the window's height
    }

    // Initial resize
    resizeCanvas();

    // Resize the canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);
});
colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle= e.target.value;
    ctx.fillStyle=e.target.value;
})

canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    lastX=event.offsetX;
    lastY=event.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX=event.offsetX;
        lastY=event.offsetY;
    }
})

canvas.addEventListener('mouseup',()=>{
    isDrawing=false;
})

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const touch = e.touches[0];
    lastX = touch.clientX - canvas.offsetLeft;
    lastY = touch.clientY - canvas.offsetTop;
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        e.preventDefault();
        const touch = e.touches[0];
        drawLine(lastX, lastY, touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        lastX = touch.clientX - canvas.offsetLeft;
        lastY = touch.clientY - canvas.offsetTop;
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

canvasColor.addEventListener('change',(e)=> {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value;
})

clearBtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveBtn.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');

    link.download='my-canvas.png';

    link.href=canvas.toDataURL();

    link.click();
})

retrieveBtn.addEventListener('click',()=>{
    let savedCanvas=localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img=new Image();
        img.src=savedCanvas;
        ctx.drawImage(img,0,0);
    }
})

