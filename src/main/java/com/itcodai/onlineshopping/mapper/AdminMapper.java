package com.itcodai.onlineshopping.mapper;

import com.itcodai.onlineshopping.entity.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AdminMapper{
// 查询所有用户的订单
// 你可以根据自己的数据库表结构调整查询语句
List<OrderItem> getAllOrders();

}
