package com.example.demo.DTO;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HoaDonDTO {
    private LocalDate ngayNhanPhong;
    private LocalDate ngayTraPhong;
    private String maNguoiDung;
    private String maPhong;
    private String maKhuyenMai;
}
