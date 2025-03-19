package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.KhachSan;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface KhachSanRepository extends JpaRepository<KhachSan,String>{
    @Query(value="SELECT maKhachSan, hinhAnh,tenKhachSan, diemSoTB FROM KhachSan ks ORDER BY diemSoTB DESC LIMIT 4",nativeQuery=true)
    List<Object[]> findHighestRateKS();

//    @Query(value="SELECT ks.maKhachSan , ks.tenKhachSan , ks.hinhAnh , ks.diemSoTB FROM KhachSan ks WHERE ks.maKhachSan =:maKhachSan",nativeQuery=true)
//    KhachSan watchDetailKS( @Param("maKhachSan") String maKhachSan);
}
