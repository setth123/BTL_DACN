package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entities.ApDungKhuyenMai;

public interface ApDungKhuyenMaiRepository extends JpaRepository<ApDungKhuyenMai,Integer>{
    @Query("""
        SELECT 
        CASE 
            WHEN COUNT(a) > 0 THEN 1 
            ELSE 0 
        END 
        FROM ApDungKhuyenMai a 
        JOIN a.hoaDon h 
        WHERE h.nguoiDung.maNguoiDung = :maNguoiDung 
        AND a.khuyenMai.maKhuyenMai = :maKhuyenMai
            """)
    Integer existsByNguoiDungAndKhuyenMai(@Param("maNguoiDung") String maNguoiDung, @Param("maKhuyenMai") String maKhuyenMai);
    Optional<ApDungKhuyenMai> findByHoaDon_hoaDonID(Integer hoaDonID);
}
