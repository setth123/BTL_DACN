package com.example.demo.Repositories;

import com.example.demo.Entities.Phong;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PhongRepository extends JpaRepository<Phong,String>{
    
}
