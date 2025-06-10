package com.example.demo.Controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.DanhGiaDTO;
import com.example.demo.Entities.DanhGia;
import com.example.demo.Services.DanhGiaService;

@RestController
@RequestMapping("/api/danhgia")
public class DanhGiaController {
    @Autowired
    private DanhGiaService danhGiaService;

    @GetMapping("/khachsan/{maKhachSan}")
    public List<DanhGia> getDanhGiaByKhachSan(@PathVariable String maKhachSan) {
        return danhGiaService.getDanhGiaByKhachSan(maKhachSan);
    }

//    @PostMapping("/add")
//    public DanhGia themDanhGia(@RequestBody DanhGiaDTO danhGia) {
//        return danhGiaService.themDanhGia(danhGia);
//    }

    @PostMapping("/add")
    public ResponseEntity<?> themDanhGia(@RequestBody DanhGiaDTO danhGia) {
        try {
            DanhGia dg = danhGiaService.themDanhGia(danhGia);
            return ResponseEntity.ok().body(Map.of("message", "Đã thêm đánh giá thành công!", "data", dg));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi hệ thống: " + ex.getMessage()));
        }
    }
}