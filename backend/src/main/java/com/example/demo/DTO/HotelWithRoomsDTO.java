package com.example.demo.DTO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Entities.KhachSan;

import lombok.Data;

@Data
public class HotelWithRoomsDTO {
    private String maKhachSan;
    private String tenKhachSan;
    private String hinhAnh;
    private BigDecimal diemSoTB;
    private String diaChi;
    private String thongTinGT;
    private String tienIch;
    private List<String> roomIds = new ArrayList<>();

    public HotelWithRoomsDTO(KhachSan hotel) {
        this.maKhachSan = hotel.getMaKhachSan();
        this.tenKhachSan = hotel.getTenKhachSan();
        this.diaChi = hotel.getDiaChiCT();
        this.diemSoTB = hotel.getDiemSoTB();
        this.hinhAnh = hotel.getHinhAnh();
        this.thongTinGT = hotel.getThongTinGT();
        this.tienIch = hotel.getTienIch();
    }
}