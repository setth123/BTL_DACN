package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.NguoiDung;

public interface NguoiDungRepository extends JpaRepository<NguoiDung,String>{
    
}
