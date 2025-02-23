package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NguoiDungDTO {
    private String maNguoiDung;
    private String tenDangNhap;

    private String email;

    private String soDienThoai;

    private String matKhau;
}
