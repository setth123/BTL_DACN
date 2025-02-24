package com.example.demo.Entities;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name="Phong")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Phong {
    @Id
    private String maPhong;

    @Column(nullable = false, length = 70)
    private String loaiPhong;

    private String hinhAnh;
    private Integer soNguoi;
    private BigDecimal dienTich;
    private String tienIch;
    private BigDecimal giaPhong;
    private Integer soPhongTrong;

    @ManyToOne
    @JoinColumn(name = "maKhachSan",referencedColumnName = "maKhachSan")
    @JsonIgnore
    private KhachSan khachSan;
}
