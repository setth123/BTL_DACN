package com.example.demo.Repositories;

import com.example.demo.Entities.Phong;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PhongRepository extends JpaRepository<Phong,String>{
    @Query(value="SELEECT DISTINCT p.maPhong, p.loaiPhong,p.hinhAnh, p.soNguoi, p.dienTich,p.tienIch,p.giaPhong FROM PHONG"+
                "JOIN HoaDon h ON p.maPhong = h.maPhong"+
                "WHERE h.maNguoiDung=:maNguoiDung"+
                "AND h.ngayNhanPhong>=CURRENT_DATE",
            nativeQuery=true)
    List<Object[]>findAllPhongByND(@Param("maNguoiDung") String maNguoiDung);
}
