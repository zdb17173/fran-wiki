package org.fran.wiki.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Created by fran on 2018/1/29.
 */
@Configuration
@ConfigurationProperties(prefix = "auth")
public class SecurityRoleConfig {
    boolean enable;
    List<SecurityRoleConfigVo> accessConfig;
    List<UserVo> users;

    public List<UserVo> getUsers() {
        return users;
    }

    public void setUsers(List<UserVo> users) {
        this.users = users;
    }

    public List<SecurityRoleConfigVo> getAccessConfig() {
        return accessConfig;
    }

    public void setAccessConfig(List<SecurityRoleConfigVo> accessConfig) {
        this.accessConfig = accessConfig;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public static class UserVo{
        String name;
        String password;
        String[] roles;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String[] getRoles() {
            return roles;
        }

        public void setRoles(String[] roles) {
            this.roles = roles;
        }
    }

    public static class SecurityRoleConfigVo {
        String path;
        String[] roles;
        boolean permitAll = false;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String[] getRoles() {
            return roles;
        }

        public void setRoles(String[] roles) {
            this.roles = roles;
        }

        public boolean isPermitAll() {
            return permitAll;
        }

        public void setPermitAll(boolean permitAll) {
            this.permitAll = permitAll;
        }
    }
}
