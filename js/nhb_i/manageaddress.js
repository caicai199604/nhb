mui.plusReady(function(){
	var self = plus.webview.currentWebview();
    var choose = self.choose;//获得参数
    console.log(choose);
	mui.init({
		beforeback: function(){
			if(!choose){
				var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
				mui.fire(i,'refresh');
				plus.webview.currentWebview().close();
				return true;
			}else{
				mui.fire(plus.webview.getWebviewById('nhb_orderaffirm.html'),'refresh');
			}
			
		}
	});
	
	function getdata(){
		var url=httpurl.address.addressList,param={};
		function success(res){
			var data=res.data,html="",check="";
			$.each(data, function() {
				this.is_default==1?check="active":check="";
				html+='<div class="box" data-id="'+this.id+'">'+
								'<div class="box-top">'+
									'<div class="box-top-left  '+check+'" data-id="'+this.id+'">'+
										'<img src="../imgs/icon_weixuan.svg" alt="" class="nocheck"/>'+
										'<img src="../imgs/icon_gouxuan.svg" alt=""  class="check"/><div>&nbsp;设为默认</div>'+
									'</div>'+
									'<div class="box-top-right">'+
										'<div class="flex edit" data-id="'+this.id+'" data-consignee="'+this.consignee+'" data-telephone="'+this.telephone+'" data-province="'+this.province+'" data-city="'+this.city+'" data-district="'+this.district+'"  data-address="'+this.address+'"><img src="../imgs/icon_bianji.svg" alt="" />&nbsp;<span>编辑</span></div>'+
										'<div  class="flex del" data-id="'+this.id+'"><img src="../imgs/icon_delete.svg" alt="" />&nbsp;<span>删除</span></div>'+
									'</div>'+
								'</div>'+
								'<div class="box-mid">'+
									'<div class="name-phone"><span>'+this.consignee+'</span>&nbsp;<span>'+phonehide(this.telephone)+'</span></div>'+
									'<div class="address">'+this.province+this.city+this.district+this.address+'</div>'+
								'</div>'+
							'</div>';
			});
			
			$(".mui-content").append(html)
			plus.nativeUI.closeWaiting();
		}
		ajax(url,param,success);
		plus.nativeUI.showWaiting();
	}
	$(".mui-content").empty()
	getdata();
	$(".bottom").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_deliveryaddress.html',
	        url: 'nhb_deliveryaddress.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$(".mui-content").on("tap",".edit",function(){
		var name =$(this).find("span").text();
		var addressid=$(this).data("id");
		var consignee=$(this).data("consignee");
		var telephone=$(this).data("telephone");
		var province=$(this).data("province");
		var city=$(this).data("city");
		var district=$(this).data("district");
		var address=$(this).data("address");
		var  is_default= false;
		if($(this).parents(".box").find(".active").length!=0){
			is_default=true;
		}
		mui.openWindow({
	        id: 'nhb_deliveryaddress.html',
	        url: 'nhb_deliveryaddress.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras:{
	        	name:name,
	        	addressid:addressid,
	        	consignee:consignee,
        		telephone:telephone,
        		province:province,
        		city:city,
        		district:district,
        		address:address,
        		is_default:is_default
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$(".mui-content").on("tap",".del",function(){
		var that=$(this);
		var url=httpurl.address.delAddress,param={};
		function success(res){
			plus.nativeUI.closeWaiting();
			mui.toast(res.message);
			that.parents(".box").remove();
		}
		param.id=$(this).data("id");
		console.log(param.id);
		ajax(url,param,success);
		plus.nativeUI.showWaiting();
	})
	$(".mui-content").on("tap",".box",function(){
		if(choose==undefined){
			return false
		}
		var addressid =$(this).data("id");
		var url=httpurl.address,param={};  //还没完善。确认订单页面切换地址
		function success(res){
			mui.back();
		}
		param.id=addressid;
		ajax(url,param,success)
	})
	
	$(".mui-content").on("tap",".box-top-left ",function(){
		var that=$(this);
		if($(this).hasClass("active")){
			return
		}else{
			var url=httpurl.address.defaultAddress,param={};
			function success(res){
				plus.nativeUI.closeWaiting();
				mui.toast(res.message);
				$(".mui-content").find(".active").removeClass("active");
				that.addClass("active");
			}
			param.id=that.data("id");

			ajax(url,param,success);
			plus.nativeUI.showWaiting();
		}
	})
	document.addEventListener('refresh', function(event) {
		$(".mui-content").empty()
		getdata()
	});
	
	
})

