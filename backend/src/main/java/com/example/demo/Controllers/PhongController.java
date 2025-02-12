package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Phong;
import com.example.demo.Repositories.PhongRepository;

@RestController
@RequestMapping("api/phong")
public class PhongController {
    @Autowired
    PhongRepository pr;

    //get all
    @GetMapping("/")
    public ResponseEntity<List<Phong>> getPhongs(){
        List<Phong> ps=pr.findAll();
        if(ps.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.status(HttpStatus.OK).body(ps);
    } 
    //delete    
    @DeleteMapping("/{maPhong}")
    public ResponseEntity<String> deletePhong(@PathVariable String maPhong){
        if(!pr.existsById(maPhong)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy phòng");
        }
        pr.deleteById(maPhong);
        return ResponseEntity.status(HttpStatus.OK).body("Xoá thành công");
    }
}
