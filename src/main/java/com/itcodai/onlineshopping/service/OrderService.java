package com.itcodai.onlineshopping.service;

import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.mapper.OrderItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderItemMapper orderItemMapper;

    // 插入单个 OrderItem
    public void insertOrderItem(OrderItem orderItem){
        orderItemMapper.insertOrderItem(orderItem);
    }

    // 插入多个 OrderItem（批量插入）
//    public void insertOrderItems(List<OrderItem> orderItems){
//        orderItemMapper.insertOrderItems(orderItems);  // 调用批量插入方法
//    }
}
