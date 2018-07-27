
mui.init({
	beforeback: function(){
		var i = plus.webview.getWebviewById('nhb_html_i/nhb_i.html');
		mui.fire(i,'refresh');
		plus.webview.currentWebview().close();
		return true;
	}
});
//var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
//mask.show();//显示遮罩
function imgcount(){
	if($(".img").length==9){
		console.log($(".img").length);
		$(".uploadbox").hide();
	}else{
		$(".uploadbox").show();
	}
}
$(".next").on("tap",function(){
	mui.openWindow({
        id: 'nhb_releasenewnext.html',
        url: 'nhb_releasenewnext.html',
        show: {
            aniShow: 'pop-in'
        },
        waiting: {
             autoShow: true, //自动显示等待框，默认为true
        }
    });
})
$(".img-box").on("tap",".close",function(){
	$(this).parent().remove();
	imgcount();
})

//图片显示  
       function showPics(url,name){          
         //根据路径读取到文件   
           plus.io.resolveLocalFileSystemURL(url,function(entry){  
               entry.file( function(file){  
//             	console.log(JSON.stringify(file));
//                 var fileReader = new plus.io.FileReader();  
//                 fileReader.readAsDataURL(file);  
//                 fileReader.onloadend = function(e) {
//                 	
//                 }
					var path=file.fullPath;
                   	 img='<div class="img i">'+
								'<img src="'+path+'" alt="" />'+
								'<img src="../imgs/close11@2x.png" alt="" class="close"/>'+
							'</div>';
					$(".uploadbox").before(img);	
					imgcount()
               });  
          });   
       }  
        //压缩图片    
       function compressImage(url,filename){    
           var name="_doc/upload/"+filename;  
           plus.zip.compressImage({    
                   src:url,//src: (String 类型 )压缩转换原始图片的路径    
                   dst:name,//压缩转换目标图片的路径    
                   quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
                   overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件    
               },    
               function(zip) {  
                   //页面显示图片  
                   showPics(zip.target,name);  
               },function(error) {    
                   plus.nativeUI.toast("压缩图片失败，请稍候再试");    
           });    
       }   
        
        //调用手机摄像头并拍照  
       function getImage() {    
           var cmr = plus.camera.getCamera();    
           cmr.captureImage(function(p) {    
               plus.io.resolveLocalFileSystemURL(p, function(entry) {    
                   compressImage(entry.toLocalURL(),entry.name);    
               }, function(e) {    
                   plus.nativeUI.toast("读取拍照文件错误：" + e.message);    
               });    
           }, function(e) {    
           }, {    
               filter: 'image'   
           });    
       }  
       //从相册选择照片  
       function galleryImgs() {    
            plus.gallery.pick(function(e) {    
                var name = e.substr(e.lastIndexOf('/') + 1);  
               compressImage(e,name);  
            }, function(e) {    
            }, {    
                filter: "image"    
            });    
        }  
         
       //点击事件，弹出选择摄像头和相册的选项  
        function showActionSheet() {    
            var bts = [{    
                title: "拍照"    
            }, {    
                title: "从相册选择"    
            }];    
            plus.nativeUI.actionSheet({    
                    cancel: "取消",    
                    buttons: bts    
                },    
                function(e) {    
                    if (e.index == 1) {    
                        getImage();    
                    } else if (e.index == 2) {    
                        galleryImgs();    
                    }    
                }    
            );    
        } 
//点击添加图片 
$('.uploadbox').on('tap', function() {
	showActionSheet()
	imgcount()
})
//mask.close();//关闭遮罩

