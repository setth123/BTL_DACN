package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KhachSanDTODetail {
    private String maKhachSan;

    private String tenKhachSan;

    private String hinhAnh;
    private BigDecimal diemSoTB;
    private String diaChiCT;
    private String thongTinGT;
    private String tienIch;
    private List<PhongDTO> listRoom ;
}
