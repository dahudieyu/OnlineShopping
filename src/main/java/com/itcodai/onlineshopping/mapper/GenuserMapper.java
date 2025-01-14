package com.itcodai.onlineshopping.mapper;


import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GenuserMapper {
    // 根据用户名查找地址
    // 根据用户名获取用户信息
    // 根据用户名获取用户信息
    @Select("SELECT * FROM user WHERE username = #{username}")
    User getUserByUsername(@Param("username") String username);

    // 更新用户地址
    @Update("UPDATE user SET address = #{address} WHERE username = #{username}")
    int updateAddress(@Param("username") String username, @Param("address") String address);

    // 根据用户名获取用户的所有订单
    @Select("SELECT * FROM order_items WHERE username = #{username}")
    @Results({
            @Result(property = "foodName", column = "food_name"),
            @Result(property = "orderId", column = "order_id"),
            @Result(property = "foodId", column = "food_id"),
            @Result(property = "quantity", column = "quantity"),
            @Result(property = "price", column = "price"),
            @Result(property = "userName", column = "username")
    })
    List<OrderItem> getOrdersByUsername(String username);
}
