mui.init();
   var subpages= ['nhb_html_pickgoods/nhb_pickgoods.html'
							, 'nhb_html_classification/nhb_classification.html'
							, 'nhb_html_shoppingcart/nhb_shoppingcart.html'
							, 'nhb_html_i/nhb_i.html'];
var subpage_style = {
	top: '0px',
	bottom: '50px',
	scrollIndicator: "none"
};
var aniShow = {};
mui.plusReady(function() {
//仅支持竖屏显示
	var wv=plus.webview.currentWebview();
	// 关闭侧滑返回功能
	wv.setStyle({'popGesture':'none'});
	plus.screen.lockOrientation("portrait-primary");
	var self = plus.webview.currentWebview();
	var height = (plus.display.resolutionHeight - 50) + "px"; //解决底部栏随软键盘弹出而上升
	subpage_style.height=height;
	for(var i = 0; i < 4; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = "true";
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
	var activeTab = subpages[0];
	var tarTab=$('.mui-bar-tab .mui-tab-item.mui-active').index();
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		if(targetTab=='nhb_html_i/nhb_i.html'){
			var userinfo =JSON.parse(localStorage.getItem("userinfo"));
			if(userinfo!=null){
				colorWhite();
			}else{
				mui.openWindow({
			        id: 'nhb_html_i/nhb_login.html',
			        url: 'nhb_html_i/nhb_login.html',
			        show: {
			            aniShow: 'pop-in'
			        },
			        waiting: {
			             autoShow: true, //自动显示等待框，默认为true
			        }
			    });
			}
		}else{
			colorBlack();
		} 
		if (targetTab == activeTab) {
			return;
		}
		if(mui.os.ios||aniShow[targetTab]){
			plus.webview.show(targetTab);
		}else{
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow,temp);
			plus.webview.show(targetTab,"fade-in",300);
		}
		plus.webview.hide(activeTab);
		activeTab = targetTab;
	});
	var userinfo =JSON.parse(localStorage.getItem("userinfo"));
	if(userinfo!=null){
		if(userinfo.type==2){
			$("#nahuoche").hide();
		}
	}
	mui.back = function() {
		var btnArray = ['是', '否'];
		mui.confirm('是否退出应用', '拿货宝', btnArray, function(e) {
			if(e.index == 0) {
				plus.runtime.quit();
			}
		})
	}
	 //自定义事件，模拟点击“首页选项卡”
	document.addEventListener('gohome', function(event) {
		  var defaultTab = document.getElementById("index");
		  //模拟首页点击
		  mui.trigger(defaultTab, 'tap');
		  //切换选项卡高亮
		  var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
		  if(defaultTab !== current) {	  	
		    current.classList.remove('mui-active');
		    defaultTab.classList.add('mui-active');
		}
	});
	document.addEventListener('isbusiness', function(event) {
		var userinfo =JSON.parse(localStorage.getItem("userinfo"));
		if(userinfo!=null){
			if(userinfo.type==2){
			$("#nahuoche").hide();
			}else{ 
				$("#nahuoche").show();
			}
		}else{
			$("#nahuoche").show();
		}
		colorBlack();
	});
});
