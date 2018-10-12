
//使用win8主题
// import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less';  // CSS or LESS
import 'jquery.fancytree/dist/skin-win8-n/ui.fancytree.css'
//引用fancytree
import {createTree} from 'jquery.fancytree';

//extensions 引用edit扩展，修改node title
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
//引用jquery-ui menu包（右键菜单功能）及css
import 'ui-contextmenu'
import 'jquery-ui/themes/base/all.css';


//markdown
import 'highlight.js/styles/atom-one-light.css'

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/htmlbars';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);

var fileSeparator = null;
var rootPath = '';
$(function(){

    $.ajax({
        type: "GET",
        url: "/api/getAll",
        dataType: "json",
        success: function(data){
            var treeData = data.data.children;

            fileSeparator = data.data.key.substring(0,1) == "/"? "/" : "\\";

            rootPath = data.data.key;
            $("#tree").fancytree({
                extensions: ["edit"],
//         checkbox: true,//开启复选功能
                edit: {
                    triggerStart: ["clickActive", "dblclick", "f2", "mac+enter", "shift+click"],
                    beforeEdit: function(event, data){
                        // Return false to prevent edit mode
                    },
                    edit: function(event, data){
                        // Editor was opened (available as data.input)
                    },
                    beforeClose: function(event, data){
                        // Return false to prevent cancel/save (data.input is available)
                        console.log(event.type, event, data);
                        if( data.originalEvent.type === "mousedown" ) {
                            // We could prevent the mouse click from generating a blur event
                            // (which would then again close the editor) and return `false` to keep
                            // the editor open:
//                  data.originalEvent.preventDefault();
//                  return false;
                            // Or go on with closing the editor, but discard any changes:
//                  data.save = false;
                        }
                    },
                    save: function(event, data){
                        // Save data.input.val() or return false to keep editor open
                        console.log("save...", this, data);

                        var nval = data.input.val();
                        var orgTitle = data.orgTitle;
                        var key = data.node.key;

                        fileOperate(false, data.node.folder, orgTitle, key, nval);

                        data.node.key = key.replace(fileSeparator+ orgTitle , fileSeparator + nval);
                        data.node.setTitle(nval);

                        if(data.node.folder)
                            updateKey(data.node, key, data.node.key);

                        // Simulate to start a slow ajax request...
                        /*setTimeout(function(){
                            // $(data.node.span).removeClass("pending");
                            // Let's pretend the server returned a slightly modified
                            // title:
                            data.node.setTitle(data.node.title + "!");
                        }, 2000);*/
                        // We return true, so ext-edit will set the current user input
                        // as title
                        return true;
                    },
                    close: function(event, data){
                        // Editor was removed
                        if( data.save ) {
                            // Since we started an async request, mark the node as preliminary
                            // $(data.node.span).addClass("pending");
                        }
                    }
                },
                selectMode: 1,// 1:single, 2:multi, 3:multi-hier
                source: treeData,
                activate: function(event, data) {
                    $("#echoActive1").text("title:[" + data.node.title + "]  key[" + data.node.key + "]");

                    showMarkdown();
                },
                select: function(event, data) {
                    // Display list of selected nodes
                    var s = data.tree.getSelectedNodes().join(", ");
                    $("#echoSelection1").text(s);
                },
                dblclick: function(event, data) {
                    data.node.toggleSelected();
                },
                tooltip: function(event, data) {
                    // Create dynamic tooltips
                    return data.node.title + " (" + data.node.key + ")";
                },
                keydown: function(event, data) {
                    if( event.which === 32 ) {
                        data.node.toggleSelected();
                        return false;
                    }
                }
            });


            var activeKeyTemplate = $("#activeKeyTemplate").val();
            activeKey(activeKeyTemplate);
        }
    });

    $("#tree").contextmenu({
        delegate: "span.fancytree-node",
        menu: [
            {title: "delete", cmd: "delete", uiIcon: "ui-icon-trash" },
            {title: "----"},
            {title: "new folder", cmd: "addFolder", uiIcon: "ui-icon-arrowreturn-1-e" },
            {title: "new markdown", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e" },
            {title: "new folder(root)", cmd: "addRootNode", uiIcon: "ui-icon-arrowreturn-1-e" }
        ],
        beforeOpen: function(event, ui) {
            var node = $.ui.fancytree.getNode(ui.target);
            $("#tree").contextmenu("enableEntry", "paste");
            node.setActive();
        },
        select: function(event, ui) {

            if (!ui.cmd){
                return;
            }else if(ui.cmd == "addChild"){
                addChild(false);
            }else if(ui.cmd == "delete"){
                deleteNode();
            }else if(ui.cmd == "addRootNode"){
                addRootNode();
            }else if(ui.cmd == "addFolder"){
                addChild(true);
            }
        }
    });
});

//删除节点
function deleteNode(){
    var node = $("#tree").fancytree("getActiveNode");
    if( !node ) {
        alert("Please activate a parent node.");
        return;
    }
    var key = node.key;
    fileDelete(key, node);
}

//当前激活节点下添加child
function addChild(folder){

    var node = $("#tree").fancytree("getActiveNode");

    if( !node ) {
        alert("Please activate a parent node.");
        return;
    }
    if( !node.folder){
        return;
    }else{
        if(folder){

            var name = fileNameRepetition(node, "newfolder", 0);

            node.addChildren({
                key: node.key + fileSeparator + name,
                title: name,
                folder: true
            });
            fileOperate(true, true, name, node.key + fileSeparator + name, null);
        }else{
            var name = fileNameRepetition(node, "newfile", 0);

            node.addChildren({
                key: node.key + fileSeparator + name,
                title: name,
                folder: false
            });
            fileOperate(true, false, name, node.key + fileSeparator + name, null);
        }
    }
}

//文件名去重，自动增加filename(1)
function fileNameRepetition(node, name, index) {
    if(node.children){
        var repetition = false
        $.each(node.children, function (i, item) {
            if(item.title == name + (index == 0 ? "": "(" + index + ")") ){
                repetition = true;
            }
        });

        if(repetition)
            return fileNameRepetition(node, name, index + 1);
        else
            return name + (index == 0 ? "": "(" + index + ")");
    }else
        return name;
}

//修改文件夹名称，递归修改所有child
function updateKey(node, key, newKey){
    if(node.children){
        $.each(node.children, function (i, item) {

            if(item.children)
                updateKey(item, item.key, item.key.replace(key,  newKey));

            item.key = item.key.replace(key,  newKey);
        });
    }
}

//root下添加文件夹（默认名newfile）
function addRootNode(){
    var rootNode = $("#tree").fancytree("getRootNode");
    var childNode = rootNode.addChildren({
        key: rootPath + fileSeparator + "newfolder",
        title: "newfolder",
        folder: true
    });

    fileOperate(true, true, "newfolder", rootPath + fileSeparator + "newfolder", null);
}

//加载markdown
function showMarkdown(){
    var node = $("#tree").fancytree("getActiveNode");
    if(node.folder)
        return;
    else{
        $.ajax({
            type: "GET",
            url: "/api/getFile?path=" + encodeURI(node.key),
            dataType: "json",
            success: function (data) {
                if(data.status == 200){
                    var marked = data.data;
                    updateMDView(marked);
                }else{
                    alertModal("load markdown fail",  data.description, 10000);
                }
            }
        });
    }
}

//文件删除
function fileDelete(key, node){
    var file = {};
    file.delete = true;
    file.path = key;
    file.folder = node.folder;

    $.ajax({
        type: "POST",
        url: "/api/file",
        data: JSON.stringify(file),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status == 200){
                node.remove();
            }else
                alertModal("删除失败",  data.description, 10000);
        }
    });
}

//文件增改
function fileOperate(create, folder, name, path, newName){
    var file = {};

    file.create = create ? true : false;
    file.folder = folder ? true : false;
    file.delete = false;
    file.name = name;
    file.newName = newName;
    file.path = path;

    $.ajax({
        type: "POST",
        url: "/api/file",
        data: JSON.stringify(file),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        }
    });
}

//更新markdown视图内容（save & tree select）
function updateMDView(marked){
    hljs.initHighlightingOnLoad();
    var myMarked = require('marked');
    myMarked.setOptions({
        renderer: new myMarked.Renderer(),
        highlight: function(code) {
            var s =  hljs.highlightAuto(code).value;
            return s;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    document.getElementById('content').innerHTML = myMarked(marked);
    $("pre code").addClass("hljs");
    $("#text-input").val(marked);
    $("img").addClass("fran-wd100");
}

//保存markdown编辑器内容
window.saveMarkdown = function saveMarkdown(){
    var node = $("#tree").fancytree("getActiveNode");
    if(!node){
        return;
    }

    var md = $("#text-input").val();

    var d = {};
    d.path = node.key;
    d.content = md;

    $.ajax({
        type: "POST",
        url: "/api/save",
        data: JSON.stringify(d),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            updateMDView(md);
        }
    });
}



//webpack 在js文件要引用的函数中将其作用域提升，在函数前添加window.,否则前端html中无法找到该函数
//展开所有树节点
window.expandAll = function expandAll() {
    $('#tree').fancytree('getTree').expandAll();
}

window.collapseAll = function collapseAll(){
    $("#tree").fancytree("getTree").expandAll(false);
}

window.activeKey = function activeKey(id){
    if(!id || id == "")
        return;
    else
        $("#tree").fancytree("getTree").activateKey(id);
}

//获取base64编码过的key，用于分享后的激活
window.share = function(){
    var node = $("#tree").fancytree("getActiveNode");
    if(node){
        var k = node.key;
        $.ajax({
            type: "GET",
            url: "/api/share?key=" + encodeURI(k),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                // alert(data.data);
                var url = window.location.href.substring(0,window.location.href.indexOf("/p/home") + 7);
                alertModal("粘贴以下链接",  url + "?key=" + data.data, 10000);
            }
        });
    }
}


