package com.example.demo.Repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Phong;

@Repository
public interface PhongRepository extends JpaRepository<Phong,String>{
    List<Phong> findAllByKhachSan_maKhachSan(String maKhachSan);

    @Query("""
            SELECT CASE WHEN (
  SELECT COUNT(*)
  FROM HoaDon hd
  WHERE hd.phong.maPhong = :maPhong
  AND (
    (:ngayNhanPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
    (:ngayTraPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
    (hd.ngayNhanPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong) OR
    (hd.ngayTraPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong)
  )
) < (
  SELECT p.soPhongTrong
  FROM Phong p
  WHERE p.maPhong = :maPhong
)
THEN 1 ELSE 0 END
            """)
    Integer isEmptyRoom(@Param("maPhong") String maPhong,@Param("ngayNhanPhong") LocalDate ngayNhanPhong,@Param("ngayTraPhong") LocalDate ngayTraPhong);
    List<Phong> findByMaPhongIn(List<String> ids);
}
