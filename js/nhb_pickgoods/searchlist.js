function getdata(){
	var html ="";
	for(var i=0;i<9;i++){
		html+='<div class="box">'+
						'<div><img src="../imgs/1.jpg" alt=""  class="picture"/></div>'+
						'<div class="info">'+
							'<p>宽松慵懒卫衣上衣kflaskjflksajlkfjsa;lkfdsja; </p>'+
							'<div class="money"><span>￥</span>110</div>'+
							'<div class="sales">已售327件</div>'+
							'<div class="bottom">'+
								'<div class="shopname"><img src="../imgs/icon_dianpu_small.svg"/>这是店名</div>'+
								'<div class="gotoshop">进店<img src="../imgs/icon_youjiantou.svg" alt="" /></div>'+
							'</div>'+
						'</div>'+
					'</div>';
	}
	$(".mid").append(html);
}
function pulldownRefresh(){
	getdata();
	mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 
	
}
function pullupRefresh(){
	getdata();
	mui('#pullrefresh').pullRefresh().endPullupToRefresh();
}
mui.init({
//	gestureConfig:{
//		tap: true, //默认为true
//		doubletap: true, //默认为false
//		longtap: true, //默认为false
//		swipe: true, //默认为true
//		drag: true, //默认为true
//		hold:false,//默认为false，不监听
//		release:false//默认为false，不监听
//	},
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
$(".type").on("click",function(){
	$(this).addClass("active").siblings().removeClass("active");
})
$(".price").on("click",function(){
	$(this).addClass("active");
	if($(".img-wu").is(":visible")){//显示上箭头
		$(".img-s").show();
		$(".img-wu").hide();
	}else if($(".img-s").is(":visible")){//显示下箭头
		$(".img-s").hide();
		$(".img-x").show();
	}else{//显示上箭头
		$(".img-x").hide();
		$(".img-s").show();
	}
})


