function logout(){
  $.getJSON(baseUrl+'/api',
  {
    todo:'logout'
  },function(data){
    Cookies.remove('isLogin');
    document.location.reload();
  });
}
function doAuth(){
  $.getJSON(baseUrl+'/api',
  {
    todo:'login',
    mail:$('#loginMail').val().trim(),
    pwd:$('#loginPwd').val()
  },function(data){
    if(data.stat=='error'){
      alert(data.msg);
    }
    if(data.stat=='ok'){
      Cookies.set('isLogin','yes',{expires:7});
      Cookies.set('usrCat',data.usrCat,{expires:7});
      document.location.reload();
    }
  });
  return false;
}
function loginNav(tabIdx){
  if(isBusy)return;
  console.log(tabIdx);
  $('#loginInputs input').removeClass('error');
  $('#loginPanel').removeClass('idx1 idx2 idx3');
  $('#loginPanel').addClass('idx'+tabIdx);
  if(tabIdx==1){
    $('#loginFb').slideDown();
    $('#loginPwdDiv').slideDown();
    $('#loginConfirmPwdDiv').slideUp();
    $('#loginBtn').html('เข้าสู่ระบบ');
    $('#loginTodo').val('login');
  }
  if(tabIdx==2){
    $('#loginFb').slideDown();
    $('#loginPwdDiv').slideDown();
    $('#loginConfirmPwdDiv').slideDown();
    $('#loginBtn').html('สมัคร');
    $('#loginTodo').val('reg');
  }
  if(tabIdx==3){
    $('#loginFb').slideUp();
    $('#loginPwdDiv').slideUp();
    $('#loginConfirmPwdDiv').slideUp();
    $('#loginBtn').html('ส่งอีเมลสำหรับตั้งรหัสผ่าน');
    $('#loginTodo').val('reset');
  }
  return false;
}
function initBack2Top(){
  console.log('init scroll');
  $('#back2top').click(function(){
    $("html, body").animate({scrollTop: 0 }, 400);
  });
  $(window).on('scroll',function(){
    if($(window).scrollTop()>100){
      $('#back2top').addClass('show');
    }else{
      $('#back2top').removeClass('show');
    }
  });
}
function toggleLogin(){
  $('#loginPanel').toggleClass('show');
  $('#popMask').toggleClass('show');
}

$(function(){
  try{initBack2Top();}catch(e){};
  $('#popMask').click(function(){
    toggleLogin();
  });
});
// facebook thingy
var isFbLogin=false;
var fbId='';
var fbName='';
var accessToken='';
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '535887716607733',
      xfbml      : true,
      version    : 'v2.1'
    });
    FB.getLoginStatus(function(data) {
    statusChangeCallback(data);
  });
  };
function statusChangeCallback(data) {
  if (data.status === 'connected'){
    getFbId();
  }else{
    if(document.location.href.indexOf('profile.php')>0){
      document.location='index.php';
    }
 
  }
}
function getFbId() {
  FB.api('/me', function(data) {
    fbId=data.id;
    fbName=data.name;
    accessToken=FB.getAuthResponse().accessToken;
    $.get('index.php',{todo:'fbLogin',fbId:fbId,fbName:fbName,accessToken:accessToken},function(data){
      console.log(data);
    });
    if(document.location.href.indexOf('profile.php')>0){
      fetchProfile();
    }
  });
}
function fbReg(){
  FB.login(function(data){
    if(data.status=='connected'){
      $('#fbLoginBtn').fadeOut();
      getFbId();
    }
  },{scope:''});
}
function usrLogin(){
  if(fbId==''){
    fbReg();
  }else{
    document.location='profile.php';
  }
  
  return false;
}
function fetchProfile(){
  console.log('fetchProfile');
}
Array.prototype.shuffleArr = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}