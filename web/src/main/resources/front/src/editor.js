
$(function() {

    document.onkeydown = hotKey;

});

//ctrl+s 保存编辑器内容，禁用chrome保存热键
function hotKey() {
    var a = window.event.keyCode;
    if( a == 83&& event.ctrlKey ) {
        saveMarkdown();
        event.returnValue = false;//禁用chrome保存热键
    }

    //tab 切换为两个" "，禁用原tab功能
    if( a == 9){

        var tc = document.getElementById("text-input");

        var tclen = tc.value.length;
        if(tc == document.activeElement){//判断一个文本框是否获得焦点
            var startPos = tc.selectionStart,
                endPos = tc.selectionEnd,
                cursorPos = startPos;
            tc.value = tc.value.substring(0, startPos) + "  " + tc.value.substring(endPos, tclen);
            cursorPos += 2;
            tc.selectionStart = tc.selectionEnd = cursorPos;
        }

        event.returnValue = false;//禁用chrome保存热键
    }
}

window.appendToEditorCursor = function(content) {
    var tc = document.getElementById("text-input");
    var tclen = tc.value.length;
    tc.focus();
    if(typeof document.selection != "undefined")
    {
        document.selection.createRange().text = content;
    }else{
        tc.value = tc.value.substr(0,tc.selectionStart) + content + tc.value.substring(tc.selectionStart,tclen);
    }
    $("#resAddToEditorModal").modal('hide');
}

