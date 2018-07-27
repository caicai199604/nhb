mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});

mui.plusReady(function(){
	
})
function checkcount(){
	if($(".active").attr("data-name") =="xiajia" ){
		$(".bottomup").find("span").text($(".check").length);		
	}else{
		$(".bottomdown").find("span").text($(".check").length);	
	}
}
function undercarriage(){
	var html='';
	for(var i=0;i<5;i++){
		html+='<ul class="mui-table-view box">'+
				'<li class="mui-table-view-cell">'+
					'<div class="mui-slider-right mui-disabled">'+
						'<a class="mui-btn mui-btn-red gray">改分类</a>'+
						'<a class="mui-btn mui-btn-yellow black">上架</a>'+
					'</div>'+
					'<div class="mui-slider-handle goodsbox">'+
						'<div class="mid">'+
							'<div class="nocheck">'+
								'<img src="../imgs/icon_weixuan.svg" alt="" />'+
								'<img src="../imgs/icon_gouxuan.svg" alt="" />'+
							'</div>'+
							'<div class="midbox"> '+
								'<img src="../imgs/1.jpg" alt="" class="img"/>'+
								'<div class="midright">'+
									'<div class="mui-ellipsis">宽松慵懒卫衣上衣格子衬d发的手机卡了发的撒垃圾发的撒垃圾范德萨记录；框架范德萨；离开家发的撒垃圾； 范德萨；看见了衫</div>'+
									'<div class="goodsnumber">货号：23784596</div>'+
									'<div class="money">¥24.50</div>'+
								'</div>'+
							'</div>'+
						'</div>'+	
					'</div></li></ul>';
	}
	
					
		$(".mui-content").empty().append(html);
}
function sale(){ 
	var html='';
	for(var i=0;i<5;i++){
	html+='<ul class="mui-table-view box">'+
				'<li class="mui-table-view-cell">'+
					'<div class="mui-slider-right mui-disabled">'+
						'<a class="mui-btn mui-btn-red gray">改分类</a>'+
						'<a class="mui-btn mui-btn-yellow red">下架</a>'+
					'</div>'+
					'<div class="mui-slider-handle goodsbox">'+
						'<div class="mid">'+
							'<div class="nocheck">'+
								'<img src="../imgs/icon_weixuan.svg" alt="" />'+
								'<img src="../imgs/icon_gouxuan.svg" alt="" />'+
							'</div>'+
							'<div class="midbox"> '+
								'<img src="../imgs/1.jpg" alt="" class="img"/>'+
								'<div class="midright">'+
									'<div class="mui-ellipsis">宽松慵懒卫衣上衣格子衬d发的手机卡了发的撒垃圾发的撒垃圾范德萨记录；框架范德萨；离开家发的撒垃圾； 范德萨；看见了衫</div>'+
									'<div class="goodsnumber">货号：23784596</div>'+
									'<div class="money">¥24.50</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="boxbottom">'+
							'<div class="boxbottomright">'+
								'<div class="colorsize">'+
									'<span>米白/S</span>'+
									'<img src="../imgs/icon_sanjiao.svg" alt="" />'+
								'</div>'+
								'<div class="volume">已售 113 件</div>'+
								'<div class="undercarriage">下架</div>'+
							'</div>	</div></div></li></ul>';
		}
		$(".mui-content").empty().append(html);
}
sale();
$(".mui-content").on('tap',".gray",function(){ 
		var picker = new mui.PopPicker();
		picker.setData([{
		    value: "first",
		    text: "第一项"
		}, {
		    value: "second",
		    text: "第一项"
		}, {
		    value: "third",
		    text: "第三项"
		}, {
		    value: "fourth",
		    text: "第四项"
		}, {
		    value: "fifth",
		    text: "第五项"
		}])
		picker.show(function(SelectedItem) {
			console.log(SelectedItem);
		})
})
$(".mui-content").on('tap',".colorsize",function(){ 
	var that =$(this);
		var picker = new mui.PopPicker();
		picker.setData([{
		    value: "first",
		    text: "第一项"
		}, {
		    value: "second",
		    text: "第一项"
		}, {
		    value: "third",
		    text: "第三项"
		}, {
		    value: "fourth",
		    text: "第四项"
		}, {
		    value: "fifth",
		    text: "第五项"
		}])
		picker.show(function(SelectedItem) {
			that.find("span").text(SelectedItem[0].text) 
		})
})
$(".classification").on('tap',function(){ 
	var that =$(this);
		var picker = new mui.PopPicker();
		picker.setData([{
		    value: "first",
		    text: "第一项"
		}, {
		    value: "second",
		    text: "第一项"
		}, {
		    value: "third",
		    text: "第三项"
		}, {
		    value: "fourth",
		    text: "第四项"
		}, {
		    value: "fifth",
		    text: "第五项"
		}])
		picker.show(function(SelectedItem) {
			that.find("span").text(SelectedItem[0].text) 
		})
})
$(".headerbottom").on("tap",".mui-col-xs-4",function(){
	if($(this).hasClass("classification")){
		return false
	}
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	if($(this).find("div").text()=="下架"){
		if($(".bottom").css("display")!="none"){
			$(".bottomup").show();
			$(".bottomdown").hide()
		}
		undercarriage()
	}else{
		if($(".bottom").css("display")!="none"){
			$(".bottomup").hide();
			$(".bottomdown").show()
		}
		sale();
	}
})

$(".cancel").on("tap",function(){
	$("#header1").show();
	$("#header2").hide();
})
$("#search").on("tap",function(){
	$("#header1").hide();
	$("#header2").css("display","flex");
})
$(".edit").on("tap",function(){
	$(this).hide();
	$(".over").show()
	$(".mui-content").addClass("showcheck").css("padding-bottom","49px");
	$(".bottom").css("display","flex");
	if($(".active").attr("data-name") =="xiajia" ){
		$(".bottomup").show();
		$(".bottomdown").hide()
	}else{
		$(".bottomdown").show();
		$(".bottomup").hide();
	}
})
$(".over").on("tap",function(){
	$(this).hide();
	$(".edit").show()
	$(".mui-content").removeClass("showcheck").css("padding-bottom","0");
	$(".bottom").hide();
})
$(".mui-content").on("tap",".nocheck",function(){
	if($(this).hasClass("check")){
		$(this).removeClass("check");
		$('.allcheck').removeClass("allcheckactive");
		checkcount();
	}else{
		$(this).addClass("check");
		if($(".nocheck").length==$(".check").length){
			$('.allcheck').addClass("allcheckactive")	
		}
		checkcount();
	}
})
$(".allcheckbox").on("tap",function(){
	var that =$(this).find(".allcheck");
	if(that.hasClass("allcheckactive")){
		that.removeClass("allcheckactive");
		$(".nocheck").removeClass("check")
		checkcount()
	}else{
		that.addClass("allcheckactive");
		$(".nocheck").addClass("check");
		checkcount();
	}
})
