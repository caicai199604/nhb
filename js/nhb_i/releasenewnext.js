

function frameclose(){
	$("#color").val("");
	$(".nocheck").removeClass("check");
	mui("#frame").popover('hide');
}
$(".nocheck").on("tap",function(){
	if($(this).hasClass("check")){
		$(this).removeClass("check")
	}else{
		$(this).addClass("check")
	}
})
$(".release").on("tap",function(){
	var data ={};
	$(".box input").each(function(){
		if($(this).val()==""){
			var name=$(this).attr("data-name")
			mui.toast('请输入'+name);
			return false
		}
		data[$(this).attr("name")]=$(this).val();
	})
	if($("#newtype").text()=="请选择类型"||$("#goodstype").text()=="请选择类型"){
		mui.toast('请选择类型');
		return false
	}
	data[$("#goodstype").attr("data-name")]=$("#goodstype").text();
	data[$("#newtype").attr("data-name")]=$("#newtype").text();

	if($(".colorlist").length!=0){
		var colorlist= {};
		$(".colorlist").each(function(){
			colorlist.color=$(this).first().text()
			var span =$(this).find(".colorlistright span");
			console.log(span.eq(0)[0]);
			var size=[]
			for(var i=0;i<span.length;i++){
				size.push(span.eq(i).text())			
			}
			colorlist.size=size;
		})
	}else{
		mui.toast('请选择颜色尺码');
		return
	}
	data.colorlist=colorlist;
	console.log(data);
});
$(".colorbox").on("tap","img",function(){
	$(this).parent().parent().remove();
});
$("#close").on("tap",function(){
	frameclose()
});
$(".add").on("tap",function(){
	var size =[],html="";
	$(".check").each(function () {
		size.push($(this).attr("data-value"));
	})
	if(!$(".color input").val()){
		mui.toast('请输入颜色');
		return false;
	}
	html+='<div class="colorlist">'+
					'<div>'+$(".color input").val()+'</div>'+
					'<div class="colorlistright">'
	for(var i=0; i<size.length-1;i++){
		html+='<span>'+size[i]+'</span>,'
	};
	var length=size.length-1;
	html+='<span>'+size[length]+'</span><img src="../imgs/icon_shanc.svg" alt="" class="colse"/></div></div>';
	$(".colorbox").append(html);
	frameclose()
});

(function($, doc) {
	$.init();
	$.ready(function() {
		var picker = new $.PopPicker();
		picker.setData([{
			value: 'ywj',
			text: '董事长 叶文洁'
		}, {
			value: 'aaa',
			text: '总经理 艾AA'
		}, {
			value: 'lj',
			text: '罗辑'
		}, {
			value: 'ymt',
			text: '云天明'
		}, {
			value: 'shq',
			text: '史强'
		}, {
			value: 'zhbh',
			text: '章北海'
		}, {
			value: 'zhy',
			text: '庄颜'
		}, {
			value: 'gyf',
			text: '关一帆'
		}, {
			value: 'zhz',
			text: '智子'
		}, {
			value: 'gezh', 
			text: '歌者'
		}]);
		mui(".box").on('tap',".goodslist", function(event) {
			picker.show(function(items) {
				Zepto("#goodstype").text(items[0].text );
			});
		}, false);
		mui(".box").on('tap', ".typelist",function(event) {
			picker.show(function(items) {
				Zepto("#newtype").text(items[0].text );
			});
		}, false);
				
	})
})(mui, document);

