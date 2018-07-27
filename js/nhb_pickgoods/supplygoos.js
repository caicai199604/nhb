mui.init({
	swipeBack:true,
	pullRefresh: {
		container: '#pullrefresh',
		down : {
		    style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
		    color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
		    height:'100px',//可选,默认50px.下拉刷新控件的高度,
		    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
		    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
			callback: pulldownRefresh
		},
		up: {
			contentnomore:'没有更多店铺了',
			contentrefresh: '正在加载...',
			auto: true,//可选,默认false.首次加载自动上拉刷新一次
			callback: pullupRefresh
		}
	}
})
	var current_page =0,hid='';
function getdata(id,t){
	function success(res){	
		var data =res.data[0],html='';
		if(!res.data[0]){
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			return false;
		}
		data=data.seller;
		$.each(data,function(){
			html+='<div class="shop" data-id="'+this.id+'">'+
							'<img src="'+this.pic+'"/>'+
							'<div class="title">'+
								'<div class="shopname">'+this.name+'</div>'+
								'<div class="hengxian"></div>'+
								'<div class="describe">'+this.slogan+'</div>'+
							'</div>'+
						'</div>'
		})
		$(".mui-scroll").append(html);
		if(t=="up"){
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		}else{
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			$(".mui-pull").show();
			mui('#pullrefresh').pullRefresh().refresh(true);
		}
	}
	var url=httpurl.goods.seller_list,param={};
	current_page++
	param.page=current_page;
	param.id=id;
	ajax(url,param,success)
}

function pulldownRefresh(){
	$(".mui-scroll").empty();
	$(".mui-pull").hide();
	current_page =0;
	var type ="down";
	getdata(hid,type);
}
function pullupRefresh(){
	var type ="up";
	getdata(hid,type);
}
mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var name = self.name;//获得参数
    var id = self.ids;//获得参数
   	$("#name").html(name).attr("data-id",id);
   	hid =id
	$(".mui-scroll").on("tap",".shop",function(){
//		var shopid =$(this).attr("data-id");
//		console.log(id)
		mui.openWindow({
	        id: '../nhb_html_i/nhb_shop.html',
	        url: '../nhb_html_i/nhb_shop.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras: {
	        	shopid:shopid
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
});


