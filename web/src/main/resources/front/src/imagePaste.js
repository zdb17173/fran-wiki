document.getElementById("text-input").addEventListener('paste', function (event) {

    if ( event.clipboardData || event.originalEvent ) {
        //not for ie11  某些chrome版本使用的是event.originalEvent
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if ( clipboardData.items ) {
            // for chrome
            var  items = clipboardData.items,
                len = items.length,
                blob = null;
            isChrome = true;
            //items.length比较有意思，初步判断是根据mime类型来的，即有几种mime类型，长度就是几（待验证）
            //如果粘贴纯文本，那么len=1，如果粘贴网页图片，len=2, items[0].type = 'text/plain', items[1].type = 'image/*'
            //如果使用截图工具粘贴图片，len=1, items[0].type = 'image/png'
            //如果粘贴纯文本+HTML，len=2, items[0].type = 'text/plain', items[1].type = 'text/html'
            // console.log('len:' + len);
            // console.log(items[0]);
            // console.log(items[1]);
            // console.log( 'items[0] kind:', items[0].kind );
            // console.log( 'items[0] MIME type:', items[0].type );
            // console.log( 'items[1] kind:', items[1].kind );
            // console.log( 'items[1] MIME type:', items[1].type );

            //在items里找粘贴的image,据上面分析,需要循环
            for (var i = 0; i < len; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    //getAsFile() 此方法只是living standard firefox ie11 并不支持
                    blob = items[i].getAsFile();
                    uploadImgFromPaste(blob, 'paste', isChrome);
                    //阻止默认行为即不让剪贴板内容在div中显示出来
                    event.preventDefault();
                }
            }
        }
        /*else {
            //for firefox
            setTimeout(function () {
                //设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
                var imgList = document.querySelectorAll('#aaa img'),
                    len = imgList.length,
                    src_str = '',
                    i;
                for ( i = 0; i < len; i ++ ) {
                    if ( imgList[i].className !== 'my_img' ) {
                        //如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
                        src_str = imgList[i].src;
                    }
                }
                uploadImgFromPaste(src_str, 'paste', isChrome);
                event.preventDefault();
            }, 1);
        }*/
    }
    /*else {
        //for ie11
        setTimeout(function () {
            var imgList = document.querySelectorAll('#aaa img'),
                len = imgList.length,
                src_str = '',
                i;
            for ( i = 0; i < len; i ++ ) {
                if ( imgList[i].className !== 'my_img' ) {
                    src_str = imgList[i].src;
                }
            }
            uploadImgFromPaste(src_str, 'paste', isChrome);
            event.preventDefault();
        }, 1);
    }*/
});


//调用图片上传接口,将file文件以formData形式上传
function uploadImgFromPaste (file, type, isChrome) {

    var fd = new FormData();
    fd.append('uploadFile', file);
    fd.append('name', "screenshot" + Date.parse(new Date()));
    fd.append('description','description')

    $.ajax({
        url: "/res/upload",
        type: 'POST',
        dataType: 'json',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data){
            //上传成功后自动添加到正文
            if(data.status == 200){
                var path = data.data;
                addSelectedToEditor(path);
            }
        },
        error: function(){
            alert("上传图片错误");
        }
    });
}