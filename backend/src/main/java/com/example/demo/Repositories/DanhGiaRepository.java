package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.DanhGia;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
    List<DanhGia> findByKhachSan_MaKhachSan(String maKhachSan);
}
