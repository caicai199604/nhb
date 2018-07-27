
mui.plusReady(function(){
	
	var self = plus.webview.currentWebview();
    var title = self.title;//获得参数
    var type="today",html="";
    titlename=title;

    $(".mui-title").text(title);
    
    mui.init({
		pullRefresh: {
			container: '#pullRefresh',
			down: {
				style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
				color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
			    height:'100px',//可选,默认50px.下拉刷新控件的高度,
			    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
			    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
			    auto:true,
				callback: pulldownRefresh
			},
			up: {
				contentnomore:'没有更多的货品了',
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	})
	var current_page =0,havemore=true,titlename="";
	function getdata(t,id){
		function success(res){	
			var data =res.data,html='',tag;
			if(data.length==0){
				mui('#pullRefresh').pullRefresh().endPullupToRefresh(true);
				plus.nativeUI.closeWaiting()
				return false
			}
			if(title=="今日新款"){
				tag='<div class="new">新款</div>';
			}else{ 
				tag='<div class="burst">爆款</div>';
			}
			$.each(data,function(){
						html+='<div class="box" data-shopid="'+this.shop_id+'" data-id="'+this.id+'">'+tag+
								'<div><img src="'+this.logo_pic+'" alt=""  class="picture"/></div>'+
								'<div class="info">'+
									'<p>'+this.goods_name+'</p>'+
									'<div class="money"><span>￥</span>'+this.price+'</div>'+
									'<div class="sales">已售'+this.sale+'件</div>'+
								'</div>'+
							'</div>';	
			})
			$("#content").append(html);
			if(t=="down"){
				mui('#pullRefresh').pullRefresh().endPulldownToRefresh();			
			}else if(t=="up"){ 
				mui('#pullRefresh').pullRefresh().endPullupToRefresh(false);
			}else{
				plus.nativeUI.closeWaiting()
			}
		}
		var url="",param={};
		current_page++;
		param.page=current_page;
		if(title=="今日新款"){
			url=httpurl.goods.goodsList;
			param.cate_id=id;
		}else{
			url=httpurl.goods.seven_list;
			param.cate_id=id;
		}
		ajax(url,param,success)
	}
	function gettitledata(){
		function success(res){
			var data =res.data,html='';
			$.each(data,function(index){
				var active="";
				if(index==0){active ="mui-active"}
				html+='<a class="mui-control-item '+active+'" data-id="'+this.id+'" href="#item1mobile">'+this.classname+'<span class="solid"></span></a>'
			}) 
			$("#title").append(html); 
		}
		var url='',param={};
		if(title=="今日新款"){
			url=httpurl.goods.index;
		}else{
			url=httpurl.goods.seven; 
		}
		ajax(url,param,success)
	}
	gettitledata();
	function pulldownRefresh(type,id){
		mui('#pullRefresh').pullRefresh().refresh(true);
		$("#content").empty();
		current_page =0;
		if(!type){
			type ="down";
		}
		if(!id){
			id=$(".mui-active").attr("data-id");
		}
		
		getdata(type,id)
	}
	function pullupRefresh(){
		var type ="up",id=$(".mui-active").attr("data-id");
		getdata(type,id)
	}
	
	$("#title").on("tap",".mui-control-item",function(){
		var id =$(this).attr("data-id") ,type ="click";
		$("#content").empty();
		pulldownRefresh(type,id);
		plus.nativeUI.showWaiting();
		//居中显示
		var zwidth =$(this).parent().width() //滑动容器总长度
		var pwidth =document.documentElement.clientWidth || document.body.clientWidth; //设备宽度
		var pwidthb =pwidth/2;
		var left =$(this).position().left;
		var thisb =$(this).width()/2;
		if(left<pwidthb){
			mui('#sliderSegmentedControl').scroll().scrollTo(0,0,1000)
		}else if((left+pwidthb)>zwidth){
			mui('#sliderSegmentedControl').scroll().scrollTo((pwidth-zwidth),0,1000)
		}else{
			mui('#sliderSegmentedControl').scroll().scrollTo((-left +pwidthb-thisb),0,1000)
		}
	});

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
	$("#content").on("tap",".box",function(){
		var shopid=$(this).attr("data-shopid");
		var goodsid=$(this).attr("data-id");
		console.log(goodsid);
		mui.openWindow({
	        id: 'nhb_goodsdetail.html',
	        url: 'nhb_goodsdetail.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras:{
	        	shopid:shopid,
	        	goodsid:goodsid
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
})
