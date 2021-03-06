var canvas = document.getElementById('canvas');
var canvas_x = canvas.getBoundingClientRect().left;
var canvas_y = canvas.getBoundingClientRect().top;
var mode = 'rectangle';
var fill_or_not = true;
var hide_or_not = false;
var ctx;
if(canvas.getContext){
    ctx = canvas.getContext("2d");
}else{
    console.log("failed to use canvas");
}
var mouseX=0;
var mouseY =0;
var offsetX=0;
var offsetY=0;
var isDown=false;
canvas.addEventListener("mousedown",function(e){
    [mouseX,mouseY]=[e.pageX-canvas_x,e.pageY-canvas_y];
    console.log(mouseX,mouseY);
    isDown=true;
    console.log('mouse down');
    if(mode == "eraser"){
        canvas_select.addEventListener("mousemove",erase);
    }else if(mode == 'pen'){
        ctx.beginPath();
        ctx.moveTo(mouseX,mouseY);
        canvas.addEventListener("mousemove",pen_draw);
    }else if(mode =='sprinkle'){
        sprinkle_event();
        canvas.addEventListener("mousemove",sprinkle_refresh);
    }
});
canvas.addEventListener("mouseup",function(e){
    offsetX = e.pageX-canvas_x;
    offsetY = e.pageY-canvas_y;
    console.log(offsetX,offsetY);
    if(isDown){
        if(mode=='rectangle'){
            if(fill_or_not){
                ctx.fillRect(mouseX,mouseY,offsetX-mouseX,offsetY-mouseY);
            }else{
                ctx.strokeRect(mouseX,mouseY,offsetX-mouseX,offsetY-mouseY);
            }
        }else if(mode =='circle'){
            ctx.beginPath();
            ctx.ellipse((mouseX+offsetX)/2,(mouseY+offsetY)/2,(offsetX-mouseX)/2,(offsetY-mouseY)/2,0,0,2*Math.PI);
            if(fill_or_not){
                ctx.fill();   
            }else{
                ctx.stroke(e);
            }
        }
    }
    canvas.removeEventListener("mousemove",erase);
    canvas.removeEventListener("mousemove",pen_draw);
    canvas.removeEventListener("mousemove",sprinkle_refresh);
    isDown=false;
    console.log("mouse up");
});
function erase(e){
    offsetX = e.pageX-canvas_x;
    offsetY = e.pageY-canvas_y;
    if(isDown){
        ctx.clearRect(offsetX-10,offsetY-10,20,20);
    }
}
function pen_draw(e){
    offsetX = e.pageX-canvas_x;
    offsetY = e.pageY-canvas_y;
    ctx.lineTo(offsetX,offsetY);
    ctx.stroke();
}
function sprinkle_event(){
    if(isDown){
        const r = 20;
        for(var i=0;i<30;i++){
            var dr = Math.random()*r;
            var theta = Math.random()*2*Math.PI;
            var dx = dr*Math.cos(theta);
            var dy = dr*Math.sin(theta);
            ctx.fillRect(mouseX+dx,mouseY+dy,1,1);
        }
        setTimeout('sprinkle_event()',50);
    }
}
function sprinkle_refresh(e){
    [mouseX,mouseY]=[e.pageX-canvas_x,e.pageY-canvas_y];
}
document.getElementById('donothing').addEventListener("click",()=>{
    mode = 'donothing';
    console.log('donothing mode');
});
document.getElementById('download').addEventListener('click',()=>{
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
    link.remove();
});
document.getElementById('hide').addEventListener("click",()=>{
    hide_or_not=!hide_or_not;
    if(hide_or_not){
        canvas.style.display='none';
        console.log("hide!");
    }else{
        canvas.style.display='block';
        console.log("show!");
    }
});
document.getElementById('eraser').addEventListener('click',()=>{
    mode = 'eraser';
    console.log('eraser mode');
});
document.getElementById('sprinkle').addEventListener('click',()=>{
   mode = 'sprinkle'; 
});
document.getElementById('fill').addEventListener('click',()=>{
    fill_or_not=!fill_or_not;
    if(fill_or_not){
        document.getElementById('fill').textContent='???';
        console.log('fill mode');
    }else{
        document.getElementById('fill').textContent='???';
        console.log('unfill mode');
    }
});
document.getElementById('pen').addEventListener('click',()=>{
    mode = 'pen';
    console.log("pen mode");
});
document.getElementById('rectangle').addEventListener('click',()=>{
    mode = 'rectangle';
    console.log('rectangle mode');
});
document.getElementById('circle').addEventListener('click',()=>{
    mode = 'circle';
    console.log('circle mode'); 
});
document.getElementById('black').addEventListener('click',()=>{
    console.log('black');
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
});
document.getElementById('white').addEventListener('click',()=>{
    console.log('white');
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
});
document.getElementById('red').addEventListener('click',()=>{
    console.log('red');
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
});
document.getElementById('orange').addEventListener('click',()=>{
    console.log('orange');
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'orange';
});
document.getElementById('yellow').addEventListener('click',()=>{
    console.log('yellow');
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
});
document.getElementById('green').addEventListener('click',()=>{
    console.log('green');
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
});
document.getElementById('blue').addEventListener('click',()=>{
    console.log('blue');
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
});
document.getElementById('purple').addEventListener('click',()=>{
    console.log('purple');
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'purple';
});