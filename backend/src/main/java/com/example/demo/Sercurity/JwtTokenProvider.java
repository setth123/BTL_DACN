package com.example.demo.Sercurity;

import com.example.demo.Repositories.NguoiDungRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Service
public class JwtTokenProvider {
    private final String SECRET_KEY = "supersecretkeythatissupersecureandlongenough";

    private final long EXPIRATION_TIME = 900000;
    private final long REFRESH_EXPIRATION_TIME = 604800000;
    private final NguoiDungRepository nguoiDungRepository;

    public JwtTokenProvider(NguoiDungRepository nguoiDungRepository) {
        this.nguoiDungRepository = nguoiDungRepository;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .setSubject(username)
                .signWith(getSigningKey())
                .compact();
    }

    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        try {
            Claims claims = getClaimsFromToken(refreshToken);
            if(nguoiDungRepository.existsNguoiDungByEmailOOrTenDangNhap(claims.getSubject(), claims.getSubject()) && claims.getExpiration().after(new Date())){
                return Jwts.builder()
                        .setIssuedAt(new Date(System.currentTimeMillis()))
                        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                        .setSubject(claims.getSubject())
                        .signWith(getSigningKey())
                        .compact();
            }else{
                return "Sai token hoặc token hết hạn";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .setSubject(username)
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return claims.getExpiration().after(new Date()); // Kiểm tra token hết hạn chưa
        } catch (Exception e) {
            return false; // Token không hợp lệ
        }
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
}
