mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style:'circle',
			color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
		    height:'100px',//可选,默认50px.下拉刷新控件的高度,
		    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
		    offset:'10px', //可选 默认0px,下拉刷新控件的起始位置
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var current_page =0;
var userinfo =JSON.parse(localStorage.getItem("userinfo"));
function getdata(t){
	function success(res){
		var data =res.data,html='';
		if(data.length==0){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(true);
			return false
		}
		$.each(data,function(){
			html+='';
		})
		$(".contentLists").append(html);
		if(t=="up"){
			mui('#pullRefresh').pullRefresh().endPullupToRefresh(false);
		}else{
			mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
			$(".mui-pull").show();
			mui('#pullRefresh').pullRefresh().refresh(true);
		}
	}
	var url=httpurl.need.needList,param={};
	current_page++;
	param.page=current_page;
	ajax(url,param,success)
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	$(".contentLists").empty();
	current_page=0;
	var type="down";
	getdata(type)
//	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	var type="up";
	getdata(type)
//	mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
}
/*
 * 判断身份信息
 */

//var userinfo={1:1};
//userinfo.type=2
//userinfo.type=0
if(userinfo!=null){ //已登录
	if(userinfo.type==2){
		$(".operation").css("display","flex")  //渲染的时候判断
	}else{
		$(".camera").show()
	}
}else{
	$(".camera").show()
}

$(".camera").on("tap",function(){
	if(userinfo==null){
		mui.openWindow({
	        id: '../nhb_hmlt_i/nhb_login.html',
	        url: '../nhb_hmlt_i/nhb_login.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	   });
	}
	mui.openWindow({
        id: 'nhb_releaseneed.html',
        url: 'nhb_releaseneed.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$(".contentLists").on("tap",".listItem",function(){
	mui.openWindow({
        id: 'nhb_needdetail.html',
        url: 'nhb_needdetail.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$(".contentLists").on("tap","#leavemessage",function(){
	$('.guestbook').show(); //留言出来
	mui.later(function(){
		$("#leave").trigger("click").focus()
	},100)
})
$("#leave").blur(function(){
	$('.guestbook').hide()
})


