package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.DanhGia;
import com.example.demo.Repositories.DanhGiaRepository;

@Service
public class DanhGiaService {
    @Autowired
    private DanhGiaRepository danhGiaRepository;

    public List<DanhGia> getDanhGiaByKhachSan(String maKhachSan) {
        return danhGiaRepository.findByKhachSan_MaKhachSan(maKhachSan);
    }

    public DanhGia themDanhGia(DanhGia danhGia) {
        return danhGiaRepository.save(danhGia);
    }
}