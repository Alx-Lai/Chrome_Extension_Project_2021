var now_url = window.location.href;
const key = "PainterExtensionKey";
var now_data_array = {};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var input_set = new Set();
var jsonfile = {};
//get local 
chrome.storage.local.get("PainterExtensionKey", function (obj) {
    //read storage data
    jsonfile=obj;
    if(obj[key]!=null){
        now_data_array = JSON.parse(obj[key]);
    }
    console.log(now_data_array);
    
    //canvas part
    if(now_data_array[now_url]!=null&&now_data_array[now_url]['canvas']!=null){
        var image = new Image();
        image.onload = function(){
            ctx.drawImage(image,0,0);
        }
        image.src = now_data_array[now_url]['canvas'];
    }else{
        console.log('fail to load canvas');
    }
    
    //input part
    if(now_data_array[now_url]!=null&&now_data_array[now_url]['input_num']!=null){
        var input_num = now_data_array[now_url]['input_num'];
        for(var i=0;i<input_num;i++){
            var new_input_container = document.createElement('div');
            var new_input = document.createElement('input');
            var new_input_close_button = document.createElement('button');
            new_input_container.appendChild(new_input);
            new_input_container.appendChild(new_input_close_button);
            new_input_container.className='input_container';
            new_input_container.id='input_container'+i;
            new_input.id='input'+i;
            new_input.setAttribute('type','text');
            new_input.className='Text';
            new_input.style.color=now_data_array[now_url]['input_color'+i];
            new_input.style.top=now_data_array[now_url]['input_top'+i];
            new_input.style.left=now_data_array[now_url]['input_left'+i];
            new_input.value=now_data_array[now_url]['input_text'+i];
            new_input_close_button.className='input_close_button';
            new_input_close_button.id='input_close_button'+i;
            main_wrapper.appendChild(new_input_container);
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
                input_set.delete(temp);
            }
            input_set.add(i);
            input_id_counter++;
        }
    }else{
        console.log('fail to load text');
    }
    
});

function add_data(new_url, new_key,new_value){
    if(now_data_array[new_url]==null){
        now_data_array[new_url]={};
    }
    now_data_array[new_url][new_key] = new_value;
    console.log(now_data_array);
    //console.log(now_data_array[new_url][new_key]);
    var json_data = JSON.stringify(now_data_array);
    jsonfile[key] = json_data;
    chrome.storage.local.set(jsonfile, function(){
        console.log('Saved', key, json_data);
    });
};
document.getElementById('save').addEventListener('click',()=>{
    add_data(now_url, 'canvas',canvas.toDataURL());
    console.log('input_set size'+ input_set.size);
    /*input_set.forEach(function(val) {
        console.log(val);
        console.log(document.getElementById('input'+val).value);
    });*/
    add_data(now_url,'input_num',input_set.size);
    var counter = 0;
    input_set.forEach(function(value) {
        var input_ele = document.getElementById('input'+value);
        add_data(now_url,'input_color'+counter,input_ele.style.color);
        add_data(now_url,'input_top'+counter,input_ele.style.top);
        add_data(now_url,'input_left'+counter,input_ele.style.left);
        add_data(now_url,'input_text'+counter,input_ele.value);
        counter++;
    });
    console.log(now_data_array);
    chrome.storage.local.get("PainterExtensionKey", function (obj) {
        console.log(obj);
    });
});
document.getElementById('clearAll').addEventListener('click',()=>{
    chrome.storage.local.clear();
    console.log('clear');
});