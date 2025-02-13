package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entities.ApDungKhuyenMai;

public interface ApDungKhuyenMaiRepository extends JpaRepository<ApDungKhuyenMai,Long>{
    @Query("SELECT a FROM ApDungKhuyenMai a WHERE a.nguoiDung.maNguoiDung=:maNguoiDung")
    Optional<ApDungKhuyenMai> findByMaNguoiDung(@Param("maNguoiDung") String maNguoiDung);
}
