mui.init({
	pullRefresh: {
		container: '#pullRefresh',
		down: {
			style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
		    height:'100px',//可选,默认50px.下拉刷新控件的高度,
		    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
		    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
			auto: true,
			callback: pulldownRefresh
		},
		up: {
			contentnomore:'没有更多的货源了',
			contentrefresh: '正在加载...',
//			auto: true,//可选,默认false.首次加载自动上拉刷新一次
			callback: pullupRefresh
		}
	}
})
var current_page =0,havemore=true;
function getdata(t){
	function success(res){
		var data =res.data,html='';
		if(data.length==0){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(true);
			return false
		}
		$.each(data,function(index){
			var follow="",slide_pic="";
			if(this.is_attention){
				follow='<div class="follow"  >已关注</div>'
								
			}else{
				follow='<div class="unfollow">未关注</div>'
			}
			switch(this.slide_pic.length){
				case 1:
					slide_pic='<img src="'+this.slide_pic[0]+'"/></div>';
					break;
				case 2:
				  	slide_pic='<img src="'+this.slide_pic[0]+'"/>'+
								'<img src="'+this.slide_pic[1]+'"/ class="img-mid">';
					break;
				default:
					if(this.slide_pic.length==3){
						slide_pic='<img src="'+this.slide_pic[0]+'"/>'+
									'<img src="'+this.slide_pic[1]+'"/ class="img-mid">'+
									'<img src="'+this.slide_pic[2]+'"/>';
					}else{
						var num=this.slide_pic.length-3;
						slide_pic='<img src="'+this.slide_pic[0]+'"/>'+
								'<img src="'+this.slide_pic[1]+'"/ class="img-mid">'+
								'<img src="'+this.slide_pic[2]+'"/>'+
								'<div class="showmore">'+
									'<div>+'+num+'</div>'+
									'<div>更多尾货</div>'+
								'</div>';
					}
					break;
			}
			html+='<div class="box">'+
							'<div class="box-top" data-id="'+this.shop_id+'">'+
								'<div class="portrait"><img src="'+this.log_pic+'"/></div>'+
								'<div class="nameposition">'+
									'<div class="shopname">'+this.name+'</div>'+
									'<div class="position"><img src="../imgs/icon_dzgl.svg" alt="" /><span>'+this.city+'</span></div>'+
								'</div>'+	follow+
							'</div>'+
							'<div class="mui-row box-mid">'+
								'<div class="mui-col-xs-3"> <div class="fans">'+this.fans+'</div>粉丝<span class="shuxian"></span></div>'+
								'<div class="mui-col-xs-3"><div>'+this.sale/10000+'<span>万</span></div> 销量<span class="shuxian"></span></div>'+
								'<div class="mui-col-xs-3"><div>'+this.score+'%</div> 好评率<span class="shuxian"></span></div>'+
								'<div class="mui-col-xs-3"><div>'+this.number+'</div> 尾货数量</div>'+
							'</div>'+
							'<div class="box-bottom">'+slide_pic+	
							'</div>'+
						'</div>'
		})
		$("#content").append(html);
		if(t=="up"){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(false);
		}else{
			mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
			$(".mui-pull").show();
			mui('#pullRefresh').pullRefresh().refresh(true);
		}
	}
	var url=httpurl.goods.tail,param={};
	current_page++;
	param.page=current_page;
	ajax(url,param,success)
}
function pullupRefresh(){
	var type ="up";
	getdata(type);

}
function pulldownRefresh(){
	$("#content").empty();
	$(".mui-pull").hide();
	current_page =0;
	var type ="down";
	getdata(type);	
}
mui.plusReady(function(){
	
	
})

$("#search").on("tap",function(){
	mui.openWindow({
        id: 'nhb_search.html',
        url: 'nhb_search.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
//取消关注
$("#content").on("tap",".follow",function(){
	var that =$(this);
	var  id=that.parent().attr("data-id");
	var fans=$(this).parent().siblings().first().children(":first-child").find("div").text();
	console.log(fans)
	parseInt(fans);
	fans--;
	console.log(fans)
	var url=httpurl.person.attention,param={};
	param.attention_id=id;
	param.status=0;
	function success(res){
//		粉丝数量减一
		$(".box-top").each(function(){
			if($(this).attr("data-id")==id){
				$(this).siblings().first().children(":first-child").find("div").text(fans);
				$(this).append('<div class="unfollow">未关注</div>');
				$(this).find(".follow").remove();
			}
		})
		plus.nativeUI.closeWaiting()
	}
	ajax(url,param,success);
	plus.nativeUI.showWaiting();	
})
//关注
$("#content").on("tap",".unfollow",function(){
	var that =$(this);
	var  id=that.parent().attr("data-id");
	var fans=$(this).parent().siblings().first().children(":first-child").find("div").text();console.log(fans)
	parseInt(fans);
	fans++;console.log(fans)
	var userinfo =JSON.parse(localStorage.getItem("userinfo")),token="";
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
		return false
	}
	var url=httpurl.person.attention,param={};
	param.attention_id=id;
	param.status=1;
	function success(res){
		//粉丝数量加一
		$(".box-top").each(function(){
			if($(this).attr("data-id")==id){
				$(this).siblings().first().children(":first-child").find("div").text(fans);
				$(this).append('<div class="follow">已关注</div>');
				$(this).find(".unfollow").remove();
			}
		})
		plus.nativeUI.closeWaiting()
	}
	ajax(url,param,success);
	plus.nativeUI.showWaiting();
})
//登录返回刷新页面
document.addEventListener('refresh', function(event) {
	colorBlack();
	mui('#pullRefresh').pullRefresh().beginPulldown();
	$(".mui-pull").show();
	mui('#pullRefresh').pullRefresh().refresh(true);
})

