package com.example.demo.Repositories;

import com.example.demo.Entities.Phong;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PhongRepository extends JpaRepository<Phong,String>{
    List<Phong> findAllByKhachSan_maKhachSan(String maKhachSan);
    @Query("""
            SELECT COALESCE((
            SELECT COALESCE(CASE WHEN (p.soPhongTrong-COUNT(hd))> 0 THEN 1 ELSE 0 END,1)
            FROM Phong p LEFT JOIN HoaDon hd ON p=hd.phong WHERE p.maPhong=:maPhong
            AND (
                (:ngayNhanPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
                (:ngayTraPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
                (hd.ngayNhanPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong) OR
                (hd.ngayTraPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong)
            )
            GROUP BY p.maPhong,p.soPhongTrong),1)
            """)
    Integer isEmptyRoom(@Param("maPhong") String maPhong,@Param("ngayNhanPhong") LocalDate ngayNhanPhong,@Param("ngayTraPhong") LocalDate ngayTraPhong);
}
