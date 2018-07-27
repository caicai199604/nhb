mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style:'circle',
			callback: pulldownRefresh
		},
		up: {
			auto:true,
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	},
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});
var count = 0;
function pullupRefresh() {
	console.log("上啦加载")
	mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
}

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	console.log("下拉刷新")
	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
}