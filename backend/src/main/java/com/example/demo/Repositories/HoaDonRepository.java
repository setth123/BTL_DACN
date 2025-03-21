package com.example.demo.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entities.HoaDon;

public interface HoaDonRepository extends JpaRepository<HoaDon,Integer>{
    @Query("SELECT h FROM HoaDon h WHERE h.nguoiDung.maNguoiDung=:maNguoiDung AND h.phong.maPhong=:maPhong")
    Optional<HoaDon> findByMaNguoiDungAndMaPhong(@Param("maNguoiDung") String maNguoiDung, @Param("maPhong")String maPhong);
    Optional<HoaDon> findByHoaDonID(Integer hoaDonID);
    @Query(value="""
            SELECT DISTINCT p.maPhong, p.loaiPhong, p.hinhAnh, p.soNguoi, p.dienTich, p.tienIch,
            hd.ngayNhanPhong, hd.ngayTraPhong,hd.tongChiPhi,hd.maNguoiDung,hd.hoaDonID,
            CASE 
            WHEN EXISTS (SELECT 1 FROM ApDungKhuyenMai akm WHERE akm.hoaDonID = hd.hoaDonID) 
            THEN 1 ELSE 0 END AS khuyenMaiState
            FROM Phong p
            JOIN HoaDon hd ON p.maPhong=hd.maPhong
            WHERE hd.maNguoiDung =:maNguoiDung
            """,nativeQuery = true)
    List<Object[]> findHDKMStatus(@Param("maNguoiDung") String maNguoiDung);
}
