
mui.plusReady(function(){
	mui.init({
		beforeback:function(){
    		mui.fire(plus.webview.getWebviewById('nhb_manageaddress.html'),'refresh');
		}
	})
    var self = plus.webview.currentWebview();
    var titlename = self.name;//获得参数
    var addressid = self.addressid;
	var consignee = self.consignee;
	var telephone = self.telephone;
	var province = self.province;
	var city = self.city;
	var district = self.district;
	var address = self.address;
	var is_default=self.is_default;
    if(titlename!=undefined){
    	$(".mui-title").find("span").text(titlename);
    	$("#name").val(consignee);
    	$("#phone").val(telephone);
    	$(".picker").text(province+" "+city+" "+district);
    	$("#textarea").val(address);
    	$(".picker").data("province",province);
    	$(".picker").data("city",city);
    	$(".picker").data("district",district);
    	
    	if(!is_default){
    		$(".mui-switch-handle").parent().removeClass("mui-active");
    	}
    }
   var cityPicker = new mui.PopPicker({
			layer: 3
		});
	cityPicker.setData(cityData3);
	$('.address').on('tap', function() {
		cityPicker.show(function(items) {
			if(items[2].text==undefined){
				items[2].text=""
			}
			$('.picker').text(items[0].text + " " + items[1].text+ " " + items[2].text);
			$(".picker").attr({"data-province":items[0].text,"data-city": items[1].text,"data-district":items[2].text});
		});
	});
    
    
    
	$("#save").on("tap",function(){
		var name = $("#name").val();
		var phone = $("#phone").val();
//		var address = $(".picker").text();
		var textarea = $("#textarea").val();
		var check=0 ;
		$(".mui-switch-handle").parent().hasClass("mui-active")? check= 1: check= 0 ;
		if(!name){
			mui.toast("请输入收货人！");
			return false;
		}
		if(!phonecheck(phone)){
			mui.toast("请输入正确收货人电话！");
			return false;
		}
		if(address=="请选择"){
			mui.toast("请选择地址！");
			return false;
		}
		if(textarea.length<5){
			mui.toast("请填写详细地址，不少于5个字！");
			return false;
		}
		var url="",param={};
		if(titlename){
			url=httpurl.address.editAddress;
			param.id=addressid;
		}else{
			url=httpurl.address.addressAdd;
		}
		function success(res){
			plus.nativeUI.closeWaiting();
			mui.back();
		}
		param.consignee=name;
		param.telephone=phone;
		param.province=$(".picker").data("province");
		param.city=$(".picker").data("city");
		param.district=$(".picker").data("district");
		param.address=textarea;
		param.is_default=check;
		plus.nativeUI.showWaiting();
		ajax(url,param,success);
	})
});
