package com.example.demo.DTO;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KhachSanDTO {
    private String maKhachSan;

    private String tenKhachSan;

    private String hinhAnh;
    private BigDecimal diemSoTB;
    private String diaChiCT;
    private String thongTinGT;
    private String tienIch;
}
