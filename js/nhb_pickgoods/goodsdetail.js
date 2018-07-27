mui.plusReady(function(){
	var self = plus.webview.currentWebview();
    var goodsid = self.goodsid;//获得参数
    var shopid = self.shopid;//获得参数
    goodsid=4
	console.log(goodsid);
    var current_page=0;
    var userinfo =JSON.parse(localStorage.getItem("userinfo"));
   	if(userinfo==null){
   		userinfo={};
		userinfo.type=0;
	}
	mui.init({
		pullRefresh: {
			container: '#pullRefresh',
			down: {
				style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
				color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
			    height:'100px',//可选,默认50px.下拉刷新控件的高度,
			    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
			    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
//			    auto:true,
				callback: pulldownRefresh
			},
			up: {
				contentnomore:'没有更多的货品了',
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	})
	function getgoodsinfo(){
		var url =httpurl.cart.goodsDetail,param={},html="",html2="";
		param.goods_id=goodsid;
		function success(res){
			var data = res.data,type="",length=data.slide_pic.length,color="",size="";
			switch(data.type){
				case 0:		type="需求广场";		break;
				case 1:		type="尾货";		break;
				case 2:		type="新款";	    break;
				default:	type="爆款";		break;
			}
			$("#goods_name").text(data.goods_name);
			$("#price").text(data.price);
			$("#oprice").text(data.oprice);
			$("#city").text(data.city);
			$("#sale").text(data.sale);
			$("#fans").text(data.fans);
			$("#name").text(data.name);
			$("#log_pic").attr('src',data.log_pic);
			$("#type").text(type);
			$(".frame-top-img img").attr('src',data.logo_pic);
			
			$.each(data.slide_pic,function(index,val){
				switch(index){
					case 0:		
						html+='<div class="mui-slider-item mui-slider-item-duplicate">'+
										'<a href="#"><img src="../imgs/1.jpg"></a>'+
									'</div>'+
									'<div class="mui-slider-item">'+
										'<a href="#"><img src="../imgs/1.jpg"></a>'+
									'</div>'; 
						html2+='<div class="mui-indicator mui-active"></div>';		
					break;
					case length -1:		
						html+='<div class="mui-slider-item">'+
										'<a href="#"><img src="../imgs/1.jpg"></a>'+
									'</div>'+
									'<div class="mui-slider-item mui-slider-item-duplicate">'+
										'<a href="#"><img src="../imgs/1.jpg"></a>'+
									'</div>'; 
						html2+='<div class="mui-indicator"></div>';		
					break;
					default:	
						html+='<div class="mui-slider-item">'+
											'<a href="#"><img src="../imgs/1.jpg"></a>'+
										'</div>';
						html2+='<div class="mui-indicator"></div>';		
					break;
				}
			})
			$("#sliderimg").empty();
			$("#sliderimg").append(html);
			$("#mui-slider-indicator").empty();
			$("#mui-slider-indicator").append(html2)
			var slider = mui("#slider");
			slider.slider({
				interval: 1000
			});
			userinfo.type==1 ? $(".frame-top-money span").text(data.oprice) : $(".frame-top-money span").text(data.price);
			$.each(data.sku[0].subset, function(index) {
				index==data.sku[0].subset.length-1?	color+=this.classname:color+=this.classname+"、";
			});
			$.each(data.sku[1].subset, function(index) {
				index==data.sku[0].subset.length-1?	size+=this.classname:size+=this.classname+"、";
			});
			$("#halffabric").text(data.fabric);
			$("#halftype").text(data.cate_name.classname);
			$("#halfcolor").text(color);
			$("#halfsize").text(size);
			html="";
			$.each(data.img_url, function(index,val) {
//				html+='<img src="'+val+'"/>';
				html+='<img src="../imgs/1.jpg"/>';
			});
			$(".picture-box").append(html)
			mui('#pullRefresh').pullRefresh().endPulldownToRefresh();			
		}
		console.log(JSON.stringify(param))
		debugger
		ajax(url,param,success)
	}
	function getcomment(){
		mui('#pullRefresh').pullRefresh().endPullupToRefresh(true);
	}
	getgoodsinfo();
	//下拉刷新
	function pulldownRefresh(type,id){
		mui('#pullRefresh').pullRefresh().refresh(true);
		$("#pj").empty();
		current_page =0;
		getgoodsinfo();
	}
	//上啦加载
	function pullupRefresh(){
		getcomment();
	}
	

	
	function naver(id){
		var obj = $(id);
		var oPos = obj.get(0).offsetTop;
		return oPos;
	}
	function st(){
	    //变量t是滚动条滚动时，距离顶部的距离
	    var t = document.documentElement.scrollTop||document.body.scrollTop;
	    var xq =naver("#xq"),pj =naver("#pj");
	    if(t<200){
	    	$("header").hide();
	    	$(".collect").hide();
	    	$(".top-shoucang").show()
	    	$(".button").css("width","5.837837rem");
	    }else if(t>(xq-64)&&t<(pj-64)){
	    	$("header").show();
	    	$(".mui-col-xs-4").removeClass("active");
	    	$($(".mui-col-xs-4")[1]).addClass("active");
	    	$(".collect").hide();
	    	$(".top-shoucang").show()
	    	$(".button").css("width","5.837837rem");
	    }else if(t>(pj-64)){
	    	$("header").show();
	    	$(".mui-col-xs-4").removeClass("active");
			$($(".mui-col-xs-4")[2]).addClass("active");
			$(".collect").show();
			$(".top-shoucang").hide()
			$(".button").css("width","4.405405rem");
	    }
	}
	$(".mui-col-xs-4").on("tap",function(){
		$(this).parent().find(".mui-col-xs-4").removeClass("active");
		$(this).addClass("active");
		window.onscroll=function(){} 
		if($(this).text()=="详情"){
			var top =naver("#xq")-64;
			window.scrollTo(0,top); 
			$(".collect").hide();
	    	$(".top-shoucang").show()
	    	$(".button").css("width","5.837837rem");
		}else if($(this).text()=="评价"){
			var top =naver("#pj")-64;
			window.scrollTo(0,top); 
			$(".collect").show();
			$(".top-shoucang").hide()
			$(".button").css("width","4.405405rem");
		}else {
			window.scrollTo(0,0); 
			$(".collect").hide();
	    	$(".top-shoucang").show();
	    	$(".button").css("width","5.837837rem");
		}
		window.onscroll=function(){	st();} 
	})
	window.onscroll=function(){	st();} 
	
	
	

	//打开加入购物车菜单
	menus("addcart",'nhb_goodsdetail_addcart.html',"nhb_goodsdetail_addcart.html","30%");
	function menus(_id,_href,_hrefId,Top){
	    var menu;
	    var showMenu = false;
	    var _self = plus.webview.currentWebview();
	    _self.addEventListener('maskClick', closeMenu);
	      //查看更多
	    var menu_btn = document.getElementById(_id);
	    setTimeout(function() {
	        menu = mui.preload({
		        id: _hrefId,
		        url: _href,
		        extras:{
		            goodsid:goodsid,
		            shopid:shopid
		        },
		        styles: {
		            right: "0px",
		            top: Top,
		            bottom: "0px",
		            width: '100%',
		        },
		        show: {
		            aniShow: 'slide-in-bottom',
		        },
	        });
	    }, 200);
	    var isInTransition = false;
	      /**
	       * 显示侧滑菜单
	       */
	    function openMenu() {
	        if(isInTransition) {
	          	return;
	        }
	        if(!showMenu) {
	          //侧滑菜单处于隐藏状态，则立即显示出来；
	          	isInTransition = true;
		        menu.setStyle({
		            mask: 'rgba(0,0,0,0)'
		        }); //menu设置透明遮罩防止点击
		        menu.show('slide-in-bottom', 500, function() {
		            //主窗体显示遮罩
		            _self.setStyle({
		              	mask: 'rgba(0,0,0,0.4)'
		            });
		            mui.later(function() {
		              	isInTransition = false;
		              	menu.setStyle({
		                		mask: "none"
		              	}); //移除menu的mask
		            }, 550);
		            showMenu = true;
		        });
	        }
	    };
	      /**
	       * 关闭菜单
	       */
	    function closeMenu() {
	        if(isInTransition) {
	          	return;
	        }
	        if(showMenu) {
	          //关闭遮罩；
	          //主窗体开始侧滑；
	          	isInTransition = true;
	          	_self.setStyle({
	            	mask: 'none'
	         	});
	          	showMenu = false;
	          //等动画结束后，隐藏菜单webview，节省资源；
	          	mui.later(function() {
		            isInTransition = false;
		            menu.hide("slide-in-bottom", 500);
	          	}, 50);
	        }
	    };
		//点击弹出加入购物车
	    menu_btn.addEventListener("tap", function(e) {
	        if(showMenu) {
	          closeMenu();
	        } else {
	          openMenu();
	        }
	    }, false)
	}
})