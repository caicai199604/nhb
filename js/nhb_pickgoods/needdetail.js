mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style:'circle',
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
//	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
}


var userinfo =JSON.parse(localStorage.getItem("userinfo"));
//var userinfo={1:1};
//userinfo.type=2
//userinfo.type=0
//已登录
if(userinfo!=null){ 
	if(userinfo.type==2){
		$(".operation").css("display","flex")
	}else{
		$(".camera").show()
	}
}else{
	$(".camera").show()
}



//留言出来
$(".contentLists").on("tap","#leavemessage",function(){
	$('.guestbook').show(); 
	mui.later(function(){
		$("#leave").trigger("click").focus()
	},100)
})
$("#leave").blur(function(){
	$('.guestbook').hide()
})