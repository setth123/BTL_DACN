package com.example.demo.Repositories;

import com.example.demo.Entities.KhuyenMai;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,String>{
    @Query("SELECT k.maKhuyenMai, k.ngayBD,k.ngayKT FROM KhuyenMai k ORDER BY k.ngayBD DESC LIMIT 4")
    List<Object[]> findLatestKm();

}
