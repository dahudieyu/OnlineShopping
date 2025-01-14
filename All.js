$(document).ready(function () {
    let allProducts = [];
    let cart = []; // 用于存储购物车中的商品

    function customGet(url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: successCallback,
            error: errorCallback || function (xhr, status, error) {
                console.error(`GET 请求失败: ${error}`);
            }
        });
    }

    function customPost(url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: successCallback,
            error: errorCallback || function (xhr, status, error) {
                console.error(`POST 请求失败: ${error}`);
            }
        });
    }



    // // 使用封装后的 GET 请求
    // customGet('http://localhost:9090/food/all', function (data) {
    //     allProducts = data;
    //     displayProducts(allProducts); // 初始化显示所有食品
    // }, function (xhr, status, error) {
    //     console.error("获取食品数据失败", error);
    // });




    // // 使用封装后的 POST 请求
    // $('#submit-order').click(function () {
      
    //     customPost('http://localhost:9090/cart/add', cart, function (response) {
    //         alert("订单提交成功！");
    //         console.log("订单提交成功", response);

    //         // 清空购物车
    //         cart = [];
    //         updateCartDisplay();
    //     }, function (xhr, status, error) {
    //         console.error("订单提交失败", xhr.responseText);
    //         alert("订单提交失败，请稍后再试！");
    //     });
    // });



    $(document).ready(function () {
        let allProducts = [];
        let cart = []; // 用于存储购物车中的商品

        // 封装 GET 请求
        function customGet(url, successCallback, errorCallback) {
            $.ajax({
                url: url,
                type: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                dataType: 'json',
                success: successCallback,
                error: errorCallback || function (xhr, status, error) {
                    console.error(`GET 请求失败: ${error}`);
                }
            });
        }

        // 封装 POST 请求
        function customPost(url, data, successCallback, errorCallback) {
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: successCallback,
                error: errorCallback || function (xhr, status, error) {
                    console.error(`POST 请求失败: ${error}`);
                }
            });
        }

        // 获取所有食品数据
        function fetchAllProducts() {
            customGet('http://localhost:9090/food/all', function (data) {
            
                allProducts = data;
                displayProducts(allProducts); // 初始化显示所有食品
            }, function (xhr, status, error) {
                console.error("获取食品数据失败", error);
            });
        }

        // 显示食品列表
        function displayProducts(products) {
            $('.products').empty();

            products.forEach(function (product) {
                const productElement = `
                <div class="product" data-category="${product.category}">
                    <img src="${product.imageUrl || 'default-image.jpg'}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="price">¥${product.price}</div>
                        <div class="quantity">
                            <button class="decrease" data-id="${product.id}">-</button>
                            <input type="number" class="quantity-input" data-id="${product.id}" value="1" min="1">
                            <button class="increase" data-id="${product.id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
                    </div>
                </div>
            `;
                $('.products').append(productElement);
            });
        }

        // 处理分类过滤
        $('.categories li').click(function () {
            const category = $(this).data('category');
            $('.categories li').removeClass('active');
            $(this).addClass('active');

            if (category === 'all') {
                displayProducts(allProducts);
            } else {
                const filteredProducts = allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
                displayProducts(filteredProducts);
            }
        });

        // 处理加入购物车按钮点击事件
        $(document).on('click', '.add-to-cart', function () {
            const productId = $(this).data('id');
            const productName = $(this).data('name');
            const productPrice = $(this).data('price');
            const quantity = parseInt($(`.quantity-input[data-id="${productId}"]`).val());

            const product = {
                price: productPrice,
                quantity: quantity, // 将数量也加入到商品信息中
                foodId: productId,
                foodName: productName,
                userName: localStorage.getItem("username")
            };

            // 判断购物车中是否已有该商品
            const existingProductIndex = cart.findIndex(item => item.foodId === productId);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push(product);
            }
            console.log(JSON.stringify(cart));
            // 更新购物车显示
            updateCartDisplay();
        });

        // 更新购物车显示
        function updateCartDisplay() {
            $('.cart-items').empty();
            let totalPrice = 0;

            cart.forEach(function (item) {
                const cartItem = `
                <div class="cart-item" data-id="${item.foodId}">
                    <span>${item.foodName} x ${item.quantity}</span> - ¥${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-from-cart">删除</button>
                </div>
            `;
                $('.cart-items').append(cartItem);
                totalPrice += item.price * item.quantity;
            });

            $('.cart-total').text('总价：¥' + totalPrice.toFixed(2));
        }

        // 删除购物车商品事件
        $(document).on('click', '.remove-from-cart', function () {
            const productId = $(this).closest('.cart-item').data('id');
            cart = cart.filter(item => item.foodId !== productId);
            updateCartDisplay();
        });

        // 提交订单按钮事件
        $('#submit-order').click(function () {
            if (cart.length === 0) {
                alert("购物车为空，无法提交订单！");
                return;
            }

            // 提交购物车数据到服务器
           customPost('http://localhost:9090/cart/add', cart, function (response) {
    // 检查返回的 response 中的 code 是否是 200
            if (response.code == 200) {
                alert("订单提交成功！");
                console.log("订单提交成功", response.data); // 这里的 response.data 是返回的数据 "购物车已成功添加到订单"
                
                // 清空购物车
                cart = [];
                updateCartDisplay();
            } else {
                // 如果不是 200，表示请求失败
                alert("订单提交失败，请稍后再试！");
                console.error("订单提交失败", response.msg); // 可以打印失败信息
            }
           }, function (response) {
               if (response.code === 401) {
                   console.error("订单提交失败", xhr.responseText);
                   alert("订单提交失败，请稍后再试！");
               }
        });

        });

        // 增加数量按钮事件
        $(document).on('click', '.increase', function () {
            const productId = $(this).data('id');
            const quantityInput = $(`.quantity-input[data-id="${productId}"]`);
            let currentQuantity = parseInt(quantityInput.val());
            quantityInput.val(currentQuantity + 1);
        });

        // 减少数量按钮事件
        $(document).on('click', '.decrease', function () {
            const productId = $(this).data('id');
            const quantityInput = $(`.quantity-input[data-id="${productId}"]`);
            let currentQuantity = parseInt(quantityInput.val());
            if (currentQuantity > 1) {
                quantityInput.val(currentQuantity - 1);
            }
        });

        // 初始化加载所有食品数据
        fetchAllProducts();
    });

});

