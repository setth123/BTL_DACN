package com.example.demo.DTO;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PhongDTO {
    private String maPhong;
    private String loaiPhong;
    private String hinhAnh;
    private Integer soNguoi;
    private BigDecimal dienTich;
    private String tienIch;
    private BigDecimal giaPhong;
    private Integer soPhongTrong;
    private String maKhachSan;
}
