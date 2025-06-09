package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.DanhGiaDTO;
import com.example.demo.Entities.DanhGia;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Entities.NguoiDung;
import com.example.demo.Repositories.DanhGiaRepository;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Repositories.NguoiDungRepository;

@Service
public class DanhGiaService {
    @Autowired
    private DanhGiaRepository danhGiaRepository;
    @Autowired
    private KhachSanRepository ksr;
    @Autowired
    private NguoiDungRepository ndr;
    
    public List<DanhGia> getDanhGiaByKhachSan(String maKhachSan) {
        return danhGiaRepository.findByKhachSan_MaKhachSan(maKhachSan);
    }

    public DanhGia themDanhGia(DanhGiaDTO danhGia) {
        DanhGia dg=new DanhGia();
        dg.setMaDanhGia("DG"+java.util.UUID.randomUUID().toString().substring(0, 14));
        KhachSan ks=ksr.findById(danhGia.getMaKhachSan()).orElseThrow(() -> new RuntimeException("Khách sạn không tồn tại!"));
        dg.setKhachSan(ks);
        NguoiDung nd=ndr.findById(danhGia.getMaNguoiDung()).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại!"));
        dg.setNguoiDung(nd);
        dg.setNoiDungDanhGia(danhGia.getNoiDungDanhGia());
        dg.setSoDiem(danhGia.getSoDiem());
        return danhGiaRepository.save(dg);
    }
//    public DanhGia themDanhGia(DanhGiaDTO danhGia) {
//        // Validate nội dung bình luận
//        String noiDung = danhGia.getNoiDungDanhGia();
//        if (noiDung == null || noiDung.trim().isEmpty()) {
//            throw new IllegalArgumentException("Nội dung bình luận không được để trống.");
//        }
//        if (!noiDung.matches("^[\\p{L}\\p{N}\\s.,!?]+$")) {
//            throw new IllegalArgumentException("Nội dung bình luận không hợp lệ.");
//        }
//
//        // Validate điểm số
//        BigDecimal diem = danhGia.getSoDiem();
//        if (diem == null) {
//            throw new IllegalArgumentException("Số điểm đánh giá không được để trống.");
//        }
//        if (diem.compareTo(BigDecimal.ZERO) < 0 || diem.compareTo(new BigDecimal("10")) > 0) {
//            throw new IllegalArgumentException("Số điểm đánh giá phải từ 0 đến 10.");
//        }
//
//        KhachSan ks = ksr.findById(danhGia.getMaKhachSan())
//                .orElseThrow(() -> new IllegalArgumentException("Khách sạn không tồn tại!"));
//        NguoiDung nd = ndr.findById(danhGia.getMaNguoiDung())
//                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại!"));
//
//        DanhGia dg = new DanhGia();
//        dg.setMaDanhGia("DG" + System.currentTimeMillis());
//        dg.setKhachSan(ks);
//        dg.setNguoiDung(nd);
//        dg.setNoiDungDanhGia(noiDung);
//        dg.setSoDiem(diem);
//        return danhGiaRepository.save(dg);
//    }


}
