package org.fran.wiki.web.vo;

public class ResourceFile {
    long lastModify;
    String fileName;
    String path;

    public ResourceFile(){}

    public ResourceFile(long lastModify, String fileName, String path) {
        this.lastModify = lastModify;
        this.fileName = fileName;
        this.path = path;
    }

    public long getLastModify() {
        return lastModify;
    }

    public void setLastModify(long lastModify) {
        this.lastModify = lastModify;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
