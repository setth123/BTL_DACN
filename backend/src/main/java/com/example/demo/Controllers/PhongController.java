package com.example.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Phong;
import com.example.demo.DTO.PhongDTO;
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
        try{
            List<Phong> ps=pr.findAll();
            if(ps.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            return ResponseEntity.status(HttpStatus.OK).body(ps);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
    //get on makhachsan
    @GetMapping("/{maKhachSan}")
    public ResponseEntity<List<Phong>> getKSPhongs(@PathVariable String maKhachSan){
        try{
            List<Phong> ps=pr.findAllByMaKhachSan(maKhachSan);
            if(ps.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            return ResponseEntity.status(HttpStatus.OK).body(ps);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
    //delete    
    @DeleteMapping("/{maPhong}")
    public ResponseEntity<String> deletePhong(@PathVariable String maPhong){
        try{
            if(!pr.existsById(maPhong)){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy phòng cần xoá");
            }
            pr.deleteById(maPhong);
            return ResponseEntity.status(HttpStatus.OK).body("Xoá thành công");
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //add
    @PostMapping("/")
    public ResponseEntity<Phong>addPhong(@RequestBody PhongDTO phongDTO){
        try{
            Phong p=ps.addPhong(phongDTO);
            return ResponseEntity.status(HttpStatus.OK).body(p);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //update
    @PatchMapping("/{maPhong}")
    public ResponseEntity<Phong>updatePhong(@PathVariable String maPhong,@RequestBody PhongDTO phongDTO){
        try{
            Phong p=ps.updatePhong(maPhong,phongDTO);
            return ResponseEntity.status(HttpStatus.OK).body(p);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //huyPhong 
    @GetMapping("/userHuy/{maNguoiDung}")
    public ResponseEntity<List<PhongDTO>> getUserHuy(@PathVariable String maNguoiDung){
        try{
            List<Object[]> result=pr.findAllPhongByND(maNguoiDung);
            List<PhongDTO> ps=result.stream().map(obj->{
                PhongDTO dto=new PhongDTO();
                dto.setMaPhong((String)obj[0]);
                dto.setLoaiPhong((String)obj[1]);
                dto.setHinhAnh((String )obj[2]);
                dto.setSoNguoi((int)obj[3]);
                dto.setDienTich((BigDecimal) obj[4]);
                dto.setTienIch((String)obj[5]);
                dto.setGiaPhong((BigDecimal) obj[6]);
                return dto;
            }).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(ps);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
