mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var cartid=self.cartid;
    var good_id=self.good_id;
    var goods_nums=self.goods_nums;
    var sku_id=self.sku_id;
	cartid="-16-18-12-";
//	goodid=16;
//	goods_nums=1;
//	sku_id=2;
	function getdata(){
		var url="",param={};
		if(good_id){//直接拿货
			var url=httpurl.order.makeOrder;
			param.goods_id=good_id;
			param.goods_nums=goods_nums;
			param.sku_id=sku_id;
			
		}else{//拿货车拿货
			var url=httpurl.order.makeCartOrder;
			param.cartid=cartid;
		}
		function success(res){
			var data=res.data,html="";
			console.log(JSON.stringify(data.address))
			if(data.address.id==0){
				html='<div class="addressbox">'+
							'<img src="../imgs/icon_dzgl.svg" alt="" />'+
							'<div>'+
								'<div class="name">去添加收货地址</div>'+
							'</div>'+
						'</div>'+
						'<img src="../imgs/icon_youjiantou.svg" alt="" />'
			}else{
//				if(this.district==null){
//					this.district="";
//				}
				html='<div class="addressbox" data-id="'+data.address.id+'">'+
							'<img src="../imgs/icon_dzgl.svg" alt="" />'+
							'<div>'+
								'<div class="name">'+data.address.consignee+'&nbsp;&nbsp;'+phonehide(data.address.telephone)+'</div>'+
								'<div class="address">'+data.address.province+data.address.city+data.address.district+data.address.address+'</div>'+
							'</div>'+
						'</div>'+
						'<img src="../imgs/icon_youjiantou.svg" alt="" />'
				
			}
			$(".addresstop").append(html);
			html="";
			$.each(data.list, function(key,val) {
				var xiaoji=0,shuliang=0;
				html+='<div class="box"> '+
								'<ul class="mui-table-view">'+
									'<li class="mui-table-view-cell mui-media box-top">'+
										'<div class="shopname">'+
											'<img src="../imgs/icon_dianpu_small.svg" alt="" />'+
											'<span>'+key+'</span>'+
											'<img src="../imgs/icon_youjiantou.svg" alt="" />'+
										'</div>'+
									'</li>'+
									'<li class="mui-table-view-cell mui-media box-mid">';
				$.each(val,function(){
					console.log(this.goods_price)
					html+='<div class="mui-media-body box-mid-info">'+
									'<div class="img"><img src="'+this.goods_img+'" alt="" /></div>'+
									'<div class="goodsname">'+
										'<div class="mui-ellipsis name-info">'+this.goods_name+'</div>'+
										'<div class="name-type">'+this.sku_info.classname+","+this.sku_info.name+'</div>'+
										'<div class="moneyandcount"><div class="money">￥'+this.goods_price+'</div> <div class="count">x'+this.nums+'</div></div>'+
									'</div>'+
								'</div>';
					xiaoji+=this.total_price;
					shuliang+=this.nums;
				})
				xiaoji=xiaoji.toFixed(2);
				html+='</li><li class="mui-table-view-cell mui-media remark">'+
								'<span class="remarkname">备注：</span> '+
								'<input type="" name="" id="" value="" placeholder="填写内容已和买手协商确认"/>'+
							'</li>'+
							'<li class="mui-table-view-cell mui-media box-bottom">'+
								'<div class="totalcount"> 共<span>'+shuliang+'</span>件货品</div>'+
								'<div class="smalltotal"> '+
									'<div>小计：</div>'+
									'<div class="totalmoney">¥'+xiaoji+'</div>'+
								'</div>'+
							'</li>'+
						'</ul>'+
					'</div>';
			});
			$(".mui-content").append(html);
			var total=data.total_price.toFixed(2).toString();
			html='￥<span>'+total.split(".")[0]+'</span> .'+total.split(".")[1];
			$(".bottom .money").html(html);
			plus.nativeUI.closeWaiting();
		}
		plus.nativeUI.showWaiting();
		ajax(url,param,success);
	}
	getdata()
	$(".addresstop").on("tap",function(){
		mui.openWindow({
	        id: 'nhb_manageaddress.html',
	        url: 'nhb_manageaddress.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        extras:{
	        	choose:1
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
	})
	$(".button").on("tap",function(){
		if($(".addresstop .address")==0){
			mui.toast("请选择收货地址！");
			return false;
		}
		var url="",param={};
		var address_id =$(".addrestop .addressbox").data("id"),remark="";
		if(good_id){//直接拿货
			var url=httpurl.order.submitOrder;//    
			param.goods_id=good_id;
			param.goods_nums=goods_nums;
			param.sku_id=sku_id;
			param.address_id=address_id;
			param.remark=remark;
			
		}else{//拿货车拿货
			var url=httpurl.order.submitCartOrder;
			param.cartid=cartid;
			param.address_id=address_id;
			param.remark=remark;
		}
		function success(res){
			
		}
		ajax(url,param,success);
	})

	
	
});


