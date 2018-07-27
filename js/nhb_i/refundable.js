mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});



$(".button").on('tap',function(){
	mui.openWindow({
        id: 'nhb_refundabledetail.html',
        url: 'nhb_refundabledetail.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
