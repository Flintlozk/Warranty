var isBusy=false;
var i,j,k;
var foo;
//reduce size ,  & crop ; smaller img will center
function resizePic(src,dest,w,h){
  var sw=src.width,sh=src.height;
  var cv,ctx,oH=sw,oW=sh;
  cv=document.createElement("canvas");
  cv.width=w;cv.height=h;
  ctx=cv.getContext('2d');
  if(sw>w||sh>h){ //resize if larger than required
    if((sw/sh)>=(w/h)){ // hit on width
      oH=sh;
      oW=Math.floor(sh*w/h);
    }else{ // hit on height
      oW=sw;
      oH=Math.floor(sw*h/w);
    }
    ctx.drawImage(src,Math.floor((sw-oW)/2),Math.floor((sh-oH)/2), oW, oH,0, 0,w,h);
  }else{
    ctx.drawImage(src,0,0, sw, sh,Math.floor((w-sw)/2),Math.floor((h-sh)/2),sw,sh);
    console.log(sw, sh,Math.floor((w-sw)/2),Math.floor((h-sh)/2),sw,sh);
  }
  console.log(oW,oH);
  $(dest).attr('src',cv.toDataURL('image/png',0.75));
}
//reduce size ,  & no-crop
function resizePic2(src,dest,w,h){
  var sw=src.width,sh=src.height,r=1;
  var cv,ctx;
  cv=document.createElement("canvas");
  if(sw>w||sh>h){ //resize if larger than required
    if((sw/sh)>=(w/h)){ // hit on width
      r=w/sw;
    }else{ // hit on height
      r=h/sh;
    }
  }
  w=Math.floor(sw*r);h=Math.floor(sh*r);
  cv.width=Math.floor(w);cv.height=Math.floor(h);
  ctx=cv.getContext('2d');
  ctx.drawImage(src,0,0,sw,sh,0, 0,Math.floor(w),Math.floor(h));
  $(dest).attr('src',cv.toDataURL('image/png',0.75));
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var cache = [];
$(function(){
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
});