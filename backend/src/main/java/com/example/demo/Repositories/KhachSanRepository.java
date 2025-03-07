package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.KhachSan;
import java.util.List;

@Repository
public interface KhachSanRepository extends JpaRepository<KhachSan,String>{
    @Query(value="SELECT maKhachSan, hinhAnh,tenKhachSan, diemSoTB FROM KhachSan ks ORDER BY diemSoTB DESC LIMIT 4",nativeQuery=true)
    List<Object[]> findHighestRateKS();
}
