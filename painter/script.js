var canvas_select = document.querySelector('.canvas');
var canvas = document.getElementById("canvas");
var canvas_x = canvas.getBoundingClientRect().left;
var canvas_y = canvas.getBoundingClientRect().top;
var mode = 'donothing';
var fill_or_not = true;
var hide_or_not = false;
var ctx;
if(canvas.getContext){
    ctx = canvas.getContext("2d");
}else{
    console.log("failed to use canvas");
}
let mouseX=0;
let mouseY =0;
let offsetX=0;
let offsetY=0;
let isDown=false;
canvas_select.addEventListener("mousedown",function(e){
    [mouseX,mouseY]=[e.pageX-canvas_x,e.pageY-canvas_y];
    console.log(mouseX,mouseY);
    isDown=true;
    console.log('mouse down');
    if(mode == "eraser"){
        canvas_select.addEventListener("mousemove",erase);
    }else if(mode == 'pen'){
        ctx.beginPath();
        ctx.moveTo(mouseX,mouseY);
        canvas_select.addEventListener("mousemove",pen_draw);
    }else if(mode =='sprinkle'){
        sprinkle_event();
        canvas_select.addEventListener("mousemove",sprinkle_refresh);
    }
});
canvas_select.addEventListener("mouseup",function(e){
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
    canvas_select.removeEventListener("mousemove",erase);
    canvas_select.removeEventListener("mousemove",pen_draw);
    canvas_select.removeEventListener("mousemove",sprinkle_refresh);
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
        for(var i=0;i<10;i++){
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
$('#donothing').click(()=>{
    mode = 'donothing';
    console.log('donothing mode');
});
$('#download').click(()=>{
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
    link.remove();
});
$('#hide').click(()=>{
    hide_or_not=!hide_or_not;
    if(hide_or_not){
        document.getElementById('canvas').style.display='none';
    }else{
        document.getElementById('canvas').style.display='block';    
    }
});
$('#eraser').click(()=>{
    mode = 'eraser';
    console.log('eraser mode');
});
$('#sprinkle').click(()=>{
   mode = 'sprinkle'; 
});
$('#fill').click(()=>{
    fill_or_not=!fill_or_not;
    if(fill_or_not){
        $('#fill').css('background-image',"url('images/fill.png')");
        console.log('fill mode');
    }else{
        $('#fill').css('background-image',"url('images/not_fill.png')");
        console.log('unfill mode');
    }
});
$('#pen').click(()=>{
    mode = 'pen';
    console.log("pen mode");
});
$('#rectangle').click(()=>{
    mode = 'rectangle';
    console.log('rectangle mode');
});
$('#circle').click(()=>{
    mode = 'circle';
    console.log('circle mode');
});
$('#black').click(()=>{
    console.log('black');
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
});
$('#white').click(()=>{
    ctx.fillStyle = 'white';
    ctx.strokeStyle ='white';
});
$('#red').click(()=>{
    ctx.fillStyle = 'red';
    ctx.strokeStyle ='red';
});
$('#orange').click(()=>{
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'orange';
});
$('#yellow').click(()=>{
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle ='yellow';
});
$('#green').click(()=>{
    ctx.fillStyle = 'green';
    ctx.strokeStyle ='green';
});
$('#blue').click(()=>{
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
});
$('#purple').click(()=>{
    ctx.fillStyle = 'purple';
    ctx.strokeStyle ='purple';
});