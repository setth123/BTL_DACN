package com.example.demo.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KhuyenMaiDTO {
    private String maKhuyenMai;
    private LocalDate ngayBD;
    private LocalDate ngayKT;
    private BigDecimal mucKhuyenMai;
    private BigDecimal giaoDichToiThieu;

}
