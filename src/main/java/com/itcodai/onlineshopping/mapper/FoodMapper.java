package com.itcodai.onlineshopping.mapper;

import com.itcodai.onlineshopping.entity.Food;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FoodMapper {
    List<Food> getAllFoods();
}
