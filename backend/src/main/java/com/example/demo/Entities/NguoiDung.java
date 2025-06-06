package com.example.demo.Entities;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDung {
    @Id
    @Column(name = "manguoidung")
    private String maNguoiDung;
    @Column(nullable = false, name = "tendangnhap")
    private String tenDangNhap;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, name = "sodienthoai")
    private String soDienThoai;

    @Column(nullable = false, name = "matkhau")
    private String matKhau;



}
