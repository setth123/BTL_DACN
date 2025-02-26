package com.example.demo.Repositories;

import com.example.demo.Entities.KhuyenMai;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, String> {
    @Query(value="SELECT maKhuyenMai,ngayBD, ngayKT FROM KhuyenMai WHERE NgayKT>=CURRENT_DATE ORDER BY ngayBD DESC LIMIT 4",nativeQuery = true)
    List<Object[]> findLatestKM();
    List<KhuyenMai> findAllByNgayKTLessThanEqualOrderByNgayBDDesc(LocalDate date);

}

