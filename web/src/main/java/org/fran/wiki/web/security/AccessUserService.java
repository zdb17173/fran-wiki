package org.fran.wiki.web.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fran.wiki.web.config.SecurityRoleConfig;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by fran on 2018/1/25.
 */
@Service
public class AccessUserService implements UserDetailsService {

    @Resource
    SecurityRoleConfig securityRoleConfig;

    static ObjectMapper mapper = new ObjectMapper();

    static {
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static void main(String[] args) {
        System.out.println(MD5Util.encode("1"));
    }

    @Override
    public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {


        List<SecurityRoleConfig.UserVo> users = securityRoleConfig.getUsers();

        SecurityRoleConfig.UserVo user = null;
        if(users!= null){
            for(SecurityRoleConfig.UserVo u : users)
                if(u.getName().equals(account))
                    user = u;
        }
        if (user != null) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            if (user.getRoles() != null && user.getRoles().length > 0) {
                for (String perm : user.getRoles()) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + perm));
                }
                authorities.add(new SimpleGrantedAuthority("ROLE_common"));
            }

            CustomUser ed = new CustomUser(
                    user.getName().toString(),
                    user.getName(),//user account
                    user.getName(),//user name
                    MD5Util.encode(user.getPassword()),
                    authorities);
            return ed;
        } else {
            throw new UsernameNotFoundException(account);
        }
    }

    public static class CustomUser implements UserDetails {
        String uid;
        String userName;
        String userNameEn;
        String passWord;
        List<GrantedAuthority> grantedAuthority;

        public CustomUser(
                String uid,
                String userName,
                String userNameEn,
                String passWord,
                List<GrantedAuthority> grantedAuthority
        ) {
            this.uid = uid;
            this.userName = userName;
            this.userNameEn = userNameEn;
            this.passWord = passWord;
            this.grantedAuthority = grantedAuthority;
        }

        @Override
        public String toString() {
            try {
                return mapper.writeValueAsString(this);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "";
            }
        }

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return grantedAuthority;
        }

        @Override
        public String getPassword() {
            return passWord;
        }

        @Override
        public String getUsername() {
            return userName;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        public String getUserNameEn() {
            return userNameEn;
        }

        public void setUserNameEn(String userNameEn) {
            this.userNameEn = userNameEn;
        }
    }
}
