package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entities.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon,Long>{
    @Query("SELECT h FROM HoaDon h WHERE h.nguoiDung.maNguoiDung=:maNguoiDung AND h.phong.maPhong=:maPhong")
    Optional<HoaDon> findByMaNguoiDungAndMaPhong(@Param("maNguoiDung") String maNguoiDung, @Param("maPhong")String maPhong);
}
