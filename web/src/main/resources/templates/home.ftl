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

    </style>
</head>

<body>

<header>
    <div class="navbar navbar-dark bg-dark box-shadow" style="height: 30px">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#fileUploadModal">upload</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" onclick="javascript:resAddToEditor()">add</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="javascript:collapseAll()">collapseAll</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="javascript:expandAll()">expandAll</a>
            </li>
        </ul>
    </div>
</header>

<div style="height: 95%;">
    <div id="treeContent">
        <div id="tree"></div>
    </div>
    <div style="height: 100%;float: left;width: 700px;padding: 5px;">
        <textarea id="text-input" style="height: 95%;float: left;width: 670px;overflow:auto;"></textarea>
        <button onclick="javascript:saveMarkdown()">save</button>
    </div>

    <div style="margin-left: 700px;height: 95%;padding: 5px;">
        <div id="content" style="height: 100%;border: 1px solid darkgray;overflow:auto;">
        </div>
    </div>
    <span id="echoActive1" />
</div>

<!-- file upload modal -->
<div class="modal fade" id="fileUploadModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">upload</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img id="previewImgUpload" class="card-img-top" alt="Card image cap">
                    <input type="text" id="fileName" class="form-control" placeholder="file name">
                </div>
            </div>
            <form id="infoLogoForm" enctype='multipart/form-data'>
                <div class="modal-footer">
                    <input type="file" class="btn btn-primary" id="uploadFile" accept="image/*"></input>
                    <button type="button" class="btn btn-primary" onclick="upload()">upload</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </form>
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

                <table class="table">
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
                </table>
            </div>
            <#--<form id="infoLogoForm" enctype='multipart/form-data'>
                <div class="modal-footer">
                    <input type="file" class="btn btn-primary" id="uploadFile" accept="image/*"></input>
                    <button type="button" class="btn btn-primary" onclick="upload()">upload</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </form>-->
        </div>
    </div>
</div>


</body>

</html>