package com.itcodai.onlineshopping.aspect;


import com.itcodai.onlineshopping.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;


@Component
@Aspect
public class JwtAuthAspect {
    private final HttpServletRequest request;

    public JwtAuthAspect(HttpServletRequest request) {
        this.request = request;
    }

    @Before("@annotation(com.itcodai.onlineshopping.config.RequireAuth)")
    // 切入点：带 @RequireAuth 注解的方法
    public void validateToken() throws Exception {
        System.out.println("成功！！！！！！");
        System.out.println(request.getRequestURI());
        String token = request.getHeader("Authorization");
        System.out.println(token);
        // 检查是否存在 Token
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("请先登录");
        }

        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // 去掉 "Bearer " 前缀
        }


        // 验证 Token
        // 验证 Token
        try {
            String username = JwtUtil.validateToken(token);
            String permission = JwtUtil.getPermissionFromToken(token); // 假设工具类提供此方法
            request.setAttribute("username", username);
            request.setAttribute("permission", permission);
        } catch (Exception e) {
            throw new RuntimeException("无效的 Token");
        }
    }
}
