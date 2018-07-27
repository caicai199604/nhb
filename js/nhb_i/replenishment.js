mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});

$(".frame").on("click",".nocheck",function(){
	$(this).siblings().removeClass("check");
	$(this).addClass("check");
	$("#screen span").text($(this).text());
})
