package org.fran.wiki.web.controller;

import org.fran.wiki.web.service.MdFolderService;
import org.fran.wiki.web.vo.File;
import org.fran.wiki.web.vo.JsonResult;
import org.fran.wiki.web.vo.Markdown;
import org.fran.wiki.web.vo.Tree;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Resource
    MdFolderService mdFolderService;

    @GetMapping(value = "/checkLogin", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
    public JsonResult<String> checkLogin(){

        JsonResult<String> res = new JsonResult<>();
        res.setDescription("sahdjhsajdhjsahdjsajdjh");
        res.setStatus(200);
        return res;
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
    public JsonResult<Tree> getAll(){
        JsonResult<Tree> res = new JsonResult<>();
        res.setData(mdFolderService.getTree());
        res.setStatus(200);
        return res;
    }

    @GetMapping(value = "/getFile", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.ALL_VALUE)
    public JsonResult<String> getFile(@RequestParam String path){

        JsonResult<String> res = new JsonResult<>();
        res.setData(mdFolderService.readFile(path));
        res.setStatus(200);
        return res;
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResult<String> save(@RequestBody Markdown markdown){
        JsonResult<String> res = new JsonResult<>();
//        System.out.println(markdown);
        mdFolderService.writeFile(markdown.getPath(), markdown.getContent());
        res.setStatus(200);
        return res;
    }


    @PostMapping(value = "/file", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResult<String> file(@RequestBody File file){
        JsonResult<String> res = new JsonResult<>();
//        System.out.println(file);

        if(file.isCreate()){
            //create
            res.setData(mdFolderService.create(file.getPath(), file.isFolder()));
        }else if(file.isDelete()){
            mdFolderService.delete(file.getPath(), file.isFolder());
        }else{
            //update
            String newPath = file.getPath()
                    .substring(0, file.getPath().lastIndexOf(java.io.File.separator))
                    + java.io.File.separator + file.getNewName()
                    + (file.isFolder()? "" : ".md");

            res.setData(mdFolderService.update(file.getPath() + (file.isFolder()? "" : ".md"), newPath));
        }

        res.setStatus(200);
        return res;
    }

}
