package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.PhongDTO;
import com.example.demo.Entities.Phong;
import com.example.demo.Repositories.PhongRepository;
import com.example.demo.Services.PhongService;

@RestController
@RequestMapping("api/phong")
public class PhongController {
    @Autowired
    PhongRepository pr;
    @Autowired 
    PhongService ps;
    //get all
    @GetMapping("/")
    public ResponseEntity<List<Phong>> getPhongs(){
        List<Phong> ps=pr.findAll();
        if(ps.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.status(HttpStatus.OK).body(ps);
    } 
    //delete    
    @DeleteMapping("/{maPhong}")
    public ResponseEntity<List<Phong>> deletePhong(@PathVariable String maPhong){
        if(!pr.existsById(maPhong)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(pr.findAll());
        }
        pr.deleteById(maPhong);
        return ResponseEntity.status(HttpStatus.OK).body(pr.findAll());
    }
    //add
    @PostMapping("/")
    public ResponseEntity<List<Phong>>addPhong(@RequestBody PhongDTO phongDTO){
        ps.addPhong(phongDTO);
        return ResponseEntity.status(HttpStatus.OK).body(pr.findAll());
    }
    //update
    @PatchMapping("/")
    public ResponseEntity<List<Phong>>updatePhong(@RequestParam String maPhong,@RequestBody PhongDTO phongDTO){
        ps.updatePhong(maPhong,phongDTO);
        return ResponseEntity.status(HttpStatus.OK).body(pr.findAll());
    }

}
