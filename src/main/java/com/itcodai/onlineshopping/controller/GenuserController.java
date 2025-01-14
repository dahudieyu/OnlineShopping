package com.itcodai.onlineshopping.controller;

import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.entity.User;
import com.itcodai.onlineshopping.service.GenuserService;
import com.itcodai.onlineshopping.util.JwtUtil;
import com.itcodai.onlineshopping.util.R;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class GenuserController {
    @Autowired
    private GenuserService genuserService;

    // 获取用户地址
    @GetMapping("/getAddress")
    public R getAddress(HttpServletRequest request) {
        // 从请求头获取 Authorization 字段（假设 token 存在于 Authorization 字段中）
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // 去除 "Bearer " 部分
        }

        // 获取当前用户名
        String currentUserName = JwtUtil.validateToken(token);  // 从 token 中解析出用户名

        if (currentUserName == null) {
            return R.error("无效的token或未授权");
        }

        // 根据用户名获取地址
        String address = genuserService.getAddressByUsername(currentUserName);

        if (address != null) {
            return R.ok(address);
        } else {
            return R.error("未找到地址");
        }
    }

    // 更新用户地址
    @PostMapping("/updateAddress")
    public R updateAddress(@RequestParam String address, HttpServletRequest request) {
        // 从请求头获取 Authorization 字段（假设 token 存在于 Authorization 字段中）
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // 去除 "Bearer " 部分
        }

        // 获取当前用户名
        String currentUserName = JwtUtil.validateToken(token);  // 从 token 中解析出用户名

        if (currentUserName == null) {
            return R.error("无效的token或未授权");
        }

        // 更新用户地址
        boolean updated = genuserService.updateAddress(currentUserName, address);
        if (updated) {
            return R.ok("地址更新成功");
        } else {
            return R.error("地址更新失败");
        }
    }


    // 获取用户的订单
    @GetMapping("/getOrders")
    public R getOrders(HttpServletRequest request) {
        // 从请求头获取 Authorization 字段（假设 token 存在于 Authorization 字段中）
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // 去除 "Bearer " 部分
        }

        // 获取当前用户名
        String currentUserName = JwtUtil.validateToken(token);  // 从 token 中解析出用户名

        if (currentUserName == null) {
            return R.error("无效的token或未授权");
        }

        // 获取用户订单
        List<OrderItem> orders = genuserService.getOrdersByUsername(currentUserName);

        if (orders != null && !orders.isEmpty()) {
            return R.ok(orders);  // 返回订单列表
        } else {
            return R.error("没有找到订单记录");
        }
    }
}

