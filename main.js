
// $(document).ready(function() {
//     let allProducts = [];
//     let cart = []; // 用于存储购物车中的商品

//     // 获取所有食品数据
//     function fetchAllProducts() {
//         $.ajax({
//             url: 'http://localhost:9090/food/all',
//             type: 'GET',
//             dataType: 'json',
//             success: function(data) {
//                 allProducts = data;
//                 displayProducts(allProducts); // 初始化显示所有食品
//             },
//             error: function(xhr, status, error) {
//                 console.error("获取食品数据失败", error);
//             }
//         });
//     }

//     // 显示食品列表
//     function displayProducts(products) {
//         console.log('当前显示的食品:', products);
//         $('.products').empty();

//         products.forEach(function(product) {
//             const productElement = `
//                 <div class="product" data-category="${product.category}">
//                     <img src="${product.imageUrl || 'default-image.jpg'}" alt="${product.name}">
//                     <div class="product-info">
//                         <h3>${product.name}</h3>
//                         <div class="price">¥${product.price}</div>
//                         <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
//                     </div>
//                 </div>
//             `;
//             $('.products').append(productElement);
//         });
//     }

//     // 处理分类过滤
//     $('.categories li').click(function() {
//         const category = $(this).data('category');
//         console.log('点击的分类:', category);

//         // 切换激活状态
//         $('.categories li').removeClass('active');
//         $(this).addClass('active');

//         if (category === 'all') {
//             displayProducts(allProducts);
//         } else {
//             const filteredProducts = allProducts.filter(function(product) {
//                 return product.category.toLowerCase() === category.toLowerCase();
//             });
//             displayProducts(filteredProducts);
//         }
//     });

//     // 处理加入购物车按钮点击事件
//     $(document).on('click', '.add-to-cart', function() {
//         const product = {
//             id: $(this).data('id'),
//             name: $(this).data('name'),
//             price: $(this).data('price')
//         };

//         // 将商品添加到购物车
//         cart.push(product);
//         console.log('当前购物车内容:', cart);

//         // 更新购物车显示
//         updateCartDisplay();

//         // 发送POST请求，将商品数据添加到数据库（假设有一个添加购物车的接口）
//         $.ajax({
//             url: 'http://localhost:9090/cart/add',  // 假设这是购物车添加商品的接口
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(product), // 将商品数据转为 JSON 格式
//             success: function(response) {
//                 console.log('商品已成功添加到购物车', response);
//                 // 可以在页面上显示成功消息，或者更新购物车图标等
//             },
//             error: function(xhr, status, error) {
//                 console.error("添加商品到购物车失败", error);
//                 // 可以在页面上显示失败消息
//             }
//         });
//     });

//     // 更新购物车显示
//     function updateCartDisplay() {
//         $('.cart-items').empty();
//         let totalPrice = 0;
//         cart.forEach(function(item) {
//             const cartItem = `
//                 <div class="cart-item">
//                     <span>${item.name}</span> - ¥${item.price}
//                 </div>
//             `;
//             $('.cart-items').append(cartItem);
//             totalPrice += item.price;
//         });
//         $('.cart-total').text('总价：¥' + totalPrice);
//     }

//     // 初始化加载所有食品数据
//     fetchAllProducts();
// });

//------------------------------------------------------------------------

// $(document).ready(function() {
//     let allProducts = [];
//     let cart = []; // 用于存储购物车中的商品

//     // 获取所有食品数据
//     function fetchAllProducts() {
//         $.ajax({
//             url: 'http://localhost:9090/food/all',
//             type: 'GET',
//             dataType: 'json',
//             success: function(data) {
//                 allProducts = data;
//                 displayProducts(allProducts); // 初始化显示所有食品
//             },
//             error: function(xhr, status, error) {
//                 console.error("获取食品数据失败", error);
//             }
//         });
//     }

//     // 显示食品列表
//     function displayProducts(products) {
//         console.log('当前显示的食品:', products);
//         $('.products').empty();

//         products.forEach(function(product) {
//             const productElement = `
//                 <div class="product" data-category="${product.category}">
//                     <img src="${product.imageUrl || 'default-image.jpg'}" alt="${product.name}">
//                     <div class="product-info">
//                         <h3>${product.name}</h3>
//                         <div class="price">¥${product.price}</div>
//                         <div class="quantity">
//                             <button class="decrease" data-id="${product.id}">-</button>
//                             <input type="number" class="quantity-input" data-id="${product.id}" value="1" min="1">
//                             <button class="increase" data-id="${product.id}">+</button>
//                         </div>
//                         <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
//                     </div>
//                 </div>
//             `;
//             $('.products').append(productElement);
//         });
//     }

//     // 处理分类过滤
//     $('.categories li').click(function() {
//         const category = $(this).data('category');
//         console.log('点击的分类:', category);

//         // 切换激活状态
//         $('.categories li').removeClass('active');
//         $(this).addClass('active');

//         if (category === 'all') {
//             displayProducts(allProducts);
//         } else {
//             const filteredProducts = allProducts.filter(function(product) {
//                 return product.category.toLowerCase() === category.toLowerCase();
//             });
//             displayProducts(filteredProducts);
//         }
//     });

//     // 处理加入购物车按钮点击事件
//     $(document).on('click', '.add-to-cart', function() {
//         const productId = $(this).data('id');
//         const productName = $(this).data('name');
//         const productPrice = $(this).data('price');
//         const quantity = parseInt($(`.quantity-input[data-id="${productId}"]`).val()); // 获取当前商品数量

//         const product = {
//             id: productId,
//             name: productName,
//             food_id: productId,
//             price: productPrice,
//             quantity: quantity, // 将数量也加入到商品信息中
//             foodId: productId,
//             foodName: productName,
//         };

//         // 判断购物车中是否已经有该商品，如果有则更新数量，否则添加新商品
//         const existingProductIndex = cart.findIndex(item => item.id === productId);
//         if (existingProductIndex > -1) {
//             cart[existingProductIndex].quantity += quantity;
//         } else {
//             cart.push(product);
//         }

//         console.log('当前购物车内容:', cart);

//         // 更新购物车显示
//         updateCartDisplay();

//         // 发送POST请求，将商品数据添加到数据库
//         $.ajax({
//             url: 'http://localhost:9090/cart/add',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(product),
//             success: function (response) {
                
//                 console.log('商品已成功添加到购物车', response);
//             },
//             error: function(xhr, status, error) {
//                 console.error("添加商品到购物车失败", error);
//             }
//         });
//     });

//     // 更新购物车显示
//     function updateCartDisplay() {
//         $('.cart-items').empty();
//         let totalPrice = 0;
//         cart.forEach(function(item) {
//             const cartItem = `
//                 <div class="cart-item" data-id="${item.id}">
//                     <span>${item.name} x ${item.quantity}</span> - ¥${(item.price * item.quantity).toFixed(2)}
//                     <button class="remove-from-cart">删除</button> <!-- 删除按钮 -->
//                 </div>
//             `;
//             $('.cart-items').append(cartItem);
//             totalPrice += item.price * item.quantity;
//         });
//         $('.cart-total').text('总价：¥' + totalPrice.toFixed(2));
//     }

//     // 增加数量按钮事件
//     $(document).on('click', '.increase', function() {
//         const productId = $(this).data('id');
//         const quantityInput = $(`.quantity-input[data-id="${productId}"]`);
//         let currentQuantity = parseInt(quantityInput.val());
//         quantityInput.val(currentQuantity + 1); // 增加数量
//     });

//     // 减少数量按钮事件
//     $(document).on('click', '.decrease', function() {
//         const productId = $(this).data('id');
//         const quantityInput = $(`.quantity-input[data-id="${productId}"]`);
//         let currentQuantity = parseInt(quantityInput.val());
//         if (currentQuantity > 1) {
//             quantityInput.val(currentQuantity - 1); // 减少数量
//         }
//     });

//     // 删除购物车商品事件
//     $(document).on('click', '.remove-from-cart', function() {
//         const productId = $(this).closest('.cart-item').data('id');
        
//         // 从购物车中移除该商品
//         cart = cart.filter(item => item.id !== productId);

//         console.log('当前购物车内容:', cart);

//         // 更新购物车显示
//         updateCartDisplay();

//         // 发送请求，删除购物车中的商品
       
//     });

//     // 初始化加载所有食品数据
//     fetchAllProducts();
// });



///--------------------------------------------------------------------------------------------------

$(document).ready(function () {
    let allProducts = [];
    let cart = []; // 用于存储购物车中的商品

    // 获取所有食品数据
    function fetchAllProducts() {
        $.ajax({
            url: 'http://localhost:9090/food/all',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                allProducts = data;
                displayProducts(allProducts); // 初始化显示所有食品
            },
            error: function (xhr, status, error) {
                console.error("获取食品数据失败", error);
            }
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

    // 更新购物车显示
    function updateCartDisplay() {
        $('.cart-items').empty();
        let totalPrice = 0;

        cart.forEach(function (item) {
            const cartItem = `
                <div class="cart-item" data-id="${item.id}">
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
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    });

    // 提交订单按钮事件
    $('#submit-order').click(function () {
        if (cart.length === 0) {
            alert("购物车为空，无法提交订单！");
            return;
        }

        // 提交购物车数据到服务器
        $.ajax({
            url: 'http://localhost:9090/cart/add', // 假设这是提交订单的接口
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(cart), // 将购物车数据封装成 JSON 格式发送
            success: function (response) {
                alert("订单提交成功！");
                console.log("订单提交成功", response);

                // 清空购物车
                cart = [];
                updateCartDisplay();
            },
            error: function (xhr, status, error) {
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
