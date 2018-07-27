mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});
var isbusiness=true;
if(isbusiness){
	$(".button").css("display","flex");
	$(".follow").hide();
	$(".fans").show();
	$(".mui-content").css("padding-bottom","49px !important");
}

function st(){
    //变量t是滚动条滚动时，距离顶部的距离
    var t = document.documentElement.scrollTop||document.body.scrollTop;
	if(t>110){
		$("header").show();
	}else{
		$("header").hide();
	}
}
window.onscroll=function(){	st();} 
$(".mui-col-xs-3").on("tap",function(){
	var that=$(this);
	$(".mui-col-xs-3").siblings().removeClass("active");
	that.addClass("active")
	$(".mui-col-xs-3").filter(function(){
		if($(this).text()==that.text()){
			$(this).addClass("active");
		}
	})
	if($(this).text()=="筛选"){
		mui.openWindow({
	        id: '../nhb_html_pickgoods/nhb_goodsscreen.html',
	        url: '../nhb_html_pickgoods/nhb_goodsscreen.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	}
})
$(".button").on("tap",function(){
	mui.openWindow({
        id: 'nhb_releasenew.html',
        url: 'nhb_releasenew.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var shopid = self.shopid;//获得参数
});