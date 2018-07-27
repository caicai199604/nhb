



function success(res){
//	plus.nativeUI.closeWaiting();
	mui.toast("修改成功，请重新登录！");
	mui.later(function(){
		mui.openWindow({
		      id: "nhb_login.html",
		      url: "nhb_login.html",
		      show: {
		          aniShow: 'pop-in'
		      },
		      waiting: {
		           autoShow: true, //自动显示等待框，默认为true
		      }
		  });
	},1000)
}
var countdown=60;
$(".getvalidate").on("tap",function(){
	if(countdown==60){
		settime($(this));
		//调用短信接口
	}
})
$(".button").on("tap",function(){
	if(!numbersletterscheck($("#password").val())){
		mui.toast("设置密码,请输入6-16位字母和数字组合");
		return false
	}
	if(!$("#getvalidate").val()){
		mui.toast("验证码不能为空！");
		return false
	}
	
	var url=httpurl.user.Login,param={};
//	param.phone=$("#phone").val();
//	param.password=$("#getvalidate").val();
//	ajax(url,param,success);
//	plus.nativeUI.showWaiting();
	
})