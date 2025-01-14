$(document).ready(function () {
    $("form").on("submit", function (event) {
        event.preventDefault();

        var formData = new FormData(this);

       $.ajax({
    url: 'http://localhost:9090/login',
    type: 'POST',
    contentType: 'application/json',  // 设置为 application/json
    data: JSON.stringify({ username: 'dkh', password: '123456' }),
    success: function(response) {
        console.log('登录成功');
    },
    error: function(xhr, status, error) {
        console.log('错误:', error);
    }
});

    });
});
