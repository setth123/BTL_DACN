package com.example.demo.Entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "KhuyenMai")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KhuyenMai {
    @Id
    private String maKhuyenMai;

    private LocalDate ngayBD;
    private LocalDate ngayKT;
    private BigDecimal mucKhuyenMai;
    private BigDecimal giaoDichToiThieu;
}
