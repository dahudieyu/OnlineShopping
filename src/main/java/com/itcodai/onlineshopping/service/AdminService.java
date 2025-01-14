package com.itcodai.onlineshopping.service;

import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminMapper adminMapper;

    // 获取所有订单
    public List<OrderItem> getAllOrders() {
        return adminMapper.getAllOrders();
    }
}
