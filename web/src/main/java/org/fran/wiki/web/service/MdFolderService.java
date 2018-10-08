package org.fran.wiki.web.service;

import org.fran.wiki.web.config.ResourceConfiguration;
import org.fran.wiki.web.vo.Tree;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class MdFolderService {
    @Resource
    ResourceConfiguration resourceConfiguration;

    public String update(String path, String newPath){
        File f = new File(path);
        if(f.exists()){
            File nf = new File(newPath);
            if(nf.exists())
                return "target file exists, rename error";
            else {
                f.renameTo(nf);
                return "success";
            }
        }else
            return "original file not found";
    }

    public String create(String path, boolean folder){
        File f = new File(path + (folder? "" : ".md"));
        if(f.exists()){
            return "file exists, create error!";
        }else{
            try {
                if(folder)
                    f.mkdir();
                else
                    f.createNewFile();
                return "success";
            } catch (IOException e) {
                e.printStackTrace();
                return "sys error " + e.getMessage();
            }
        }
    }

    public Tree getTree(){
//        String path = "C:\\dev\\doc";
        String path = resourceConfiguration.getMarkdownPath();

        File f = new File(path);

        Tree root = new Tree();
        root.setKey(path);
        buildTree(f, root);
        return root.getChildren().get(0);
    }

    public void writeFile(String path, String body){
        File f = new File(path + ".md");
        if(f.exists() && !f.isDirectory()){
            try(FileOutputStream stream = new FileOutputStream(f)){
                stream.write(body.getBytes("UTF-8"));
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    public String readFile(String path){
        File f = new File(path + ".md");
        if(f.exists() && !f.isDirectory()){
            try(FileInputStream stream = new FileInputStream(f)) {
                byte[] b = new byte[Long.valueOf(f.length()).intValue()];
                stream.read(b);
                return new String(b, "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
                return "# file error!";
            }
        }else
            return "# file error!";
    }

    public void delete(String path, boolean isFolder){
        File f = new File(path + (isFolder ? "" : ".md") );

        if(!f.exists())
            return;
        else{
            String filePath = path.substring(path.lastIndexOf(File.separator));

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String date = format.format(new Date());

            File tempDate = new File(resourceConfiguration.getTempPath() + File.separator + date);
            if(!tempDate.exists())
                tempDate.mkdir();

            File temp = new File(resourceConfiguration.getTempPath() + File.separator + date + filePath + "--" +System.currentTimeMillis());
            f.renameTo(temp);
        }
    }

    private void buildTree(File file, Tree parent){
        if(file == null)
            return;
        else{
            Tree t = new Tree();

            if(file.isDirectory()){
                t.setFolder(true);
                if(file.listFiles()!= null && file.listFiles().length > 0)
                    for(File child : file.listFiles()) {
                        buildTree(child, t);
                    }
                t.setTitle(file.getName());
                t.setKey(file.getPath());
                parent.addChild(t);
            }else {
                t.setTitle(file.getName().substring(0, file.getName().length()-3));
                t.setKey(file.getPath().substring(0, file.getPath().length()-3));
                parent.addChild(t);
            }
        }

    }
}
