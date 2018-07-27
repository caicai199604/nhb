mui.init({
	beforeback: function(){
		var list = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(list,'refresh');
		return true;
	}
});
mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var name = self.name;//获得参数
    
    $(".quit").on("tap",function(){
		localStorage.removeItem("userinfo");
		var index =plus.webview.getLaunchWebview();
		mui.fire(index, 'gohome', {	});
		mui.fire(plus.webview.getLaunchWebview(),'isbusiness');
		plus.webview.currentWebview().close();
	})
    $("#changepassword").on("tap",function(){
		mui.openWindow({
        id: 'nhb_modifypassword.html',
        url: 'nhb_modifypassword.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
	})
    $("#changephone").on("tap",function(){
		mui.openWindow({
        id: 'nhb_changephone.html',
        url: 'nhb_changephone.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
	})
    $("#bankcardmanagement").on("tap",function(){
		mui.openWindow({
        id: 'nhb_bankcardmanagement.html',
        url: 'nhb_bankcardmanagement.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
	})
});

