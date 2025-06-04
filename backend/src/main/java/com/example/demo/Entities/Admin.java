package com.example.demo.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "adminname")
    private String adminName;
    private String password;
    private String role = "ADMIN";

}
