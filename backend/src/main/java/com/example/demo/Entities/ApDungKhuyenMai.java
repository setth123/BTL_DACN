package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "ApDungKhuyenMai")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApDungKhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="maKhuyenMai",referencedColumnName = "maKhuyenMai")
    private KhuyenMai khuyenMai;

    @ManyToOne
    @JoinColumn(name="hoaDonID",referencedColumnName = "hoaDonID")
    private HoaDon hoaDon;
}
