package com.itcodai.onlineshopping.service;


import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.entity.User;
import com.itcodai.onlineshopping.mapper.GenuserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenuserService {
    @Autowired
    private GenuserMapper genuserMapper;

    // 根据用户名获取用户地址
    public String getAddressByUsername(String username) {
        User user = genuserMapper.getUserByUsername(username);
        if (user != null) {
            return user.getAddress();
        }
        return null;
    }

    // 更新用户地址
    public boolean updateAddress(String username, String address) {
        return genuserMapper.updateAddress(username, address) > 0;
    }



    // 根据用户名获取用户订单
    public List<OrderItem> getOrdersByUsername(String username) {
        return genuserMapper.getOrdersByUsername(username);
    }



}