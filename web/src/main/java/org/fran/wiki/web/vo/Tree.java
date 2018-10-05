package org.fran.wiki.web.vo;

import java.util.ArrayList;
import java.util.List;

public class Tree{
        String key;
        String title;
        boolean expanded;
        boolean folder;
        List<Tree> children;

        public void addChild(Tree t){
            if(children == null){
                children = new ArrayList<>();
            }
            children.add(t);
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public boolean isExpanded() {
            return expanded;
        }

        public void setExpanded(boolean expanded) {
            this.expanded = expanded;
        }

        public boolean isFolder() {
            return folder;
        }

        public void setFolder(boolean folder) {
            this.folder = folder;
        }

        public List<Tree> getChildren() {
            return children;
        }

        public void setChildren(List<Tree> children) {
            this.children = children;
        }
    }