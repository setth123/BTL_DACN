package com.example.demo.Entities;

import java.math.BigDecimal;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "DanhGia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhGia {
    @Id
    private String maDanhGia;

    @ManyToOne
    @JoinColumn(name = "maNguoiDung",referencedColumnName = "maNguoiDung")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "maKhachSan",referencedColumnName = "maKhachSan")
    private KhachSan khachSan;

    @Column(columnDefinition = "TEXT")
    private String noiDungDanhGia;

    private BigDecimal soDiem;
}
