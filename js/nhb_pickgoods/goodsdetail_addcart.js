mui.plusReady(function(){
	var self = plus.webview.currentWebview();
    var goodsid = self.goodsid;//获得参数
    var shopid = self.shopid;//获得参数
//  goodsid=4
	mui.init({
		beforeback:function(){
			plus.webview.getWebviewById("nhb_goodsdetail.html").setStyle({mask:"none"});
			return true;
		}
	});
	var url =httpurl.cart.goodsDetail,param={},html="",html2="";
	var userinfo =JSON.parse(localStorage.getItem("userinfo"));
	param.goods_id=goodsid;
	function success(res){
		var html="",color=res.data.sku[0].subset,size=res.data.sku[1].subset;
		$.each(color,function(){
			html+='<div class="mui-control-item type-nocheck" data-id="'+this.skuid+'">'+this.classname+' </div>';
		})
		$("#color").append(html);
		html='';
		$.each(size,function(){
			html+='<div class="frame-mid-box">'+
			   				'<div class="nocheck" data-id="'+this.skuid+'">'+this.classname+'</div>'+
			   				'<div class="jiajian">'+
			   					'<div class="reducecount"><img src="../imgs/icon_minus.svg" /></div>'+
			   					'<div class="count">0</div>'+
			   					'<div class="addcount"><img src="../imgs/icon_plus.svg" /></div>'+
			   				'</div>'+
			   			'</div>';
		});
		$("#size").append(html);
		plus.nativeUI.closeWaiting()
	}
	ajax(url,param,success);
	plus.nativeUI.showWaiting();
	
	function add(count){
		count=parseInt(count);
		var max=100;
		if(count==max){
			return count;
		}else{
			count++;
			return count;
		}
	}
	function reduce(count){
		count=parseInt(count);
		if(count==0){
			return count;
		}else{
			count--;
			return count;
		}
	}
	//加减数量
	$("#size").on("tap",".active .addcount",function(){
		$(this).parent().find(".count").text(add($(this).parent().find(".count").text()));
	})
	$("#size").on("tap",".active .reducecount",function(){
		$(this).parent().find(".count").text(reduce($(this).parent().find(".count").text()));
	})
	//颜色的点击事件
	$("#color").on("tap",".type-nocheck",function(){
		$(this).siblings().removeClass("check");
		$(this).addClass("check");
	})
	//尺码的点击事件
	$("#size").on("tap",".nocheck",function(){
		$(this).parent().siblings().find(".nocheck").removeClass("check");
		$(this).parent().siblings().find(".jiajian").removeClass("active")
		if($(this).hasClass("check")){
			$(this).removeClass("check");
			$(this).siblings().removeClass("active");
		}else{
			$(this).addClass("check");
			$(this).siblings().addClass("active");
		}
	})
	//关闭frame
	$("#frameclose").on("tap",function(){
		plus.webview.getWebviewById("nhb_goodsdetail.html").setStyle({mask:"none"});
		mui.back()
	})
	$(".buy").on("tap",function(){
		if(userinfo==null){
			mui.openWindow({
		        id: '../nhb_html_i/nhb_login.html',
		        url: '../nhb_html_i/nhb_login.html',
		        show: {
		            aniShow: 'pop-in'
		        },
		        waiting: {
		             autoShow: true, //自动显示等待框，默认为true
		        }
		    });
			return false;
		}
		if($("#color .check").length==0){
			mui.toast("请选择颜色！");
			return false;
		}
		if($("#size .check").length==0){
			mui.toast("请选择尺码！");
			return false;
		}
		if($(".active .count").text()==0){
			mui.toast("请选择商品数量！");
			return false;
		}
		var url=httpurl.cart.change,param={};
		param.id="-"+$("#color .check").attr("data-id")+'-'+$("#size .check").attr("data-id")+'-';
		function success(res){
			plus.nativeUI.closeWaiting();
//			if(res.data==null){
//				plus.nativeUI.closeWaiting();
//				mui.toast("此颜色这尺码断货了！");
//				return false;
//			}
			mui.openWindow({
		        id: '../nhb_html_i/nhb_orderaffirm.html',
		        url: '../nhb_html_i/nhb_orderaffirm.html',
		       extras:{
					goods_id:goodsid,
					goods_nums:$(".active .count").text(),
					sku_id:res.data
			   },
		    });
		}
		plus.nativeUI.showWaiting();
		ajax(url,param,success);
	})
	$(".add").on("tap",function(){
		if(userinfo==null){
			mui.openWindow({
		        id: '../nhb_html_i/nhb_login.html',
		        url: '../nhb_html_i/nhb_login.html',
		        show: {
		            aniShow: 'pop-in'
		        },
		        waiting: {
		             autoShow: true, //自动显示等待框，默认为true
		        }
		    });
			return false;
		}
		if($("#color .check").length==0){
			mui.toast("请选择颜色！");
			return false;
		}
		if($("#size .check").length==0){
			mui.toast("请选择尺码！");
			return false;
		}
		if($(".active .count").text()==0){
			mui.toast("请选择商品数量！");
			return false;
		}
		var url=httpurl.cart.change,param={};
		param.id="-"+$("#color .check").attr("data-id")+'-'+$("#size .check").attr("data-id")+'-';
//		param.id="-3-10-";
		param.goods_id=goodsid;
		function success(res){
			if(res.data==null){
				plus.nativeUI.closeWaiting();
				mui.toast("此颜色这尺码断货了！");
				return false;
			}
			var url=httpurl.cart.add_cart,param={};
			param.nums=$(".active .count").text();
			param.sku_id=res.data.sku_id;
			param.goods_id=goodsid;
			function success(res){
				plus.nativeUI.closeWaiting();
				mui.toast("加入拿货车成功！");
				plus.webview.getWebviewById("nhb_goodsdetail.html").setStyle({mask:"none"});
				mui.back();
			}
			ajax(url,param,success);
		}
		ajax(url,param,success);
		plus.nativeUI.showWaiting();
	})
})