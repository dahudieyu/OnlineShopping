package com.itcodai.onlineshopping.controller;

import com.itcodai.onlineshopping.config.RequireAuth;
import com.itcodai.onlineshopping.entity.Food;
import com.itcodai.onlineshopping.entity.OrderItem;
import com.itcodai.onlineshopping.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @RequireAuth
    @GetMapping("/all")
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }
}
