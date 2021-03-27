//目前空橢圓 擦子 以及隱藏 無法
var canvas = document.createElement("canvas");
canvas.id = "canvas";
//canvas = document.getElementById('canvas');
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
//canvas.height = window.innerHeight;
canvas.height = height;
canvas.width = window.innerWidth;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
//ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
var button_donothing = document.createElement("div");
function createELE(tag,classname,id){
    var ret = document.createElement(tag);
    ret.className +=classname;
    ret.id = id;
    ret.style.zIndex='999999';
    return ret;
}
var main_wrapper = createELE("div","main_wrapper","");
var button_wrapper = createELE("div","button_wrapper","");
var button_donothing = createELE("div","button","donothing");
var button_download = createELE("div","button","download");
var button_hide = createELE("div","button","hide");
var button_fill = createELE("div","button","fill");
var button_pen = createELE("div","button","pen");
var button_eraser = createELE("div","button","eraser");
var button_rectangle = createELE("div","button","rectangle");
var button_circle = createELE("div","button","circle");
var button_sprinkle = createELE("div","button","sprinkle");
button_donothing.textContent='無';
button_download.textContent='載';
button_hide.textContent='藏';
button_fill.textContent='滿';
button_pen.textContent='筆';
button_eraser.textContent='擦';
button_rectangle.textContent='方';
button_circle.textContent='圓';
button_sprinkle.textContent='噴';
button_wrapper.style.zIndex='999998';
button_wrapper.appendChild(button_donothing);
button_wrapper.appendChild(button_download);
button_wrapper.appendChild(button_hide);
button_wrapper.appendChild(button_fill);
button_wrapper.appendChild(button_pen);
button_wrapper.appendChild(button_eraser);
button_wrapper.appendChild(button_rectangle);
button_wrapper.appendChild(button_circle);
button_wrapper.appendChild(button_sprinkle);
main_wrapper.appendChild(button_wrapper);
var color_picker_wrapper = createELE("div","color_picker_wrapper","");
var color_button_black = createELE("div","color_button","black");
var color_button_white = createELE("div","color_button","white");
var color_button_red = createELE("div","color_button","red");
var color_button_orange = createELE("div","color_button","orange");
var color_button_yellow = createELE("div","color_button","yellow");
var color_button_green = createELE("div","color_button","green");
var color_button_blue = createELE("div","color_button","blue");
var color_button_purple = createELE("div","color_button","purple");
color_picker_wrapper.style.zIndex='999998';
canvas.style.zIndex='999990';
color_picker_wrapper.appendChild(color_button_black);
color_picker_wrapper.appendChild(color_button_white);
color_picker_wrapper.appendChild(color_button_red);
color_picker_wrapper.appendChild(color_button_orange);
color_picker_wrapper.appendChild(color_button_yellow);
color_picker_wrapper.appendChild(color_button_green);
color_picker_wrapper.appendChild(color_button_blue);
color_picker_wrapper.appendChild(color_button_purple);
main_wrapper.appendChild(color_picker_wrapper);
main_wrapper.appendChild(canvas);
var body = document.getElementsByTagName("body")[0];
body.appendChild(main_wrapper);



var canvas_select = document.querySelector('.canvas');
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
document.getElementById("donothing").addEventListener("click",()=>{
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
document.getElementById("hide").addEventListener("click",()=>{
    hide_or_not=!hide_or_not;
    if(hide_or_not){
        document.getElementById('canvas').style.display='none';
    }else{
        document.getElementById('canvas').style.display='block';    
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
        //$('#fill').css('background-image',"url('images/fill.png')");
        document.getElementById('fill').textContent='滿';
        console.log('fill mode');
    }else{
        //$('#fill').css('background-image',"url('images/not_fill.png')");
        document.getElementById('fill').textContent='空';
        console.log('unfill mode');
    }
});
document.getElementById("pen").addEventListener('click',()=>{
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