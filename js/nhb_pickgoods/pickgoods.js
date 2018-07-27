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
var current_page =0;
function getdata(t){
	function success(res){
		var data =res.data,html='';
		if(data.length==0){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(true);
			return false
		}
		$.each(data,function(){
			html+='<div class="goods" data-id="'+this.id+'">'+
							'<img src="public/uploads/'+this.pic+'" alt="" />'+
							'<div class="shadow">'+this.name+'</div>'+
						'</div>';
		})
		$(".supplygoods").append(html);
		if(t=="up"){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(false);
		}else{
			mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
			$(".mui-pull").show();
			mui('#pullRefresh').pullRefresh().refresh(true);
		}
	}
	var url=httpurl.goods.source_list,param={};
	current_page++;
	param.page=current_page;
	ajax(url,param,success)
}
function pullupRefresh(){
	var type ="up";
	getdata(type);

}
function pulldownRefresh(){
	$(".supplygoods").empty();
	$(".mui-pull").hide();
	current_page =0;
	var type ="down";
	getdata(type);	
}
//mui.plusReady(function(){

	var slider = mui("#slider");
	slider.slider({
		interval: 1000
	});
	$(".supplygoods").on("tap",".goods",function(){
		var name=$(this).children(".shadow").text();
		var goodsid =$(this).data("id");
		mui.openWindow({
	        id: 'nhb_supplygoods.html',
	        url: 'nhb_supplygoods.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras: {
	        	name:name,
	        	ids:goodsid
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$(".search").on("tap",function(){
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
	$(".information").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_chatandnotice.html',
	        url: 'nhb_chatandnotice.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$("#today").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_daysandtoday.html',
	        url: 'nhb_daysandtoday.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras: {
	        	title:"今日新款"
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$("#days").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_daysandtoday.html',
	        url: 'nhb_daysandtoday.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras: {
	        	title:"7日爆款"
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$("#tailgoodsmarket").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_tailgoodsmarket.html',
	        url: 'nhb_tailgoodsmarket.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$("#demand").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_needmarket.html',
	        url: 'nhb_needmarket.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	   	});
	});

//})

