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
    private String maNguoiDung;
    @Column(nullable = false, length = 40)
    private String tenDangNhap;

    @Column(nullable = false, length = 70)
    private String email;

    @Column(nullable = false, length = 10)
    private String soDienThoai;

    @Column(nullable = false, length = 40)
    private String matKhau;
}
