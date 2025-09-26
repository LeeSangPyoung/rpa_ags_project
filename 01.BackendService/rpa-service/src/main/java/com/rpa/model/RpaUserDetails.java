package com.rpa.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class RpaUserDetails extends User {
    private final int lockCount;
    private final int mustChangePw;

    public RpaUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, int lockCount, int mustChangePw) {
        super(username, password, authorities);
        this.lockCount = lockCount;
        this.mustChangePw = mustChangePw;
    }

    public int getLockCount() {
        return this.lockCount;
    }

    public int getMustChangePw(){return  this.mustChangePw;}

    public static Collection<? extends GrantedAuthority> authorities(String... roles) {
        List<GrantedAuthority> authorities = new ArrayList(roles.length);
        String[] var3 = roles;
        int var4 = roles.length;

        for(int var5 = 0; var5 < var4; ++var5) {
            String role = var3[var5];
            if(!role.startsWith("ROLE_")) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
            } else {
                authorities.add(new SimpleGrantedAuthority(role));
            }
        }
        return authorities;
    }
}
