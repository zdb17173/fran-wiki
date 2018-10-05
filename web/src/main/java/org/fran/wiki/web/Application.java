package org.fran.wiki.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;

/**
 * Created by fran on 2018/1/17.
 */
@EnableAutoConfiguration
@SpringBootApplication(scanBasePackageClasses = {
        Application.class
})
public class Application extends SpringBootServletInitializer
{

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    private static ApplicationContext applicationContext = null;
    public static ApplicationContext getApplicationContext(){
        return applicationContext;
    }

    public static void main(String... args) {
        applicationContext = SpringApplication.run(Application.class, args);
    }
}
