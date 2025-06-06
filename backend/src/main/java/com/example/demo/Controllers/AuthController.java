package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.AuthRequest;
import com.example.demo.DTO.AuthResponse;
import com.example.demo.Entities.Admin;
import com.example.demo.Entities.NguoiDung;
import com.example.demo.Repositories.AdminResponsitory;
import com.example.demo.Repositories.NguoiDungRepository;
import com.example.demo.util.JwtUtil;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private NguoiDungRepository ndr;
    @Autowired
    private AdminResponsitory adr;
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody AuthRequest authRequest) {
        Admin admin = adr.findByAdminName(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        if (!authRequest.getPassword().equals(admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateAdminToken(admin);
        Map<String, Object> claims = jwtUtil.extractAllClaims(token);
        return ResponseEntity.ok(new AuthResponse(token, claims));
    }
    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody AuthRequest authRequest) {
        NguoiDung nd = ndr.findNguoiDungByEmailOrTenDangNhap(authRequest.getUsername(),"")
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!authRequest.getPassword().equals(nd.getMatKhau())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateUserToken(nd);
        Map<String, Object> claims = jwtUtil.extractAllClaims(token);
        return ResponseEntity.ok(new AuthResponse(token, claims));
    }
    @PostMapping("/user/register")
    public ResponseEntity<?> userRegister(@RequestBody NguoiDung nguoiDung) {
        if (ndr.findNguoiDungByEmailOrTenDangNhap(nguoiDung.getEmail(),nguoiDung.getTenDangNhap()).isPresent()) {
            return ResponseEntity.status(400).body("Email or username already exists");
        }
        nguoiDung.setMaNguoiDung("ND" + java.util.UUID.randomUUID().toString().substring(0, 14));
        ndr.save(nguoiDung);
        return ResponseEntity.ok("User registered successfully");
    }
}
