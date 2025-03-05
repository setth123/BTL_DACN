package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/add")
    public DanhGia themDanhGia(@RequestBody DanhGia danhGia) {
        return danhGiaService.themDanhGia(danhGia);
    }
}