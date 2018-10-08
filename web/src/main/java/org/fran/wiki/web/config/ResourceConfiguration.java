package org.fran.wiki.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
@ConfigurationProperties(prefix = "res")
public class ResourceConfiguration {
    String markdownPath;
    String resourcePath;
    String tempPath;

    public String getMarkdownPath() {
        return markdownPath;
    }

    public void setMarkdownPath(String markdownPath) {
        this.markdownPath = markdownPath.endsWith(File.separator) ? markdownPath.substring(0, markdownPath.lastIndexOf(File.separator)) : markdownPath;
    }

    public String getResourcePath() {
        return resourcePath;
    }

    public void setResourcePath(String resourcePath) {
        this.resourcePath = resourcePath.endsWith(File.separator) ? resourcePath.substring(0, resourcePath.lastIndexOf(File.separator)) : resourcePath;
    }

    public String getTempPath() {
        return tempPath;
    }

    public void setTempPath(String tempPath) {
        this.tempPath = tempPath.endsWith(File.separator) ? tempPath.substring(0, tempPath.lastIndexOf(File.separator)) : tempPath;

    }
}
