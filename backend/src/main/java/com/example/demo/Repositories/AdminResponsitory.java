package com.example.demo.Repositories;

import com.example.demo.Entities.Admin;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminResponsitory extends JpaRepository<Admin,Long> {
    Optional<Admin> findByAdminName(String name);
}
