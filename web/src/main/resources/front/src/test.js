// 处理粘贴事件
// $("#aaa").on('paste', function(eventObj) {
//     // 处理粘贴事件
//     var event = eventObj.originalEvent;
//     var imageRe = new RegExp(/image\/.*/);
//     var fileList = $.map(event.clipboardData.items, function (o) {
//         if(!imageRe.test(o.type)){ return }
//         var blob = o.getAsFile();
//         return blob;
//     });
//     if(fileList.length <= 0){ return }
//     upload(fileList);
//     //阻止默认行为即不让剪贴板内容在div中显示出来
//     event.preventDefault();
// });

document.addEventListener('paste', function (event) {
    console.log(event)
    var isChrome = false;
    if ( event.clipboardData || event.originalEvent ) {
        //not for ie11  某些chrome版本使用的是event.originalEvent
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if ( clipboardData.items ) {

            var hasFile = false;
            for(var i = 0 ; i < clipboardData.types.length; i ++){
                if(clipboardData.types[i] == "Files"){
                    hasFile = true;
                }
            }
            if(!hasFile)
                return;

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

            //阻止默认行为即不让剪贴板内容在div中显示出来
            event.preventDefault();

            //在items里找粘贴的image,据上面分析,需要循环
            for (var i = 0; i < len; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    //getAsFile() 此方法只是living standard firefox ie11 并不支持
                    blob = items[i].getAsFile();
                    uploadImgFromPaste(blob, 'paste', isChrome);
                }
            }

            /*if ( blob !== null ) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    // event.target.result 即为图片的Base64编码字符串
                    var base64_str = event.target.result;//获得图片base64字符串
                    //可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
                uploadImgFromPaste(base64_str, 'paste', isChrome);
                }
                reader.readAsDataURL(blob);//传入blob对象,读取文件
            }*/
        } else {
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
            }, 1);
        }
    } else {
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
        }, 1);
    }
})

//调用图片上传接口,将file文件以formData形式上传
function uploadImgFromPaste (file, type, isChrome) {
    // var formData = new FormData();
    // formData.append('files', file);
    // formData.append('submission-type', type);

    var fd = new FormData();
    fd.append('uploadFile', file);
    // fd.append('name', "dsadsa")
    fd.append('description','description')

    var editor=document.getElementById("aaa");
    $.ajax({
        url: "/res/upload",
        type: 'POST',
        dataType: 'json',
        data: fd,
        processData: false,
        contentType: false,
        xhrFields: { withCredentials: true },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        success: function(res){
            var len=res.data.length;
            for ( var i = 0; i < len; i ++) {
                var img = document.createElement('img');
                img.src = res.data[i]; //设置上传完图片之后展示的图片
                editor.appendChild(img);
            }
        },
        error: function(){
            alert("上传图片错误");
        }
    });


    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', '/upload_editor_photo3');
    // xhr.onload = function () {
    //     console.log(xhr.readyState);
    //     if ( xhr.readyState === 4 ) {
    //         if ( xhr.status === 200 ) {
    //             var data = JSON.parse(xhr.responseText),
    //                 editor = document.getElementById('aaa');
    //             if ( isChrome ) {
    //                 var len=data.data.length;
    //                 for ( var i = 0; i < len; i ++) {
    //                     var img = document.createElement('img');
    //                     img.className = 'my_img';
    //                     img.src = data.data[i]; //设置上传完图片之后展示的图片
    //                     editor.appendChild(img);
    //                 }
    //             } else {
    //                 var imgList = document.querySelectorAll('#aaa img'),
    //                     len = imgList.length,
    //                     i;
    //                 for ( i = 0; i < len; i ++) {
    //                     if ( imgList[i].className !== 'my_img' ) {
    //                         imgList[i].className = 'my_img';
    //                         imgList[i].src = data.data[i];
    //                     }
    //                 }
    //             }
    //
    //         } else {
    //             console.log( xhr.statusText );
    //         }
    //     };
    // };
    // xhr.onerror = function (e) {
    //     console.log( xhr.statusText );
    // }
    // xhr.send(formData);
}

function upload(fileList) {
    for(var i = 0, l = fileList.length; i < l; i++){
        var fd = new FormData();
        var f = fileList[i];
        fd.append('uploadFile', f);
        fd.append('name', "dsadsa")
        fd.append('description','description')

        var editor=document.getElementById("aaa");
        $.ajax({
            url: "/res/upload",
            type: 'POST',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType: false,
            xhrFields: { withCredentials: true },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            success: function(res){
                var len=res.data.length;
                for ( var i = 0; i < len; i ++) {
                    var img = document.createElement('img');
                    img.src = res.data[i]; //设置上传完图片之后展示的图片
                    editor.appendChild(img);
                }
            },
            error: function(){
                alert("上传图片错误");
            }
        });
    }
}