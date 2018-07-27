mui.init({
	
});
//mui.plusReady(function() {
	
	

var userinfo =JSON.parse(localStorage.getItem("userinfo"));
var isbusiness ="";
if(userinfo!=null){
	if(userinfo.type==2){
		isbusiness =true;
	}else{
		isbusiness =false;
	}
}
if(isbusiness){
	$(".shoporder").show();
//	$(".iorder").hide();
//	$("#leaguercertification").hide();
	$(".entershop").show();
	$(".bg-pink").show();
	$(".evaluated").hide();
	$(".complete").show();
	$("#buy").hide();
	$("#sell").show();
}else{
	$(".shoporder").hide();
	$(".iorder").show();
//	$("#leaguercertification").show();
	$("#leaguercertification").css("display","flex");
	$(".entershop").hide();
	$(".bg-pink").hide();
	$(".evaluated").show();
	$(".complete").hide();
	$("#buy").show();
	$("#sell").hide();
}
$(".set").on("tap",function(){
	mui.openWindow({
        id: 'nhb_set.html',
        url: 'nhb_set.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})

$(".charge").on("tap",function(){
	mui.openWindow({
        id: 'nhb_charge.html',
        url: 'nhb_charge.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$(".iorder").on("tap",function(){
	mui.openWindow({
        id: 'nhb_myorder.html',
        url: 'nhb_myorder.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#leaguercertification").on("tap",function(){
	mui.openWindow({
        id: 'nhb_leaguercertification.html',
        url: 'nhb_leaguercertification.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#ifootprint").on("tap",function(){
	mui.openWindow({
        id: 'nhb_ifootprint.html',
        url: 'nhb_ifootprint.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#replenishment").on("tap",function(){
	mui.openWindow({
        id: 'nhb_replenishment.html',
        url: 'nhb_replenishment.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#manageaddress").on("tap",function(){
	mui.openWindow({
        id: 'nhb_manageaddress.html',
        url: 'nhb_manageaddress.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#attentionshop").on("tap",function(){
	mui.openWindow({
        id: 'nhb_attentionshop.html',
        url: 'nhb_attentionshop.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#collectiongoods").on("tap",function(){
	mui.openWindow({
        id: 'nhb_collectiongoods.html',
        url: 'nhb_collectiongoods.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#ineed").on("tap",function(){
	mui.openWindow({
        id: 'nhb_ineed.html',
        url: 'nhb_ineed.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#applyshop").on("tap",function(){
	mui.openWindow({
        id: 'nhb_applyshop.html',
        url: 'nhb_applyshop.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$(".entershop").on("tap",function(){
	mui.openWindow({
        id: 'nhb_shop.html',
        url: 'nhb_shop.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#refundable").on("tap",function(){
	mui.openWindow({
        id: 'nhb_refundable.html',
        url: 'nhb_refundable.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#release").on("tap",function(){
	mui.openWindow({
        id: 'nhb_releasenew.html',
        url: 'nhb_releasenew.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#goodsmanage").on("tap",function(){
	mui.openWindow({
        id: 'nhb_goodsmanage.html',
        url: 'nhb_goodsmanage.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#evaluatemanage").on("tap",function(){
	mui.openWindow({
        id: 'nhb_evaluatemanage.html',
        url: 'nhb_evaluatemanage.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$("#datastatistics").on("tap",function(){
	mui.openWindow({
        id: 'nhb_datastatistics.html',
        url: 'nhb_datastatistics.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})


	document.addEventListener('refresh', function(event) {
		 colorWhite();
		 var userinfo =JSON.parse(localStorage.getItem("userinfo"));
		var isbusiness ="";
		if(userinfo!=null){
			if(userinfo.type==2){
				isbusiness =true;
//				console.log("isbusiness =true;")
			}else{
				isbusiness =false;
//				console.log("isbusiness =false;")
			}
		}
		if(isbusiness){
			$(".shoporder").show();
			$(".iorder").hide();
			$("#leaguercertification").hide();
			$(".entershop").show();
			$(".bg-pink").show();
			$(".evaluated").hide();
			$(".complete").show();
			$("#buy").hide();
			$("#sell").show();
		}else{
			$(".shoporder").hide();
			$(".iorder").show();
			$("#leaguercertification").show();
			$(".entershop").hide();
			$(".bg-pink").hide();
			$(".evaluated").show();
			$(".complete").hide();
			$("#buy").show();
			$("#sell").hide();
		}
	});
//});