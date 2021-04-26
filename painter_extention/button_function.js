
var canvas = document.getElementById('canvas');
var canvas_x = canvas.getBoundingClientRect().left;
var canvas_y = canvas.getBoundingClientRect().top;
var mode = 'donothing';
var fill_or_not = true;
var hide_or_not = false;
var hide_toolbar = false;
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
            new_input.style.position='absolute'+' !important';
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
/*button_hide_toolbar.addEventListener('click',()=>{
    hide_toolbar = !hide_toolbar;
    if(hide_toolbar){
        button_donothing.className = 'Button button_shrink';
        button_download.className = 'Button button_shrink';
        button_hide.className = 'Button button_shrink';
        button_eraser.className = 'Button button_shrink';
        button_sprinkle.className = 'Button button_shrink';
        button_text.className = 'Button button_shrink';
        button_clean.className = 'Button button_shrink';
        button_fill.className = 'Button button_shrink';
        button_pen.className = 'Button button_shrink';
        button_rectangle.className = 'Button button_shrink';
        button_circle.className = 'Button button_shrink';
        button_save.className = 'Button button_shrink';
        button_clear_storage.className = 'Button button_shrink';
    }else{
        button_donothing.className = 'Button button_in';
        button_download.className = 'Button button_in';
        button_hide.className = 'Button button_in';
        button_eraser.className = 'Button button_in';
        button_sprinkle.className = 'Button button_in';
        button_text.className = 'Button button_in';
        button_clean.className = 'Button button_in';
        button_fill.className = 'Button button_in';
        button_pen.className = 'Button button_in';
        button_rectangle.className = 'Button button_in';
        button_circle.className = 'Button button_in';
        button_save.className = 'Button button_in';
        button_clear_storage.className = 'Button button_in';
    }
});*/
button_donothing.addEventListener("click",()=>{
    mode = 'donothing';
    canvas.className='donothing';
    console.log('donothing mode');
});
button_download.addEventListener('click',()=>{
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
});
button_hide.addEventListener("click",()=>{
    hide_or_not=!hide_or_not;
    if(hide_or_not){
        canvas.style.display='none';
        console.log("hide!");
    }else{
        canvas.style.display='block';
        console.log("show!");
    }
});
button_eraser.addEventListener('click',()=>{
    mode = 'eraser';
    canvas.className='eraser';
    console.log('eraser mode');
});
button_sprinkle.addEventListener('click',()=>{
    mode = 'sprinkle';
    canvas.className='sprinkle';
});
button_text.addEventListener('click',()=>{
    mode='text';
    canvas.className='text';
});
button_clean.addEventListener('click',()=>{
   ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight); 
});
button_fill.addEventListener('click',()=>{
    fill_or_not=!fill_or_not;
    if(fill_or_not){
        button_fill.textContent='滿';
        console.log('fill mode');
    }else{
        button_fill.textContent='空';
        console.log('unfill mode');
    }
});
button_pen.addEventListener('click',()=>{
    mode = 'pen';
    canvas.className='pen';
    console.log("pen mode");
});
button_rectangle.addEventListener('click',()=>{
    mode = 'rectangle';
    canvas.className='rectangle';
    console.log('rectangle mode');
});
button_circle.addEventListener('click',()=>{
    mode = 'circle';
    canvas.className='circle';
    console.log('circle mode'); 
});
color_picker.addEventListener('change',()=>{
    var c_temp = document.getElementById('color_picker').value;
    color = c_temp;
    ctx.fillStyle = c_temp;
    ctx.strokeStyle = c_temp;
});



/**
* Drag Element part
**/
// Make the DIV element draggable:
//dragElement();
dragElement(tool_wrapper);
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (button_move) {
    // if present, the header is where you move the DIV from:
    button_move.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = ((elmnt.offsetTop - pos2) > 0 ? (elmnt.offsetTop - pos2) : 0 )+ "px";
    elmnt.style.left = ((elmnt.offsetLeft - pos1) > 0 ? (elmnt.offsetLeft - pos1) : 0h) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}