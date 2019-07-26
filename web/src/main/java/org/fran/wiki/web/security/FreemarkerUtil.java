package org.fran.wiki.web.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Created by fran on 2018/2/1.
 */
public class FreemarkerUtil {

    protected static boolean needCheck = true;

    public AccessUserService.CustomUser getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getPrincipal() instanceof AccessUserService.CustomUser) {
            AccessUserService.CustomUser user = (AccessUserService.CustomUser) authentication.getPrincipal();
            return user;
        }else{
            return null;
        }
    }

    public boolean hasRole(String role){
        if(role == null || "".equals(role))
            return false;
        else{
            if(!needCheck){
                return true;
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication.getPrincipal() instanceof UserDetails){
                UserDetails user = (UserDetails)authentication.getPrincipal();
                Collection<? extends GrantedAuthority> roles = user.getAuthorities();
                if(roles == null || roles.size() == 0)
                    return false;
                else{
                    for(GrantedAuthority r : roles){
                        if(r.getAuthority().equals(role))
                            return true;
                    }
                }
                return false;
            }else{
                return false;
            }
        }
    }
}
