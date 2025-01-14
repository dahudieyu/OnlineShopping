package com.itcodai.onlineshopping.service;

import com.itcodai.onlineshopping.entity.Food;
import com.itcodai.onlineshopping.mapper.FoodMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    @Autowired
    private FoodMapper foodMapper;

    public List<Food> getAllFoods() {
        return foodMapper.getAllFoods();
    }
}
