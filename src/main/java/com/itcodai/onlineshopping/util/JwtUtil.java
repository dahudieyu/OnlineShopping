package com.itcodai.onlineshopping.util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "fsdfsdfs";

    public static String generateToken(String username, String permission) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(username)
                .claim("permission", permission)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static String validateToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject(); // 获取 Token 中的主体
        } catch (Exception e) {
            throw new RuntimeException("无效的 Token 或 Token 已过期", e);
        }
    }

    public static String getPermissionFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("permission", String.class); // 获取 Token 中的 "permission" 字段
        } catch (Exception e) {
            throw new RuntimeException("Token 无效或解析错误", e);
        }
    }




}
