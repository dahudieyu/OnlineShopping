$(document).ready(function() {
    // 定义变量
    let allProducts = [];
    let cart = []; // 用于存储购物车中的商品

    // 获取所有食品数据
    function fetchAllProducts() {
        $.ajax({
            url: 'http://localhost:9090/food/all',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                allProducts = data;
                displayProducts(allProducts); // 初始化显示所有食品
            },
            error: function(xhr, status, error) {
                console.error("获取食品数据失败", error);
            }
        });
    }

    // 显示食品列表
    function displayProducts(products) {
        console.log('当前显示的食品:', products);
        $('.products').empty();

        products.forEach(function(product) {
            const productElement = `
                <div class="product" data-category="${product.category}">
                    <img src="${product.imageUrl || 'default-image.jpg'}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="price">¥${product.price}</div>
                        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
                    </div>
                </div>
            `;
            $('.products').append(productElement);
        });
    }

    // 处理分类过滤
    $('.categories li').click(function() {
        const category = $(this).data('category');
        console.log('点击的分类:', category);

        // 切换激活状态
        $('.categories li').removeClass('active');
        $(this).addClass('active');

        if (category === 'all') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(function(product) {
                return product.category.toLowerCase() === category.toLowerCase();
            });
            displayProducts(filteredProducts);
        }
    });

    // 处理加入购物车按钮点击事件
    $(document).on('click', '.add-to-cart', function() {
        const product = {
            id: $(this).data('id'),
            name: $(this).data('name'),
            price: $(this).data('price')
        };

        // 将商品添加到购物车
        cart.push(product);
        console.log('当前购物车内容:', cart);

        // 发送POST请求，将商品数据添加到数据库（假设有一个添加购物车的接口）
        $.ajax({
            url: 'http://localhost:9090/cart/add',  // 假设这是购物车添加商品的接口
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(product), // 将商品数据转为 JSON 格式
            success: function(response) {
                console.log('商品已成功添加到购物车', response);
                // 可以在页面上显示成功消息，或者更新购物车图标等
            },
            error: function(xhr, status, error) {
                console.error("添加商品到购物车失败", error);
                // 可以在页面上显示失败消息
            }
        });
    });

    // 初始化加载所有食品数据
    fetchAllProducts();
});
