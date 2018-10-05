package org.fran.wiki.web.service;

import org.fran.wiki.web.config.ResourceConfiguration;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResourceService {
    @Resource
    ResourceConfiguration resourceConfiguration;

    static String unknownContentType = "application/octet-stream";
    static Map<String, String> contentType = new HashMap<>();
    static {
        contentType.put(".fax", "image/fax");
        contentType.put(".tif", "image/tiff");
        contentType.put(".tiff", "image/tiff");
        contentType.put(".gif", "image/gif");
        contentType.put(".ico", "image/x-icon");
        contentType.put(".jfif", "image/jpeg");
        contentType.put(".jpe", "image/jpeg");
        contentType.put(".jpeg", "image/jpeg");
        contentType.put(".jpg", "image/jpeg");
        contentType.put(".png", "image/png");
    }


    public String getContentType(String fileName){
        if(fileName.indexOf(".")!= -1) {
            String suffix = fileName.substring(fileName.lastIndexOf("."));
            if(contentType.containsKey(suffix))
                return contentType.get(suffix);
            else
                return unknownContentType;
        }else
            return unknownContentType;
    }

    public void writeToStream(String fileName, OutputStream os){
        File file = new File(resourceConfiguration.getResourcePath() + fileName.replace("/", File.separator));
        if(file.exists()){
            byte[] buffer = new byte[1024];
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            try {
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                int i = bis.read(buffer);
                while (i != -1) {
                    os.write(buffer, 0, i);
                    i = bis.read(buffer);
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }



    public void uploadToResource(String fileName, InputStream inputStream){
        FileOutputStream o = null;
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String curDate = format.format(new Date());

            File dateFolder = new File(resourceConfiguration.getResourcePath() + File.separator + curDate);
            if(!dateFolder.exists())
                dateFolder.mkdir();

            File f = new File(dateFolder.getPath() + File.separator + fileName);
            o = new FileOutputStream(f);
            byte[] b = new byte[1024];
            while(inputStream.read(b)!= -1){
                o.write(b);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(o!= null)
                    o.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if(inputStream!= null)
                    inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
