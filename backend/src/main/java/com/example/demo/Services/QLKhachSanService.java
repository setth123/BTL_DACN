package com.example.demo.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.KhachSanDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;



@Service
public class QLKhachSanService {

    @Autowired
    private KhachSanRepository ksr ;

    public List<KhachSan> getAllKhachSan() {
        return ksr.findAll();
    }

    public Optional<KhachSan> getByMaKhachSan(String maKhachSan) {
        return ksr.findById(maKhachSan);
    }

    public KhachSan themKhachSan(KhachSanDTO khachsan) {
        KhachSan ks = new KhachSan();
        ks.setMaKhachSan("KS" + java.util.UUID.randomUUID().toString().substring(0, 14));
        ks.setTenKhachSan(khachsan.getTenKhachSan());
        ks.setHinhAnh(khachsan.getHinhAnh());
        ks.setThongTinGT(khachsan.getThongTinGT());
        ks.setDiaChiCT(khachsan.getDiaChiCT());
        ks.setDiemSoTB(khachsan.getDiemSoTB());
        ks.setTienIch(khachsan.getTienIch());
        return ksr.save(ks);
    }

    public KhachSan suaKhachSan(String maKhachSan, KhachSanDTO khachsan) {
        KhachSan ks = ksr.findById(maKhachSan).orElseThrow(
            () -> new RuntimeException("Không tìm thấy khách sạn")
        );
        ks.setTenKhachSan(khachsan.getTenKhachSan());
        ks.setHinhAnh(khachsan.getHinhAnh());
        ks.setThongTinGT(khachsan.getThongTinGT());
        ks.setDiaChiCT(khachsan.getDiaChiCT());
        ks.setDiemSoTB(khachsan.getDiemSoTB());
        ks.setTienIch(khachsan.getTienIch());
        return ksr.save(ks);
    }

    public void xoaKhachSan(String maKhachSan) {
        KhachSan ks = ksr.findById(maKhachSan).orElseThrow(
            ()-> new RuntimeException("Không tìm thấy khách sạn"));
        ksr.delete(ks);   
    }
}
