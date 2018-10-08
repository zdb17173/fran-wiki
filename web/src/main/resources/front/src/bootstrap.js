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
        trigger: "hover"
    });

    /*$('#nav-fileupload').popover({
        content: "上传图片，用于后续添加在markdown编辑器中",
        trigger: "hover",
        placement: "bottom"
    });

    $('#nav-addToForm').popover({
        content: "在编辑器光标处添加上传的图片",
        trigger: "hover",
        placement: "bottom"
    });*/
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


window.upload = function(appendToEditor) {
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
                $('#fileUploadModal').modal('hide');
            }

            if(appendToEditor){
                var path = data.data;
                addSelectedToEditor(path);
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

window.getResources = function(date, callback) {
    $.ajax({
        url: "/res/getResources?date=" + (date ? date : ""),
        type: 'GET',
        dataType:"json",
        success : function(data) {

            var table = "<table class=\"table\">\n" +
                "<thead class=\"thead-dark\">\n" +
                "<tr>\n" +
                "  <th scope=\"col\">#</th>\n" +
                "  <th scope=\"col\">path</th>\n" +
                "  <th scope=\"col\">name</th>\n" +
                "  <th scope=\"col\">lastModify</th>\n" +
                "  <th scope=\"col\">handle</th>\n" +
                "</tr>\n" +
                "</thead>\n" +
                "<tbody>";
            $.each(data.data, function (i, item) {
                table += "<tr>\n" +
                    "<th scope=\"row\">"+ (i+1) +"</th>\n" +
                    "<td><img src=\""+ item.path +"\" style='width: 192px; height: 108px'/></td>\n" +
                    "<td>"+ item.fileName +"</td>\n" +
                    "<td>"+ dateFormat(item.lastModify) +"</td>\n" +
                    "<td><button class='button' onclick='javascript:addSelectedToEditor(\""+ item.path +"\")'>add</button></td>\n" +
                    "</tr>"
            });

            table += "</tbody>\n" +
                "</table>";

            $("#resToEditBody").html(table);

            if(callback){
                callback();
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

//将所选资源添加到编辑器光标位置
window.addSelectedToEditor = function(path) {
    // alert(path);
    var img = "![pic]("+ path +")"
    var tc = document.getElementById("text-input");
    var tclen = tc.value.length;
    tc.focus();
    if(typeof document.selection != "undefined")
    {
        document.selection.createRange().text = img;
    }else{
        tc.value = tc.value.substr(0,tc.selectionStart) + img + tc.value.substring(tc.selectionStart,tclen);
    }
    $("#resAddToEditorModal").modal('hide');
}

//timestamp日期格式化
function dateFormat(sj)
{
    var now = new Date(sj);
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=now.getHours();
    var   minute=now.getMinutes();
    var   second=now.getSeconds();
    return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
}

window.latest30Folder = function(callback) {
    $.ajax({
        url: "/res/latest30Folder",
        type: 'GET',
        dataType:"json",
        contentType: "application/json; charset=utf-8",
        success : function(data) {



            /*if (data.code == 1) {
                $("#logo").attr("src", data.msg);
            } else {
                showError(data.msg);
            }
            uploading = false;*/
        }
    });
}

//显示资源添加到编辑器modal，并加载显示当天资源文件夹
window.resAddToEditor = function() {

    getResources(null, function () {
        $("#resAddToEditorModal").modal('show');
    });
}
