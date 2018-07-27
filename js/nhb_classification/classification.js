
mui.init({
	
});
mui.plusReady(function() {
//	console.log($('#bottom-bar').css("position"))
		
});
var html =" ",name ="123132";
for(var i=0;i<4;i++){
	html +='<div class="mid-3-name  index-'+i+'"   ><div class="solid"></div><div class="a ">包包包</div></div>';
}
$("#mid-3").append(html);
$(".mid-3-name").on("click",function(){
	$(this).addClass("active").siblings().removeClass("active");
	$("#title").html($(this).find(".a").text());
	//请求右边图片
	ajax()
})
