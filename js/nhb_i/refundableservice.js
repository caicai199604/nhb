$(".nocheck").on("click",function(){
	$(this).siblings().removeClass("check");
	$(this).addClass("check");
	if($(this).text()=="换货"){
		$(".barter").show();
		$(".returngoods").hide()
	}else{
		$(".barter").hide();
		$(".returngoods").show()
	}
})