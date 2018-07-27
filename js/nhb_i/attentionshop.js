mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});