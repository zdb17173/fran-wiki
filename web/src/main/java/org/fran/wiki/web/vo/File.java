package org.fran.wiki.web.vo;

public class File {
    String name;
    String path;
    String newName;
    boolean folder;
    boolean create;
    boolean delete;

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }

    public boolean isCreate() {
        return create;
    }

    public void setCreate(boolean create) {
        this.create = create;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public boolean isFolder() {
        return folder;
    }

    public void setFolder(boolean folder) {
        this.folder = folder;
    }

    public boolean isDelete() {
        return delete;
    }

    public void setDelete(boolean delete) {
        this.delete = delete;
    }

    @Override
    public String toString() {
        return "File{" +
                "name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", newName='" + newName + '\'' +
                ", folder=" + folder +
                ", create=" + create +
                ", delete=" + delete +
                '}';
    }
}
