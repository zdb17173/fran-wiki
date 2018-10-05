import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


$(function () {

    //图片上传预览
    $("#uploadFile").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        //获取文件信息
        // console.log("objUrl = "+objUrl);
        if (objUrl) {
            $("#previewImgUpload").attr("src", objUrl);
        }
    });

    $('#fileName').popover({
        content: "上传文件的文件名，不填则使用文件本身的名称",
        trigger: "focus"
    });
});

//图片上传组件获取图片url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        //mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}


window.upload = function upload() {
    var fileName = $("#fileName").val();
    var data = new FormData();
    var files = $('#uploadFile').prop('files');
    data.append('uploadFile', files[0]);
    data.append('name', fileName)
    data.append('description','description')

    $.ajax({
        url: "/res/upload",
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false,
        dataType:"json",
        success : function(data) {

            if(data.status == 200){
                $('#exampleModal').modal('hide');
            }

            /*if (data.code == 1) {
                $("#logo").attr("src", data.msg);
            } else {
                showError(data.msg);
            }
            uploading = false;*/
        }
    });


}
