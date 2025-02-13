package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.KhuyenMaiHoaDon;

public interface KhuyenMaiHoaDonRepository extends JpaRepository<KhuyenMaiHoaDon,Long>{
    Optional<KhuyenMaiHoaDon> findByHoaDonID(long hoaDonID);
}
