package com.example.demo.DTO;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HoaDonDTO {
    private Integer hoaDonID;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate ngayNhanPhong;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate ngayTraPhong;
    private String maNguoiDung;
    private String maPhong;
    private String maKhuyenMai;
    private String hoTenKH;
    private String email;
    private String soDienThoai;
    private BigDecimal tongChiPhi;
    private String loaiPhong;
    private String hinhAnh;
    private Integer soNguoi;
    private BigDecimal dienTich;
    private String tienIch;
    private Boolean khuyenMaiState;
}
