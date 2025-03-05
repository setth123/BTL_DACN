package com.example.demo.Entities;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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
@Table(name = "DanhGia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "maNguoiDung",referencedColumnName = "maNguoiDung")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "maKhachSan",referencedColumnName = "maKhachSan")
    private KhachSan khachSan;

    @Column(columnDefinition = "TEXT")
    private String noiDungDanhGia;

    private BigDecimal soDiem;
}
