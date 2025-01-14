$(document).ready(function () {
    const token = localStorage.getItem("token"); // 获取token

   
        $.ajax({
            url: "http://localhost:9090/api/getPermission",  // 后端接口地址
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (response) {
                if (response.code === 200) {
                    const permission = response.data; // 获取权限信息

                    if (permission == "admin") {
                        // 显示管理员界面
                        console.log("显示管理员界面");
                         window.location.href = "admin.html";


                    } else if (permission == "user") {
                        // 显示用户界面
                        console.log("显示用户界面");
                         window.location.href = "Genuser.html";

                    } else {
                        alert("无效的权限，请重新登录！");
                        window.location.href = "login.html";
                    }
                } else {
                    alert("请求失败，请重新登录！");
                    window.location.href = "login.html";
                }
            }
        });
    
});
