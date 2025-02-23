package com.example.demo.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.PhongDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Entities.Phong;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Repositories.PhongRepository;

@Service
public class PhongService {
    @Autowired
    PhongRepository pr;
    @Autowired
    KhachSanRepository ksr;
    //add
    public void addPhong(PhongDTO phongDTO){
            Phong p=new Phong();
            p.setMaPhong("P"+System.currentTimeMillis());
            p.setLoaiPhong(phongDTO.getLoaiPhong());
            p.setDienTich(phongDTO.getDienTich());
            p.setGiaPhong(phongDTO.getGiaPhong());
            p.setHinhAnh(phongDTO.getHinhAnh());
    
            KhachSan ks=ksr.findById(phongDTO.getMaKhachSan()).orElseThrow();
            p.setKhachSan(ks);
    
            p.setSoNguoi(phongDTO.getSoNguoi());
            p.setSoPhongTrong(phongDTO.getSoPhongTrong());
            p.setTienIch(phongDTO.getTienIch());
            pr.save(p);
        }
    //update
    public void updatePhong(String maPhong,PhongDTO phongDTO){
        Phong p=pr.findById(maPhong).orElseThrow();
        p.setDienTich(phongDTO.getDienTich());
        p.setGiaPhong(phongDTO.getGiaPhong());
        p.setHinhAnh(phongDTO.getHinhAnh());
        p.setLoaiPhong(phongDTO.getLoaiPhong());
        p.setSoNguoi(phongDTO.getSoNguoi());
        p.setSoPhongTrong(phongDTO.getSoPhongTrong());
        p.setTienIch(phongDTO.getTienIch());
        pr.save(p);
    }
}
