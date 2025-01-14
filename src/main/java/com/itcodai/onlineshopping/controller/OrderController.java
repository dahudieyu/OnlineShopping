package com.itcodai.onlineshopping.controller;


import com.itcodai.onlineshopping.config.RequireAuth;
import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.service.OrderService;
import com.itcodai.onlineshopping.util.JwtUtil;
import com.itcodai.onlineshopping.util.R;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

@RequestMapping("/cart")
public class OrderController {
//    @Autowired
//    private OrderService orderService;
//
//    // 修改此方法，接收整个购物车的 OrderItem 列表
//
//    @PostMapping("/add")
//    public R insertOrderItems(@RequestBody List<OrderItem> orderItems) {
//        System.out.println("Received order items: " + orderItems.toString());
//        // 遍历整个购物车，插入到数据库
//        String currentUserName = ; // 假设当前用户是 test
//        for (OrderItem orderItem : orderItems) {
//            orderItem.setUserName(currentUserName); // 设置用户名称
//            orderService.insertOrderItem(orderItem); // 加了一个循环将cart数组里面的数据一个一个加到数据库里面
//        }
//
////        return ResponseEntity.ok("购物车已成功添加到订单");
//        return R.ok("购物车已成功添加到订单");
//    }
@Autowired
private OrderService orderService;

    // 修改此方法，接收整个购物车的 OrderItem 列表
    @PostMapping("/add")
    public R insertOrderItems(@RequestBody List<OrderItem> orderItems, HttpServletRequest request) {
        System.out.println("Received order items: " + orderItems.toString());

        // 从请求头获取 Authorization 字段（假设 token 存在于 Authorization 字段中）
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // 去除 "Bearer " 部分
        }

        // 获取当前用户名
        String currentUserName = JwtUtil.validateToken(token);  // 从 token 中解析出用户名

        // 遍历整个购物车，插入到数据库
        for (OrderItem orderItem : orderItems) {
            orderItem.setUserName(currentUserName);  // 设置用户名称
            orderService.insertOrderItem(orderItem); // 将购物车数据插入数据库
        }

        return R.ok("购物车已成功添加到订单");
    }
}
