package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.DanhGia;

public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
    List<DanhGia> findByKhachSan_MaKhachSan(String maKhachSan);
}
