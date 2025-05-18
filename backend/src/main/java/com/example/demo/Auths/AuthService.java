package com.example.demo.Auths;

import com.example.demo.DTO.AdminDTO;
import com.example.demo.DTO.NguoiDungDTO;

public interface AuthService {
    public boolean dangKy(NguoiDungDTO nguoiDungDTO);
    public JwtResponseDTO login(LoginRequest loginRequest);
    public boolean adminLogin(AdminDTO adminDTO);
}
