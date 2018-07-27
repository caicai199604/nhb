colorBlack();
//colorWhite();
//文字变成白色
function colorWhite(){
	  mui.plusReady(function(){
	    	plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque"); 
	  });
}
//文字变黑色
function colorBlack(){
	  mui.plusReady(function(){
	    	plus.navigator.setStatusBarStyle("dark");
	  });
}
//手机正则
function phonecheck(data){
		if(/^1(3|4|5|7|8)\d{9}$/.test(data)){
				return true
		}else{
				return false
		}
}
//手机正则
//手机中间四位隐藏
function phonehide(data){
//		data=data.toString();
		var san=data.substring(0, 3);
		var si = data.substring(data.length-4,data.length);
		return data = san+"****"+si;
		
}
//手机中间四位隐藏
//数字与字母正则
function numbersletterscheck(data){
		console.log(data)
		if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(data)){
				return true
		}else{
				return false
		}
}
//数字与字母正则
//接口路径
var http="http://192.168.0.141/v1/";
var httpimg="";
var httpurl={
						user:{
								Reg:http+"user/open/Reg",
								Login:http+"user/open/Login"
						},
						goods:{
								source_list:http+"goods/source_list",//拿货宝资源地列表   2018-06-28 $page = 1,$num = 6
								seller_list:http+"goods/seller_list",//拿货宝卖家列表   2018-06-28 $page = 1,$num = 6
								tail:http+"goods/tail",//
								seven:http+"goods/seven",//七日爆款接口   2018-06-29 classname代表衣服的类型 id指的是这个类型衣服的 七日爆款  type=3
								seven_list:http+"goods/seven_list",//七日爆款列表图接口   2018-06-29 sale代表销量 price代表价格 logo_pic代表列表图 goods_name代表商品的名称  $page=1,$num=6,$cate_id='3'
								index:http+"goods/index",//今日上新中上新分类首页新款接口
								goodsList:http+"goods/goodsList",//今日上新中上新分类首页产品列表图 $num=6,$page=1,$cate_id='3'
								goodsComment:http+"goods/goodsComment",//商品评价接口
								goodsDetail:http+"goods/goodsDetail",//商品详情接口 传入参数goods_id=5
						},
						person:{//个人中心
//								attention:http+"person/attention",//关注接口
								attentionList:http+"user/Attention/attentionList",//个人中心中关注商家列表图
								tract:http+"user/Tract/tract",///个人中心中物品我的足迹列表图
								deltract:http+"user/Tract/deltract",//删除我的足迹列表图 ids足迹表中id数组集合
								delalltract:http+"user/Tract/delalltract",//全删除我的足迹列表图不需要传参数但必须登陆
							
						},
						cart:{
								index:http+"cart/index",//购物车列表功能cart/
								add_cart:http+"cart/add_cart",// 需要参数 sku_id  goods_id  nums
								del_cart:http+"cart/del_cart",//goods_id 产品id
								changeCartNums:http+"cart/changeCartNums",//接口传入值 id user_id nums
								goodsDetail:http+"cart/goodsDetail",//商品详情 goods_id
								change:http+"cart/change" ,//将商品颜色和大小转化成sku_id,再去调加入购物车接口
								nums:http+"cart/nums" //购物车的数据数量
						},
						order:{
								makeOrder:http+"order/makeOrder",//商品立即下单页面数据验证$goods_id,$goods_nums,$sku_id
								confirmOrder:http+"order/confirmOrder",//订单展示页面的接口
								submitOrder:http+"order/submitOrder",//提交订单的接口goods_id goods_nums sku_id address_id remark
								makeCartOrder:http+"order/makeCartOrder",//从购物车进行购买时的数据验证信息接口$goods_id,
								submitCartOrder:http+"order/submitCartOrder",//从购物车进行购买时提交订单的接口 cartid,address_id,remark
								payOrder:http+"order/payOrder",//确认订单页面 需要参数为orderno订单号
						},
						address:{   //地址页面	`
							addressAdd:http+"address/addressAdd",//添加地址 consignee,telephone,province,city,address,is_default
							editAddress:http+"address/editAddress",//编辑地址
							defaultAddress:http+"address/defaultAddress",//设置默认地址
							delAddress:http+"address/delAddress",//删除地址
							addressList:http+"address/addressList"//地址列表
						},
						category:{   //分类页面
							search:http+"category/search",//mmr_goods_cate
							tj_hot:http+"category/tj_hot",////爆款推荐 mmr_goods
							cateList:http+"category/cateList",//产品分类 
							index:http+"category/index",//产品分类首页
						},
						collect:{    //收藏模块
							add_collect:http+"collect/add_collect",//添加收藏商品
							collectList:http+"collect/collectList",//收藏列表
							delCollect:http+"collect/delCollect",//删除收藏
						},
						need:{   //发布关于需求的接口
							releaseRequire:http+"collect/releaseRequire",//发布需求 需上传参数图片以及需求的内容
							needList:http+"collect/needList",///发布需求列表页面 没有参数						
						},
						search:{   //分类页面
							Search_hot:http+"search/Search_hot",//商品热搜功能
							up_new:http+"search/up_new",//上新产品搜索
							sale_number:http+"search/sale_number",//
							price:http+"search/price",//
							
						},
											
				}
				

function ajax(url,param,success,error){
		console.log(url);
		var userinfo =JSON.parse(localStorage.getItem("userinfo")),token="";
		if(userinfo!=null){
				token=userinfo.token
		}
		console.log("token:"+token);
		console.log(JSON.stringify(param))
		$.ajax({
				headers: {
						token : ""+token
				},
				type:"POST",
				url:url,
				async:true,
				data:param,
				datatype:"JSON",
				success:function(res){
		//			res=JSON.parse(res);
						console.log(JSON.stringify(res))
						if(res.error!=200){
								mui.toast(res.message);
								plus.nativeUI.closeWaiting()
								return false
						}
						success(res)
				},
				error:function(res){
						console.log("error")
						mui.toast("服务器异常！");
					
				}
		});
}
// 跳转页面方法
//function ow(id,url,param){
//console.log(JSON.stringify(param));
//	mui.openWindow({
//      id: id,
//      url: url,
//      show: {
//          aniShow: 'pop-in'
//      },
////      extras: {param},   //extras里面的就是参数了
//				extras: param,
//      waiting: {
//           autoShow: true, //自动显示等待框，默认为true
//      }
//  });
//}
//倒计时
function settime(val) { 
    if (countdown == 0) {
        val.text("获取验证码");  
        countdown = 60;  
        return false;  
    } else {  
        val.text("重新发送(" + countdown + ")");  
        countdown--;  
    }  
    setTimeout(function() {  
        settime(val);  
    },1000);  
} 