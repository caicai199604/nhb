



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
	if(!$("#phone").val()||!$("#getvalidate").val()){
		mui.toast("手机号验证码不能为空！");
	}
	if(!phonecheck($("#phone").val())){
		mui.toast("请输入正确的手机号");
		return false
	}
	var url=httpurl.user.Login,param={};
//	param.phone=$("#phone").val();
//	param.password=$("#getvalidate").val();
//	ajax(url,param,success);
//	plus.nativeUI.showWaiting();
	
})