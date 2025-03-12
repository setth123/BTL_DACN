package com.example.demo.Services;

import com.example.demo.DTO.KhuyenMaiDTO;

public interface KhuyenMaiService{
    void themKhuyenMai(KhuyenMaiDTO request) ;
    void xoaKhuyenMai(String maKhuyenMai);
    void suaKhuyenMai(String maKhuyenMai ,KhuyenMaiDTO request);
}
