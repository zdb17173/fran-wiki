import 'bootstrap';

window.login = function() {
    $("#loginModal").modal('show');
    // $("#resAddToEditorModal").modal('hide');
}

window.logout = function(){
    $.ajax({
        type: "GET",
        url: "/logout",
        success: function (result) {
            location.reload();
        },
        error: function () {
            location.reload();
        }
    });
}

window.loginApi = function () {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/login" ,//url
        data: $('#loginForm').serialize(),
        success: function (result) {
            // console.log(result);//打印服务端返回的数据(调试用)
            // if (result.resultCode == 200) {
                alert("SUCCESS");
                $("#loginModal").modal('hide');
            // }
            // ;
        },
        error : function() {
            location.reload();
        }
    });
}