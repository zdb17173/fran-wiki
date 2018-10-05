package org.fran.wiki.web.controller;

import org.fran.wiki.web.service.ResourceService;
import org.fran.wiki.web.vo.JsonResult;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Controller
@RequestMapping("/res")
public class ResourceController {

    @Resource
    ResourceService resourceService;

    @ResponseBody
    @PostMapping(value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonResult upload(
            @RequestPart("uploadFile")MultipartFile uploadFile,
            @RequestPart(value = "description", required = false)String description,
            @RequestPart(value = "name", required = false)String name){
        JsonResult res = new JsonResult();

        try {
            resourceService.uploadToResource(name == null? uploadFile.getOriginalFilename() : name, uploadFile.getInputStream());
            res.setData("success");
            res.setDescription("success");
            res.setStatus(200);
        } catch (IOException e) {
            res.setDescription(e.getMessage());
            res.setStatus(500);
        }

        return res;
    }

    @RequestMapping(value = "/r/{date}/{file:.+}",method = RequestMethod.GET)
    public String downloadImage(
            @PathVariable(name = "date") String date,
            @PathVariable(name = "file") String file,
//            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            String fileName = File.separator + date + File.separator + file;
            OutputStream os = response.getOutputStream();
            response.setContentType(resourceService.getContentType(fileName));
            resourceService.writeToStream(fileName, os);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }


}
