package com.example.demo.Repositories;

import com.example.demo.Entities.Phong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;

@Repository
public interface TimKiemDSPhongRepository extends JpaRepository<Phong, String> {

}
