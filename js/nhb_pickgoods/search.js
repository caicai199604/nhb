document.getElementById("search").addEventListener("keydown",function(e){ 
    if(13 == e.keyCode){ //点击了“搜索”  
    	mui.openWindow({
	        id: 'nhb_searchlist.html',
	        url: 'nhb_searchlist.html',
	        show: {
	            aniShow: 'pop-in'
	        },
	        waiting: {
	             autoShow: true, //自动显示等待框，默认为true
	        }
	    });
       document.activeElement.blur();//隐藏软键盘 
    } 
},false); 