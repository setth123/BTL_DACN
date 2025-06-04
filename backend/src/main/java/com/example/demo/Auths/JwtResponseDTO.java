package com.example.demo.Auths;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDTO {
    private String access_token;
    private String refresh_token;
}
