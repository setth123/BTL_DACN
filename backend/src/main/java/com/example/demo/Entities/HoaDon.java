package com.example.demo.Entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="HoaDon")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hoaDonID;

    @ManyToOne
    @JoinColumn(name = "maNguoiDung",referencedColumnName = "maNguoiDung")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "maPhong",referencedColumnName = "maPhong")
    private Phong phong;

    private LocalDate ngayNhanPhong;
    private LocalDate ngayTraPhong;
    private BigDecimal chiPhiDuTinh;
    private BigDecimal tongChiPhi;
    private String hoTenKH;
}
