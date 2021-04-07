var canvas = document.getElementById('canvas');
var canvas_x = canvas.getBoundingClientRect().left;
var canvas_y = canvas.getBoundingClientRect().top;
var mode = 'rectangle';
var fill_or_not = true;
var hide_or_not = false;
var ctx;
var color = 'black';
var input_id_counter = 0;
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
        canvas.addEventListener("mousemove",erase);
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
                ctx.stroke();
            }
        }else if(mode=='text'){
            var new_input_container = document.createElement('div');
            var new_input = document.createElement('input');
            var new_input_close_button = document.createElement('button');
            new_input_container.appendChild(new_input);
            new_input_container.appendChild(new_input_close_button);
            new_input_container.className='input_container';
            new_input_container.id='input_container'+input_id_counter;
            new_input.id='input'+input_id_counter;
            new_input.setAttribute('type','text');
            new_input.className='Text';
            new_input.style.color=color;
            new_input.style.top=e.pageY;
            new_input.style.left=e.pageX;
            new_input_close_button.className='input_close_button';
            new_input_close_button.id='input_close_button'+input_id_counter;
            main_wrapper.appendChild(new_input_container);
            new_input.focus();
            var position_info = new_input.getBoundingClientRect();
            new_input_close_button.style.top=position_info.top;
            new_input_close_button.style.left = position_info.left+position_info.width;
            new_input_close_button.onclick = function(){
                this.parentElement.remove();
                var temp=0;
                for(var i=18;i<this.id.length;i++){
                    temp*=10;
                    temp+=parseInt(this.id[i]);
                }
                //console.log('temp'+temp);
                input_set.delete(temp);
            }
            input_set.add(input_id_counter);
            input_id_counter++;
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
document.getElementById('text').addEventListener('click',()=>{
    mode='text';
});
document.getElementById('clean').addEventListener('click',()=>{
   ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight); 
});
document.getElementById('fill').addEventListener('click',()=>{
    fill_or_not=!fill_or_not;
    if(fill_or_not){
        document.getElementById('fill').textContent='滿';
        console.log('fill mode');
    }else{
        document.getElementById('fill').textContent='空';
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
document.getElementById('color_picker').addEventListener('change',()=>{
    var c_temp = document.getElementById('color_picker').value;
    color = c_temp;
    ctx.fillStyle = c_temp;
    ctx.strokeStyle = c_temp;
    
})
/*document.getElementById('black').addEventListener('click',()=>{
    console.log('black');
    color = 'black';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
});
document.getElementById('white').addEventListener('click',()=>{
    console.log('white');
    color='white';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
});
document.getElementById('red').addEventListener('click',()=>{
    console.log('red');
    color='red';
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
});
document.getElementById('orange').addEventListener('click',()=>{
    console.log('orange');
    color='orange';
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'orange';
});
document.getElementById('yellow').addEventListener('click',()=>{
    console.log('yellow');
    color='yellow';
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
});
document.getElementById('green').addEventListener('click',()=>{
    console.log('green');
    color='green';
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
});
document.getElementById('blue').addEventListener('click',()=>{
    console.log('blue');
    color='blue';
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
});
document.getElementById('purple').addEventListener('click',()=>{
    console.log('purple');
    color='purple';
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'purple';
});*/