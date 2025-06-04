package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.List;

import com.example.demo.DTO.PhongDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KhachSanChiTietDTO {
    private String maKhachSan;
    private String tenKhachSan;
    private String hinhAnh;
    private BigDecimal diemSoTB;
    private String diaChiCT;
    private String tienIch;
    private String thongTinGT;
    private List<PhongDTO> phongs;

    // Constructor chỉ với 4 tham số đầu tiên
//    public KhachSanChiTietDTO(String maKhachSan, String tenKhachSan, String hinhAnh, BigDecimal diemSoTB) {
//        this.maKhachSan = maKhachSan;
//        this.tenKhachSan = tenKhachSan;
//        this.hinhAnh = hinhAnh;
//        this.diemSoTB = diemSoTB;
//    }

    public KhachSanChiTietDTO(String maKhachSan, String tenKhachSan, String hinhAnh, BigDecimal diemSoTB, String diaChiCT, String tienIch , String thongTinGT) {
        this.maKhachSan = maKhachSan;
        this.tenKhachSan = tenKhachSan;
        this.hinhAnh = hinhAnh;
        this.diemSoTB = diemSoTB;
        this.diaChiCT = diaChiCT;
        this.tienIch = tienIch;
        this.thongTinGT = thongTinGT;
    }
}