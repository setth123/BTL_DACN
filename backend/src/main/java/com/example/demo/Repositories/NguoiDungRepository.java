package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entities.NguoiDung;

public interface NguoiDungRepository extends JpaRepository<NguoiDung,String>{
    @Query(value="SELECT maNguoiDung, tenDangNhap,email,soDienThoai from NguoiDung" ,nativeQuery=true)
    public List<Object[]> getAllND();
}
