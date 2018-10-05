package org.fran.wiki.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "res")
public class ResourceConfiguration {
    String markdownPath;
    String resourcePath;

    public String getMarkdownPath() {
        return markdownPath;
    }

    public void setMarkdownPath(String markdownPath) {
        this.markdownPath = markdownPath;
    }

    public String getResourcePath() {
        return resourcePath;
    }

    public void setResourcePath(String resourcePath) {
        this.resourcePath = resourcePath;
    }
}
