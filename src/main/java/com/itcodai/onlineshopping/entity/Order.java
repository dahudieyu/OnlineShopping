package com.itcodai.onlineshopping.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Order {
    private Integer id;
    private String orderNumber;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;

    // Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getOrderNumber() {
        return orderNumber;
    }
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;

    }
    public LocalDateTime getCreatedAt() {
        return createdAt;

    }
    public void setCreatedAt(LocalDateTime createdAt) {

        this.createdAt = createdAt;

    }
}
