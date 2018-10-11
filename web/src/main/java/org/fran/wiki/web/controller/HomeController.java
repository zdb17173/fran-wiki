package org.fran.wiki.web.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/p/")
public class HomeController {

    @RequestMapping("{template}")
    public ModelAndView selectTest(
            HttpServletRequest request,
            HttpServletResponse response,
            @PathVariable(name = "template") String template,
            @RequestParam(required = false) String key){

        Map<String, Object> map = new HashMap<>();

        if(key!= null && !"".equals(key)){
            String activeKey = new String(Base64.getUrlDecoder().decode(key.getBytes()));
            map.put("activeKey", activeKey);
        }

        return new ModelAndView("/" + template, map);
    }



}
