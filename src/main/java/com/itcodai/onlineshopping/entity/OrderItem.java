package com.itcodai.onlineshopping.entity;

public class OrderItem {
    private Long id;  // 主键
    private int orderId;  // 订单ID
    private int foodId;   // 食品ID
    private String foodName;
    private int quantity;  // 食品数量
    private Double price;
    private String userName;
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public String getFoodName() {
        return foodName;
    }
    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getUserName() {
        return userName;

    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString(){
        return "OrderItem{" +
                "id=" + id +
                ", orderId=" + orderId +
                ", foodId=" + foodId +
                ", foodName='" + foodName + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", userName='" + userName + '\'' +
                '}';
    }
}
