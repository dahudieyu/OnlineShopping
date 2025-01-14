package com.itcodai.onlineshopping.mapper;

import com.itcodai.onlineshopping.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Insert("INSERT INTO user (username, password, permission) VALUES (#{username}, #{password}, #{permission})")
    void insertUser(User user);


    @Select("SELECT * FROM user WHERE username = #{username}")
    User findByUsername(String username);


    @Select("SELECT permission FROM User WHERE username = #{username}")
    String findPermissionByUsername(String username);

}
