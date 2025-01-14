package com.itcodai.onlineshopping.service;

import com.itcodai.onlineshopping.entity.User;
import com.itcodai.onlineshopping.mapper.UserMapper;
import com.itcodai.onlineshopping.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserMapper userMapper; // 通过 MyBatis 映射操作数据库

    public String login(String username, String password) {
        User user = userMapper.findByUsername(username);

        System.out.println(user);
        if (user != null && user.getPassword().equals(password)) {
            String permission = userMapper.findPermissionByUsername(username); // 获取单个权限
            return JwtUtil.generateToken(username, permission); // 使用单个权限生成 Token
        }
        return null;
    }


    public String registerUser(String username, String password) {
        // 检查用户名是否已存在
        if (userMapper.findByUsername(username) != null) {
            return "用户名已存在";
        }

        // 创建用户，设置默认权限
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // 注意需要加密存储
        user.setPermission("user"); // 默认权限为 "user"

        // 保存用户到数据库
        userMapper.insertUser(user);

        return "注册成功";
    }


}
