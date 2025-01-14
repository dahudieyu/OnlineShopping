package com.itcodai.onlineshopping.service;


import com.itcodai.onlineshopping.util.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String getPermissionFromToken(String token) {
        return JwtUtil.getPermissionFromToken(token); // 调用 JwtUtil 获取权限
    }
}
