package com.itcodai.onlineshopping.mapper;

import com.itcodai.onlineshopping.entity.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderItemMapper {

    // 插入单个 OrderItem
    void insertOrderItem(OrderItem orderItem);

    // 批量插入多个 OrderItem
    //void insertOrderItems(@Param("orderItems") List<OrderItem> orderItems);
}
