$('#registerBtn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();

        var registerData = {
            username: username,
            password: password
        };

        // 发送POST请求进行注册
        $.ajax({
            url: 'http://localhost:9090/register',  // 后端注册API的URL
            method: 'POST',
            contentType: 'application/json',  // 发送的数据是JSON格式
            data: JSON.stringify(registerData),  // 将数据转为JSON字符串
            success: function (response) {
                // 注册成功处理
                alert('注册成功');
                window.location.href = '/login';  // 注册成功后跳转到登录页面
            },
            error: function (xhr, status, error) {
                // 注册失败处理
                alert('注册失败: ' + xhr.responseText);
            }
        });
    });