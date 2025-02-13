package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon,Long>{
    Optional<HoaDon> findByMaNguoiDungAndMaPhong(String maNguoiDung,String maPhong);
}
