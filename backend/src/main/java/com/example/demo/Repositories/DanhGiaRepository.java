package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.DanhGia;

public interface DanhGiaRepository extends JpaRepository<DanhGia, Long> {
    List<DanhGia> findByKhachSan_MaKhachSan(String maKhachSan);
}
