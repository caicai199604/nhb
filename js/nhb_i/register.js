
mui.init({
	beforeback: function(){
		//获得列表界面的webview
		var list = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新
		mui.fire(list,'refresh');
		//返回true，继续页面关闭逻辑
		return true;
	}
});
function success(res){
	mui.toast("注册成功");
	window.setTimeout(function(){
	 	mui.openWindow({
	        id: 'nhb_login.html',
	        url: 'nhb_login.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	},1000);
	
};
var countdown=60;  
$("#agree").on("tap",function(){
	if($(this).hasClass("active")){
		$(this).removeClass("active")
	}else{
		$(this).addClass("active")
	}
});
$("#userknow").on("tap",function(){
	event.stopPropagation();//阻止事件冒泡即可
	mui.toast("用户注册须知");
});
$(".button").on("tap",function(){
	if(!$("#agree").hasClass("active")){
		mui.toast("请阅读并同意用户注册须知");
		return false
	}
	if(!phonecheck($("#phone").val())){
		mui.toast("请输入正确的手机号");
		return false
	}
	if(!$("#password").val()){
		mui.toast("密码不能为空");
	}
	if($("#password").val().length<6){
		mui.toast("请输入6-16位字母和数字组合");
		return false
	}
	if(!numbersletterscheck($("#password").val())){
		mui.toast("设置密码,请输入6-16位字母和数字组合");
		return false
	}
	if($("#password").val()!=$("#secondpaw").val()){
		mui.toast("两次密码输入不一致");
		return false
	}
	var  url=httpurl.user.Reg ,param={};
	param.phone=$("#phone").val();
	param.password=$("#password").val();
	param.o_pwd=$("#secondpaw").val();
	ajax(url,param,success)
	
});
$(".getvalidate").on("tap",function(){
	if(countdown=="60"){
		settime($(this));
	}
})



