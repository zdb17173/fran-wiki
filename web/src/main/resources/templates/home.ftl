<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>markdown Template</title>

    <script src="/commons.bundle.js"></script>
    <script src="/bootstrap.bundle.js"></script>
    <script src="/tree.bundle.js"></script>
    <script src="/editor.bundle.js"></script>

    <style type="text/css">
        html,body{
            height: 100%;
        }

        #tree ul{
            height: 100%;
        }

        div#tree {
            /*height: 100%;*/
            /*width: 20%;*/
            padding: 5px;
            margin-right: 16px;
        }

        div#treeContent {
            float: left;
            /*width: 500px;*/
            overflow-x:auto;
            margin: 0 auto;
            height: 95%;
        }

        .fran-wd100 {
            max-width: 100%;
        }

        .editor {
            height: 100%;
            float: left;
            width: 700px;
            padding: 5px;
        }
        .editor-hidden {
            display: none;
            width: 0px;
        }

        .viewer {
            margin-left: 700px;
            height: 95%;
            padding: 5px;
        }
        .viewer-fullscreen {
            height: 95%;
            padding: 5px;
        }

    </style>
</head>

<script>
    var edit = false;
    function editViewSwitch(){
        if(edit){
            viewModel();
            edit = false;
            document.getElementById("editViewSwitch").innerHTML = "edit";
        }else{
            editModel();
            edit = true;
            document.getElementById("editViewSwitch").innerHTML = "view";
        }
    }
</script>

<body>

<input type="hidden" id="activeKeyTemplate" value="${activeKey!}"/>

<header>
    <div class="navbar navbar-dark bg-dark box-shadow">
        <ul class="nav">
            <li class="nav-item">
                <a id="nav-fileupload" class="nav-link" href="#" data-toggle="modal" data-target="#fileUploadModal">upload</a>
            </li>
            <li class="nav-item">
                <a id="nav-addToForm" class="nav-link" href="#" data-toggle="modal" onclick="javascript:resAddToEditor()">add</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="javascript:collapseAll()">collapseAll</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="javascript:expandAll()">expandAll</a>
            </li>
            <li class="nav-item">
                <a id="editViewSwitch" class="nav-link" href="#" onclick="javascript:editViewSwitch()">edit</a>
            </li>
            <li class="nav-item">
                <a id="share" class="nav-link" href="#" onclick="javascript:share()">share</a>
            </li>
        </ul>
    </div>
</header>

<div style="height: 95%;">
    <div id="treeContent">
        <div id="tree"></div>
    </div>
    <div class="editor-hidden" id="editorContent">
        <textarea id="text-input" style="height: 95%;float: left;width: 670px;overflow:auto;"></textarea>
        <button onclick="javascript:saveMarkdown()">save</button>
    </div>

    <div class="viewer-fullscreen" id="viewerContent">
        <div id="content" style="height: 100%;border: 1px solid darkgray;overflow:auto;">
        </div>
    </div>
    <span id="echoActive1" style="display: none"/>
</div>

<!-- file upload modal -->
<div class="modal fade" id="fileUploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">upload</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img id="previewImgUpload" class="card-img-top" alt="Card image cap" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166517e10a1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166517e10a1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.125%22%20y%3D%2296.3%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E">
                    <input type="text" id="fileName" class="form-control" placeholder="file name">
                </div>
            </div>
            <form id="infoLogoForm" enctype='multipart/form-data'>
                <div class="modal-footer">
                    <input type="file" class="btn btn-primary" id="uploadFile" accept="image/*"></input>
                    <button type="button" class="btn btn-primary" onclick="upload()">upload</button>
                    <button type="button" class="btn btn-primary" onclick="upload(true)">upload & add</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>


<!-- alert modal -->
<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="alertModalTitle">select resource</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="alertModalBody" class="modal-body" style="word-break: break-all;width: 100%;">
                <div class="alert alert-success" role="alert" >

                </div>
            </div>
        </div>
    </div>
</div>


<!-- add resource modal -->
<div class="modal fade" id="resAddToEditorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">select resource</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="resToEditBody" class="modal-body">

                <#--<table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>-->
            </div>
        </div>
    </div>
</div>


</body>

</html>