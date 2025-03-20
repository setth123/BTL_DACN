package com.example.demo.Repositories;

import java.util.List;

import com.example.demo.DTO.KhachSanChiTietDTO;
import com.example.demo.DTO.PhongDTO;
import com.example.demo.Entities.Phong;
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

    // query tìm khách sạn có id
    @Query(value = "SELECT ks.maKhachSan AS maKhachSan, ks.tenKhachSan AS tenKhachSan, ks.hinhAnh AS hinhAnh, ks.diemSoTB AS diemSoTB FROM KhachSan ks WHERE ks.maKhachSan = :maKhachSan", nativeQuery = true)
    KhachSanChiTietDTO findKhachSanById(@Param("maKhachSan") String maKhachSan);

    // query tìm phòng của khách sạn có id cần tìm
    @Query(value = "SELECT p.maPhong AS maPhong, p.loaiPhong AS loaiPhong, p.hinhAnh AS hinhAnh, p.soNguoi AS soNguoi, p.dienTich AS dienTich, p.tienIch AS tienIch, p.giaPhong AS giaPhong, p.soPhongTrong AS soPhongTrong, p.maKhachSan AS maKhachSan FROM Phong p WHERE p.maKhachSan = :maKhachSan", nativeQuery = true)
    List<PhongDTO> findPhongsByKhachSan(@Param("maKhachSan") String maKhachSan);

}
