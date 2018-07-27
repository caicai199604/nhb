mui.init({
	gestureConfig:{
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold:false,//默认为false，不监听
		release:false//默认为false，不监听
	},
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
		    height:'100px',//可选,默认50px.下拉刷新控件的高度,
		    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
		    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
//			auto: true,//可选,默认false.首次加载自动上拉刷新一次
			callback: pulldownRefresh
		},
//		up: {
//			contentnomore:"",
//			contentrefresh: '正在加载...',
//			callback: pullupRefresh
//		}
	}
});
var num="",current_page=0;
function getdatanum(){
	var url=httpurl.cart.nums,param={};
	function success(res){
		var data=res.data;
		num=data;
		if(num==0){
			var html='<div class="emptycart">'+
			    				'<img src="../imgs/emptycart.svg" alt="" />'+
			    				'<div>您还未拿取货物</div>'+
			    				'<div>现在马上去挑选吧</div>'+
			    			'</div>';
		 	$(".mui-scroll").empty();
			$(".mui-scroll").append(html);
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			return false
		}else{
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		}
	}
	ajax(url,param,success)
}
getdatanum();
//总数量被选中的数量和总计多少价格
function total(){
	$(".bottombutton span").text($(".goods .checkactive").length);
	var total=0;
	var check=$(".mui-scroll .goods .checkactive").siblings();
	var money=check.find(".money span");
	var count=check.find(".count div");
	for(var i=0;i<check.find(".money span").length;i++){
		total+=$(money[i]).text()*$(count[i]).text()
	}
	total=total.toFixed(2).toString();
	total="￥"+total;
	$(".total span").text(total);
}
function getdata(t){
	var url=httpurl.cart.index,param={};
	function success(res){
		var data=res.data,html="";
		if(data==null){
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
		$.each(data,function(key,val){
			html+='<div class="mid ">'+
			    			'<div class="storename">'+
								'<div class="nocheck" >'+
									'<img src="../imgs/icon_weixuan.svg"/>'+
									'<img src="../imgs/icon_gouxuan.svg"/>'+ 
								'</div>'+
								'<div class="shopname">'+
									'<img src="'+this[0].logo_pic+'" class="shopimg"/ >'+
									'<span class="name">&nbsp;'+this[0].shop_name+'&nbsp;</span>'+
									'<img src="../imgs/icon_youjiantou.svg" alt=""  class="youjiantouimg"/>'+
								'</div>'+
							'</div>'+
							'<ul class="mui-table-view ">';
				$.each(val,function(index){
					html+='<li class="mui-table-view-cell">'+
				    			'<div class="mui-slider-handle">'+
									'<div class="goods ">'+
										'<div class="nocheck" data-id="'+this.cart_id+'" data-sku_id="'+this.sku_id+'">'+
											'<img src="../imgs/icon_weixuan.svg"/>'+
											'<img src="../imgs/icon_gouxuan.svg"/>'+
										'</div>'+
										'<div class="goodsright"> '+
											'<img src="../imgs/1.jpg" alt="" class="goodsimg"/>'+
											'<div class="info">'+
												'<div class="mui-ellipsis goodsname">'+this.goods_name+'</div>'+
												'<div class="type">'+this[1].classname+','+this[2].classname+'</div>'+
												'<div class="info-bottom" >'+
													'<div class="money">￥<span>'+this.price+'</span></div>'+
													'<div class="count">'+
														'<img src="../imgs/icon_minus.svg" class="jian"/>'+
														'<div data-id="'+this.cart_id+'" data-sku_id="'+this.sku_id+'">'+this.nums+'</div>'+
														'<img src="../imgs/icon_plus.svg"  class="jia"/>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="mui-slider-right mui-disabled">'+
									'<a class="mui-btn mui-btn-red">删除</a>'+
								'</div>'+
							'</li>'
				})
				html+='</ul></div>';
		})
		$(".mui-scroll").append(html);
		
		
		if(t=="down"){
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}else{
//			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		}
	}
	current_page++;
	param.page=current_page
	ajax(url,param,success)
}
//下拉刷新
function pulldownRefresh(){
	var type="down";
	getdatanum();
	if(num==0){
		$(".emptycart").css("display","flex");
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
//		mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
		return false
	}
	current_page =0;
	$(".mui-scroll").empty();
	getdata(type);
	$(".bottombutton span").text($(".goods .checkactive").length);
	$(".bottom .nocheck").removeClass("checkactive");
	$(".total span").text("￥0.00");
//	mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
}
function pullupRefresh(){ 
	var type="up";
	getdata(type);
}



$(".edit").on('tap',function(){
	$(this).hide();
	$(".over").show();
	$(".black").hide();
	$(".selecte").removeClass("mui-col-xs-4").addClass("mui-col-xs-8");
	$(".red").show();
	$(".total").hide();
})
$(".over").on('tap',function(){
	$(this).hide();
	$(".edit").show();
	$(".black").show();
	$(".red").hide();
	$(".total").show();
	$(".selecte").removeClass("mui-col-xs-8").addClass("mui-col-xs-4");
})
$(".mui-scroll").on("tap",".nocheck",function(){

	if($(this).parent().hasClass("storename")){ //店铺的点击
		if($(this).hasClass("checkactive")){//当前是选中
			$(this).removeClass("checkactive");
			$(this).parent().siblings().find(".nocheck").removeClass("checkactive");
			$(".bottomcheckbox .nocheck").removeClass("checkactive");
		}else{
			$(this).addClass("checkactive");
			$(this).parent().siblings().find(".nocheck").addClass("checkactive");
			if($(this).parents(".mui-scroll").find(".mid .storename .nocheck").not(".checkactive").length==0){
				$(".bottomcheckbox .nocheck").addClass("checkactive")
			}
		}
	}else if($(this).parent().hasClass("goods")){ //货品的点击
		if($(this).hasClass("checkactive")){
			$(this).removeClass("checkactive");
			$(this).parents(".mid").find(".storename .nocheck").removeClass("checkactive");
			$(".bottomcheckbox .nocheck").removeClass("checkactive")
		}else{
			$(this).addClass("checkactive");
			if($(this).parents(".mid").find(".goods .nocheck").not(".checkactive").length ==0){
				$(this).parents(".mid").find(".storename .nocheck").addClass("checkactive");
			}
			if($(this).parents(".mui-scroll").find(".mid .storename .nocheck").not(".checkactive").length==0){
				$(".bottomcheckbox .nocheck").addClass("checkactive")
			}
		}
	}
	total();
})
$(".bottomcheckbox .nocheck").on("tap",function(){
	if($(this).hasClass("checkactive")){
		$(this).removeClass("checkactive");
		$(".nocheck").removeClass("checkactive");
	}else{
		$(this).addClass("checkactive");
		$(".nocheck").addClass("checkactive");
	}
	total();
})
$(".mui-scroll").on("tap",".mui-disabled",function(){
	var url=httpurl.cart.del_cart,param={},that=$(this);
	param.ids=[];
	param.ids.push($(this).siblings().find(".count div").data("id"));
	console.log(param)
	function success(res){
		mui.toast("删除成功！");
		if(that.parent().siblings().length==0){
			that.parents(".mid").remove();
		}
		that.parent().remove();
	}
	ajax(url,param,success);
})
$(".red").on("tap",function(){
	var url=httpurl.cart.del_cart,param={},that=$(this);
	param.ids=[];
	var check=$(".mui-scroll .goods .checkactive");
	for(var i=0;i<check.length;i++){
		param.ids.push($(check[i]).data("id"))
	}
	function success(res){
		for(var i=0;i<check.length;i++){
			$(check[i]).parents(".mui-table-view-cell").remove();
		}
		var table=$(".mui-table-view");
		for(var i=0;i<table.length;i++){
			if($(table[i]).find(".mui-table-view-cell").length==0){
				$(table[i]).parents(".mid").remove()
			}
		}
		mui.toast(res.message);
	}
	ajax(url,param,success);
})
$(".black").on("tap",function(){
	var check=$(".mui-scroll .goods .checkactive");
	if(check.length==0){
		mui.toast("请选择要购买的商品！");
		return false;
	}
	var cartid=[];
	for(var i=0;i<check.length;i++){
		cartid.push($(check[i]).data("id"))
	}
	mui.openWindow({
		id:"../nhb_html_i/nhb_orderaffirm.html",
		url:"../nhb_html_i/nhb_orderaffirm.html",
		extras:{
			cartid:cartid
	   },
	})	
})
//数量减一
$(".mui-content").on("tap",".jian",function(){
	var count=$(this).siblings("div").text();
	var id=$(this).siblings("div").data("id");
	var that=$(this);
	if(count==1){
		mui.toast("货品最小数量为1！");
		return false;
	}
	var url=httpurl.cart.changeCartNums,param={};
	function success(res){
		that.siblings("div").text(count);
		total();
		plus.nativeUI.closeWaiting();
	}
	count--;
	param.nums=count;
	param.id=id;
	plus.nativeUI.showWaiting();
	ajax(url,param,success);
})
//数量加一
$(".mui-content").on("tap",".jia",function(){
	var count=$(this).siblings("div").text();
	var id=$(this).siblings("div").data("id");
	var that=$(this);
	var url=httpurl.cart.changeCartNums,param={};
	function success(res){
		that.siblings("div").text(count);
		total();
		plus.nativeUI.closeWaiting();
	}
	count++;
	param.nums=count;
	param.id=id;
	plus.nativeUI.showWaiting();
	ajax(url,param,success);
})
mui.plusReady(function() {
	
})

