var now_url = window.location.href;
const key = "PainterExtensionKey";
var now_data_array = {};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//get local 
chrome.storage.local.get("PainterExtensionKey", function (obj) {
    if(obj[key]!=null){
        now_data_array = JSON.parse(obj[key]);
    }
    console.log(now_data_array);
    if(now_data_array['URL']!=null){
        var image = new Image();
        image.onload = function(){
            ctx.drawImage(image,0,0);
        }
        image.src = now_data_array['URL'];
    }else{
        console.log('fail to load file');
    }
    /*if(now_data_array['URL']!=null){
        ctx.drawImage(now_data_array['URL'],0,0);
    }else{
        console.log('fail to load file');
    }*/
});

function add_data(new_key, new_value){
    var key = "PainterExtensionKey";
    now_data_array[new_key] = new_value;
    var testPrefs = JSON.stringify(now_data_array);
    var jsonfile = {};
    jsonfile[key] = testPrefs;
    chrome.storage.local.set(jsonfile, function () {
        console.log('Saved', key, testPrefs);
    });
};
document.getElementById('purple').addEventListener('click',()=>{
    add_data('URL', canvas.toDataURL());
    console.log(now_data_array);
    chrome.storage.local.get("PainterExtensionKey", function (obj) {
        console.log(obj);
    });
    /*chrome.storage.local.remove("PainterExtensionKey");
    chrome.storage.local.get("PainterExtensionKey", function (obj) {
        console.log(obj);
    });*/
});