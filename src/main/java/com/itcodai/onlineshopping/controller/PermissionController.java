package com.itcodai.onlineshopping.controller;


import com.itcodai.onlineshopping.service.UserService;
import com.itcodai.onlineshopping.util.JwtUtil;
import com.itcodai.onlineshopping.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class PermissionController {

//    @Autowired
//    private UserService userService;



    @GetMapping("/api/getPermission")
    public R getPermission(@RequestHeader("Authorization") String token) {
        //String token = request.getHeader("Authorization"); // 获取请求头中的 token
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // 去除 "Bearer " 前缀
        }
        // 调用 JwtUtil 方法解析 token，获取权限
        String permission = JwtUtil.getPermissionFromToken(token);
        return R.ok(permission); // 返回权限信息
    }


}
