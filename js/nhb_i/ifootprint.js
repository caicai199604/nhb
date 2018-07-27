
mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});
function checkclick(){
	
}
function getdata(){
	var html ="";
	for(var i=0;i<2;i++){
		html+='<div class="box">'+
				'<div class="box-top" id="time">'+
					'<div class="check">'+
						'<img src="../imgs/icon_weixuan.svg" alt="" />'+
						'<img src="../imgs/icon_gouxuan.svg" alt="" />'+
					'</div>'+
					'<div>2018-04-04</div>'+
				'</div>'+
				'<ul class="mui-table-view">';
					for(var j=0;j<3;j++){
						
						html+='<li class="mui-table-view-cell mui-media box-mid">'+
						'<div class="check">'+
							'<img src="../imgs/icon_weixuan.svg" alt="" />'+
							'<img src="../imgs/icon_gouxuan.svg" alt="" />'+
						'</div>'+
						'<div class="mui-media-body box-mid-info">'+
							'<div class="img"><img src="../imgs/1.jpg" alt="" /></div>'+
							'<div class="name">'+
								'<p class="">冬装新款时尚简约气质外套格子中长白色大衣辅导老师看见埃里克范德萨范德萨啊发了多少空间奥拉夫看得见三范德萨 </p>'+
								'<div class="money">¥24.50</div>'+
							'</div>'+
						'</div>'+
					'</li>';
					}
				html+='</ul>'+
					'</div>';
	}
	$('.mui-content').append(html);
}
getdata();



$(".edit").on("click",function(){
	$(this).hide();
	$(".over").show();
	$(".bottom").show();
	$(".box").addClass("check-show");
	$(".mui-content").addClass("active");
})
$(".over").on("click",function(){
	$(this).hide();
	$(".edit").show();
	$(".bottom").hide();
	$(".box").removeClass("check-show");
	$(".mui-content").removeClass("active");
})

$(".check").on("click",function(){  //check的点击事件
	if($(this).parent().hasClass("box-top")){//二级box 的 点击
		if($(this).hasClass("check-active")){
			$(this).removeClass("check-active");
			$(this).parent().next('ul').find('li').find('div.check').removeClass('check-active')
			if($(this).parent().parent().siblings().find(".box-top .check").not(".check-active").length==0){//判断子项是不是全部都有check-active
				$(".bottom").find(".check").removeClass("check-active");
			}
		}else{
			$(this).addClass("check-active");
			$(this).parent().next('ul').find('li').find('div.check').addClass('check-active')
			if($(this).parent().parent().siblings().find(".box-top .check").not(".check-active").length==0){//判断子项是不是全部都有check-active
				$(".bottom").find(".check").addClass("check-active");
			}
		}
	}else if($(this).parent().hasClass("bottom")){//一级全选的点击
		if($(this).hasClass("check-active")){
			$(this).removeClass("check-active");
			$(".check").removeClass("check-active");
		}else{
			$(this).addClass("check-active");
			$(".check").addClass("check-active");
		}
	}else{  //三级子项的点击
		if($(this).hasClass("check-active")){
			$(this).removeClass("check-active");
				$(this).parent().parent().prev().find(".check").removeClass("check-active");		
				$(".bottom").find(".check").removeClass("check-active");
		}else{
			$(this).addClass("check-active");
			if($(this).parent().siblings().find(".check").not(".check-active").length==0){//判断子项是不是全部都有check-active
				$(this).parent().parent().prev().find(".check").addClass("check-active");
			}
			console.log($(this).parent().parent().siblings())
			if($(this).parents(".mui-content").find(".box-top .check").not(".check-active").length==0){
				$(".bottom").find(".check").addClass("check-active");
			}
		}
	}
})