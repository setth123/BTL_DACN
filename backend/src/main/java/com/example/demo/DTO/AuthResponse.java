package com.example.demo.DTO;

import lombok.Data;

import java.util.Map;

@Data
public class AuthResponse {
    private String token;
    private Map<String, Object> claims;

    public AuthResponse(String token, Map<String, Object> claims) {
        this.token = token;
        this.claims = claims;
    }
}
