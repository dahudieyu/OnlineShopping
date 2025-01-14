// 定义通用的post和get函数
function post(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            if (response.code === 200 && response.data) {
                if (successCallback) successCallback(response);  // 登录成功的回调
            } else {
                console.error('登录失败，服务器返回了非成功状态');
                if (errorCallback) errorCallback(response);  // 登录失败的回调
            }
        },
        error: function (xhr, status, error) {
            if (errorCallback) errorCallback(xhr, status, error);
            console.error('POST 请求错误:', error);
        }
    });
}

function get(url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
        dataType: 'json',
        success: function (response) {
            if (successCallback) successCallback(response);
        },
        error: function (xhr, status, error) {
            if (errorCallback) errorCallback(xhr, status, error);
            console.error('GET 请求错误:', error);
        }
    });
}

// 使用封装函数的示例
$(document).ready(function () {
    // 登录请求
    $("form").on("submit", function (event) {
        event.preventDefault();

        const formData = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        // 调用封装的 post 请求
        post('http://localhost:9090/login', formData,
            function (response) {
               
                 // 登录成功，假设后端返回的是 token
                console.log('登录成功:', response);
                localStorage.setItem('token', response.data);  // 保存 token
                window.location.href = 'main.html';  // 跳转到 main.html
                
            },
            function (xhr, status, error) {
                // 登录失败，处理错误
                console.log("XHR对象:", xhr);           // 输出 xhr 对象，查看详细的响应信息
                console.log("状态:", status);            // 输出状态，如 'error' 或 'timeout'
                console.log("错误信息:", error);         // 输出错误信息，例如 "Unauthorized"
                
                if (xhr.status == 401) {
                    // 未授权错误，提示用户登录失败
                    alert('登录失败，请检查用户名或密码');
                } else {
                    alert('登录请求失败，请稍后再试');
                }
                
                console.error('登录失败:', error);
            }
        );
    });

    // 获取所有食品数据
    function fetchAllProducts() {
        get('http://localhost:9090/food/all',
            function (data) {
                console.log('获取食品数据成功:', data);
                displayProducts(data);
            },
            function (xhr, status, error) {
                console.error('获取食品数据失败:', error);
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
                        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
                    </div>
                </div>
            `;
            $('.products').append(productElement);
        });
    }

    // 加入购物车
    $(document).on('click', '.add-to-cart', function () {
        const product = {
            id: $(this).data('id'),
            name: $(this).data('name'),
            price: $(this).data('price')
        };

        post('http://localhost:9090/cart/add', product,
            function (response) {
                console.log('商品已成功添加到购物车:', response);
                    
            },
            function (xhr, status, error) {
                console.error('添加商品到购物车失败:', error);
            });
    });

    // 初始化加载食品数据
    fetchAllProducts();
});


    $(document).on('click', '.add-to-cart', function () {
        const productId = $(this).data('id');
        const productName = $(this).data('name');
        const productPrice = $(this).data('price');
        const quantity = parseInt($(`.quantity-input[data-id="${productId}"]`).val());

        const product = {
            //id: productId,
            //name: productName,
            //food_id: productId,
            price: productPrice,
            quantity: quantity, // 将数量也加入到商品信息中
            // foodId: productId,
             foodId: productId,
            foodName: productName,
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


