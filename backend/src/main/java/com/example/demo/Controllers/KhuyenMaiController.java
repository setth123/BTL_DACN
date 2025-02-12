package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.KhuyenMai;
import com.example.demo.Repositories.KhuyenMaiRepository;

@RestController
@RequestMapping("/api/khuyen-mai")

public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiRepository kmr;
    
    //get all khuyen mai
    @GetMapping("/")
    public ResponseEntity<List<KhuyenMai>> getKhuyenMais(){
        List<KhuyenMai> kms=kmr.findAll();
        if(kms.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        else return ResponseEntity.status(HttpStatus.OK).body(kms);
    }
}
