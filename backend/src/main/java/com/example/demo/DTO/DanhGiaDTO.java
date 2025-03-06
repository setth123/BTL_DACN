package com.example.demo.DTO;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DanhGiaDTO{
    private String maDanhGia;
    private String maNguoiDung;
    private String maKhachSan;
    private String noiDungDanhGia;
    private BigDecimal soDiem;
}