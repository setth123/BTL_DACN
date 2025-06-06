package com.example.demo.Entities;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Entity
@Table(name = "KhachSan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhachSan {
    @Id
    private String maKhachSan;

    @Column(nullable = false, length = 70)
    private String tenKhachSan;

    private String hinhAnh;
    private BigDecimal diemSoTB;
    private String diaChiCT;
    private String thongTinGT;
    private String tienIch;

//    @OneToMany(mappedBy = "khachSan", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<Phong> phongs;
}
