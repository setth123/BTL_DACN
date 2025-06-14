package com.example.demo.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entities.NguoiDung;

public interface NguoiDungRepository extends JpaRepository<NguoiDung,String>{
    @Query(value="SELECT maNguoiDung, tenDangNhap,email,soDienThoai from NguoiDung" ,nativeQuery=true)
    public List<Object[]> getAllND();

    @Query("SELECT nd FROM NguoiDung nd WHERE nd.email = :email OR nd.tenDangNhap = :tenDangNhap")
    Optional<NguoiDung> findNguoiDungByEmailOrTenDangNhap(String email, String tenDangNhap);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM nguoidung WHERE email = :email OR tendangnhap = :tenDangNhap)", nativeQuery = true)
    boolean existsNguoiDungByEmailOOrTenDangNhap(String email, String tenDangNhap);

    public Optional<NguoiDung> findById(String maNguoiDung);
}
