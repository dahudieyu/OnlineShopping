package com.itcodai.onlineshopping.controller;




import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.service.AdminService;
import com.itcodai.onlineshopping.service.OrderService;
import com.itcodai.onlineshopping.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    // 获取所有用户的订单数据
    @GetMapping("/orders")
    public R getAllOrders() {
        List<OrderItem> orderItems = adminService.getAllOrders(); // 获取所有订单
        System.out.println(orderItems.toString());
        return R.ok(orderItems);  // 返回所有订单数据
    }
}


