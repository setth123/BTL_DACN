package com.example.demo.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.example.demo.Entities.Admin;
import com.example.demo.Entities.NguoiDung;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private final String secret="chiileehaydoi-1234567890abcdefghjklmnopqrstuvwxyz";
    private long EXPIRATION_TIME = 86400000;
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes()); 
    public String generateAdminToken(Admin admin){
        Map<String,Object>claims=new HashMap<>();
        claims.put("adminId",admin.getId());
        claims.put("adminName",admin.getAdminName());
        return Jwts.builder()
            .claims(claims)
            .subject(admin.getAdminName())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) 
            .signWith(key)
            .compact();
    }
    public String generateUserToken(NguoiDung user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("maNguoiDung", user.getMaNguoiDung());
        claims.put("tenDangNhap", user.getTenDangNhap());
        claims.put("email", user.getEmail());
        claims.put("soDienThoai", user.getSoDienThoai());
        return Jwts.builder()
                .claims(claims)
                .subject(user.getTenDangNhap())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
    public Map<String, Object> extractAllClaims(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }
}
