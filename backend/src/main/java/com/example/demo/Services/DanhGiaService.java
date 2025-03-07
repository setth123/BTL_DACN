package com.example.demo.Services;

import java.util.List;

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
    private final DanhGiaRepository danhGiaRepository;
    private final KhachSanRepository ksr;
    private final NguoiDungRepository ndr;

    public DanhGiaService(DanhGiaRepository danhGiaRepository, KhachSanRepository ksr, NguoiDungRepository ndr){
        this.danhGiaRepository = danhGiaRepository;
        this.ksr = ksr;
        this.ndr = ndr;
    }

    public List<DanhGia> getDanhGiaByKhachSan(String maKhachSan) {
        return danhGiaRepository.findByKhachSan_MaKhachSan(maKhachSan);
    }

    public DanhGia themDanhGia(DanhGiaDTO danhGia) {
        DanhGia dg=new DanhGia();
        dg.setMaDanhGia("DG"+System.currentTimeMillis());
        KhachSan ks=ksr.findById(danhGia.getMaKhachSan()).orElseThrow(() -> new RuntimeException("Khách sạn không tồn tại!"));
        dg.setKhachSan(ks);
        NguoiDung nd=ndr.findById(danhGia.getMaNguoiDung()).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại!"));
        dg.setNguoiDung(nd);
        dg.setNoiDungDanhGia(danhGia.getNoiDungDanhGia());
        dg.setSoDiem(danhGia.getSoDiem());
        return danhGiaRepository.save(dg);
    }
}