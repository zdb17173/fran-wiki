package org.fran.wiki.web.vo;

public class Markdown {
    String content;
    String path;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Markdown{" +
                "content='" + content + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
