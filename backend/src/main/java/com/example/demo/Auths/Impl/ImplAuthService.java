package com.example.demo.Auths.Impl;

import com.example.demo.Auths.AuthService;
import com.example.demo.Auths.JwtResponseDTO;
import com.example.demo.Auths.LoginRequest;
import com.example.demo.DTO.AdminDTO;
import com.example.demo.DTO.NguoiDungDTO;
import com.example.demo.Entities.Admin;
import com.example.demo.Entities.NguoiDung;
import com.example.demo.Entities.RefreshToken;
import com.example.demo.Repositories.AdminResponsitory;
import com.example.demo.Repositories.NguoiDungRepository;
import com.example.demo.Repositories.RefreshTokenRepository;
import com.example.demo.Sercurity.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ImplAuthService implements AuthService {
    private final NguoiDungRepository nguoiDungRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AdminResponsitory adminResponsitory;

    public ImplAuthService(NguoiDungRepository nguoiDungRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository, AdminResponsitory adminResponsitory) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.refreshTokenRepository = refreshTokenRepository;
        this.adminResponsitory = adminResponsitory;
    }

    @Override
    public boolean dangKy(NguoiDungDTO nguoiDungDTO) {
        if(nguoiDungRepository.existsNguoiDungByEmailOOrTenDangNhap(nguoiDungDTO.getTenDangNhap(), nguoiDungDTO.getEmail())){
            return false;
        }else{
            String password = passwordEncoder.encode(nguoiDungDTO.getMatKhau());
            NguoiDung nguoiDung = new NguoiDung(nguoiDungDTO.getMaNguoiDung() ,nguoiDungDTO.getTenDangNhap(), nguoiDungDTO.getEmail(), nguoiDungDTO.getSoDienThoai(), password);
            nguoiDungRepository.save(nguoiDung);
            return true;
        }

    }

    @Override
    public JwtResponseDTO login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmailOrPhone()
                        , loginRequest.getPassword()
                )
        );
        String accessToken = jwtTokenProvider.generateToken(loginRequest.getEmailOrPhone());
        String refreshToken = jwtTokenProvider.generateRefreshToken(loginRequest.getEmailOrPhone());
        Claims claims = jwtTokenProvider.getClaimsFromToken(refreshToken);
        refreshTokenRepository.save(new RefreshToken(refreshToken, claims.getIssuedAt()));
        return new JwtResponseDTO(accessToken, refreshToken);
    }

    @Override
    public boolean adminLogin(AdminDTO adminDTO) {
        Admin admin = adminResponsitory.findByAdminName(adminDTO.getAdminName())
                .orElseThrow(() -> new RuntimeException("Tai Khoan khong ton tai!"));
        if(admin.getPassword().equals(adminDTO.getPassword())) {
            return true;
        }
        return false;
    }
}
