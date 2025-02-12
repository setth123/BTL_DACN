package com.example.demo.Repositories;

import com.example.demo.Entities.KhuyenMai;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,String>{
    
}
