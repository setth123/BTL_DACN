package com.example.demo.Repositories;

import com.example.demo.Entities.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TimKiemDSPhongRepository extends JpaRepository<Phong, String> {

}
