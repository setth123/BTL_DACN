package com.example.demo.Repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.KhachSanChiTietDTO;
import com.example.demo.DTO.PhongDTO;
import com.example.demo.Entities.KhachSan;

@Repository
public interface KhachSanRepository extends JpaRepository<KhachSan,String> , CrudRepository<KhachSan, String> {
    @Query(value="SELECT maKhachSan, hinhAnh,tenKhachSan, diemSoTB FROM KhachSan ks ORDER BY diemSoTB DESC LIMIT 4",nativeQuery=true)
    List<Object[]> findHighestRateKS();

    // query tìm khách sạn có id
    @Query(value = "SELECT ks.maKhachSan AS maKhachSan, ks.tenKhachSan AS tenKhachSan, ks.hinhAnh AS hinhAnh, ks.diemSoTB AS diemSoTB FROM KhachSan ks WHERE ks.maKhachSan = :maKhachSan", nativeQuery = true)
    KhachSanChiTietDTO findKhachSanById(@Param("maKhachSan") String maKhachSan);

    @Query("SELECT new com.example.demo.DTO.KhachSanChiTietDTO(ks.maKhachSan, ks.tenKhachSan, ks.hinhAnh, ks.diemSoTB, ks.diaChiCT, ks.tienIch , ks.thongTinGT) " +
            "FROM KhachSan ks WHERE ks.maKhachSan = :maKhachSan")
    KhachSanChiTietDTO findKhachSanById1(@Param("maKhachSan") String maKhachSan);

    // query tìm phòng của khách sạn có id cần tìm
    @Query(value = "SELECT p.maPhong AS maPhong, p.loaiPhong AS loaiPhong, p.hinhAnh AS hinhAnh, p.soNguoi AS soNguoi, p.dienTich AS dienTich, p.tienIch AS tienIch, p.giaPhong AS giaPhong, p.soPhongTrong AS soPhongTrong, p.maKhachSan AS maKhachSan FROM Phong p WHERE p.maKhachSan = :maKhachSan", nativeQuery = true)
    List<PhongDTO> findPhongsByKhachSan(@Param("maKhachSan") String maKhachSan);

    @Query(value = """
    SELECT ks.maKhachSan, ks.tenKhachSan, ks.hinhAnh, ks.diemSoTB, ks.diaChiCT, ks.tienIch, ks.thongTinGT, p.maPhong
    FROM KhachSan ks
    JOIN Phong p ON ks.maKhachSan = p.maKhachSan
    WHERE ks.diaChiCT LIKE CONCAT('%', :diaChi, '%')
    AND p.soNguoi >= :soNguoi
    AND (
        SELECT COUNT(hd.hoaDonID)
        FROM HoaDon hd
        WHERE hd.maPhong = p.maPhong
        AND (
            (:ngayNhanPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
            (:ngayTraPhong BETWEEN hd.ngayNhanPhong AND hd.ngayTraPhong) OR
            (hd.ngayNhanPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong) OR
            (hd.ngayTraPhong BETWEEN :ngayNhanPhong AND :ngayTraPhong)
        )
    ) < p.soPhongTrong
    """, nativeQuery = true)

    List<Object[]> findAvailableHotelsWithRooms(@Param("diaChi") String diaChi, 
    @Param("soNguoi") int soNguoi, @Param("ngayNhanPhong") LocalDate ngayNhanPhong, 
    @Param("ngayTraPhong") LocalDate ngayTraPhong);
}
