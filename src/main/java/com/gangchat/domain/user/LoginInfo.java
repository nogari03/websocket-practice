package com.gangchat.domain.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginInfo {
    private String name;
    private String token;

    @Builder
    public LoginInfo(String name,String token){
        this.name = name;
        this.token = token;
    }
}
