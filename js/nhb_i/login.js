colorWhite();
mui.init({
	beforeback: function(){
		var index =plus.webview.getLaunchWebview();
		mui.fire(index, 'gohome', {	});
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		mui.fire(plus.webview.getLaunchWebview(),'isbusiness');
		mui.fire(plus.webview.getWebviewById('nhb_tailgoodsmarket.html'),'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});
//mui.plusReady(function(){
//  var self = plus.webview.currentWebview();
//  var name = self.name;//获得参数
//});
var countdown=60;  
function success(res){
	var userinfo={};
	userinfo.token=res.data;
	userinfo.phone=$("#mmphone").val();
	userinfo.password=$("#password").val();
	userinfo.type=res.data.type; 
//	userinfo.type=2;
	localStorage.setItem("userinfo",JSON.stringify(userinfo));
	mui.toast("登录成功！");
	plus.nativeUI.closeWaiting()
	var index =plus.webview.getLaunchWebview();
	mui.fire(index, 'gohome', {	});
	mui.back();
}
$(".register").on("tap",function(){
	mui.openWindow({
        id: 'nhb_register.html',
        url: 'nhb_register.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#mmlogin").on("tap",function(){
	if(!$("#mmphone").val()||!$("#password").val()){
		mui.toast("手机号密码不能为空！");
	}
	if(!phonecheck($("#mmphone").val())){
		mui.toast("请输入正确的手机号");
		return false
	}
	var url=httpurl.user.Login,param={};
	param.phone=$("#mmphone").val();
	param.password=$("#password").val();
	ajax(url,param,success);
	plus.nativeUI.showWaiting();
	
})
$("#yzmlogin").on("tap",function(){
	if(!$("#yzmphone").val()||!$("#validate").val()){
		mui.toast("手机号验证码不能为空！");
	}
})
$(".getvalidate").on("tap",function(){
	if(countdown==60){
		settime($(this));
		//调用短信接口
	}
})

$("#qq").on("tap",function(){
	
})
$("#wx").on("tap",function(){
	
})
$(".close").on("tap",function(){
	var list = plus.webview.currentWebview().opener();
	//触发父页面的自定义事件(refresh),从而进行刷新
	mui.fire(list, 'refresh');
	//返回true,继续页面关闭逻辑
	mui.back();
})
document.addEventListener('refresh', function(event) {
	 colorWhite();
});