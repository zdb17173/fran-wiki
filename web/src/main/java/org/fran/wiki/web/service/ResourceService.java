package org.fran.wiki.web.service;

import org.fran.wiki.web.config.ResourceConfiguration;
import org.fran.wiki.web.vo.ResourceFile;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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


    private String getSuffix(String fileName){
        if(fileName.indexOf(".")!= -1) {
            String suffix = fileName.substring(fileName.lastIndexOf("."));
            return suffix;
        }else
            return "";
    }

    //取最近的30天资源文件夹
    public List<String> latest30Folder(){
        File f = new File(resourceConfiguration.getResourcePath());
        List<String> l = new ArrayList<>();
        if(f.exists() && f.isDirectory()){
            for(File dateFolder : f.listFiles()){
                if(dateFolder.isDirectory()){
                    l.add(dateFolder.getName());
                }
            }

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Collections.sort(l, (str1, str2) -> {
                try {
                    Date d1 = format.parse(str1);
                    Date d2 = format.parse(str2);
                    return d1.compareTo(d2) * -1;
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return -1;
            });
            if(l.size()>30)
                return l.subList(0,30);
            else
                return l;
        }else
            return l;


    }

    //获取资源列表
    public List<ResourceFile> getResourcesList(String date){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if(date == null || "".equals(date))
            date = format.format(new Date());

        File f = new File(resourceConfiguration.getResourcePath() + File.separator + date);
        List<ResourceFile> l = new ArrayList<>();
        if(date == null || "".equals(date))
            return l;

        if(f.exists() && f.isDirectory()){
            List<File> files = new ArrayList<>();

            for(File resource : f.listFiles()){
                if(!resource.isDirectory()){
//                    System.out.println(resource.getName() + new Date(resource.lastModified()));
                    files.add(resource);

                    l.add(new ResourceFile(resource.lastModified(), resource.getName(), requestPath(date ,resource.getName())  ));
                }
            }

            Collections.sort(l, (f1, f2) ->{
                long diff = f1.getLastModify() - f2.getLastModify();
                return diff == 0
                        ? 0 : diff > 0 ? -1 : 1;
                });

            return l;
        }else
            return l;
    }

    //根据文件类型获取contentType
    public String getContentType(String fileName){
        String suffix = getSuffix(fileName);
        if(contentType.containsKey(suffix))
            return contentType.get(suffix);
        else
            return unknownContentType;
    }

    //写入到输出流中（图片下载）
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

    private String requestPath(String date, String fileName){
        return "/res/r/" + date + "/" + fileName;
    }

    //写入到本地文件（资源上传）
    public String uploadToResource(String newFileName, String originalFilename, InputStream inputStream){
        FileOutputStream o = null;
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String curDate = format.format(new Date());

            File dateFolder = new File(resourceConfiguration.getResourcePath() + File.separator + curDate);
            if(!dateFolder.exists())
                dateFolder.mkdir();

            String fileName = newFileName == null? originalFilename : (newFileName + getSuffix(originalFilename));

            String requestPath = requestPath(curDate, fileName);

            File f = new File(dateFolder.getPath() + File.separator + fileName);
            if(f.exists())
                throw new IOException("file exists, rename");

            o = new FileOutputStream(f);
            byte[] b = new byte[1024];
            while(inputStream.read(b)!= -1){
                o.write(b);
            }

            return requestPath;
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

        return null;
    }
}
