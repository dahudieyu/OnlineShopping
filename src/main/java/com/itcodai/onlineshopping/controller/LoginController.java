package com.itcodai.onlineshopping.controller;

import com.itcodai.onlineshopping.entity.User;
import com.itcodai.onlineshopping.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.itcodai.onlineshopping.util.R;

import java.util.Map;
@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    private LoginService loginService;


    @PostMapping("/login")
    public R login(@RequestBody User user) {
        System.out.println(user.getUsername());
        String token = loginService.login(user.getUsername(), user.getPassword());
        System.out.println(token);
        if (token != null) {
           return R.ok(token);
        }
        System.out.println(R.unauthorized());
        return R.unauthorized();
    }


    @PostMapping("/register")
    public void register(@RequestBody User user) {
        if ("用户名已存在".equals(loginService.registerUser(user.getUsername(), user.getPassword()))) {
            throw new RuntimeException("用户已存在！");
        }
    }

}
