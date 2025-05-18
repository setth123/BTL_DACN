package com.example.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.demo.DTO.KhachSanChiTietDTO;
import com.example.demo.Services.KhachSanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.KhachSanDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Services.QLKhachSanService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/khach-san")
public class KhachSanController {
    @Autowired
    KhachSanRepository ksr;

    private final KhachSanService khachSanService ;

    @Autowired
    QLKhachSanService qlks;
    @GetMapping()
    public ResponseEntity<List<KhachSan>> getAll(){
        try{
            List<KhachSan> ks=ksr.findAll();
            if(ks.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            else return ResponseEntity.status(HttpStatus.OK).body(ks);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{maKhachSan}")
    public ResponseEntity<KhachSan> getByID(@PathVariable String maKhachSan) {
        try {
            Optional<KhachSan> ks = qlks.getByMaKhachSan(maKhachSan);
            if (ks.isPresent()) {
                return new ResponseEntity<>(ks.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(ks.get(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<KhachSan> themKhachSan(@RequestBody KhachSanDTO khachsan) {
        try {
            KhachSan ks = qlks.themKhachSan(khachsan);
            if(ks != null){
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/{maKhachSan}")
    public ResponseEntity<KhachSan> suaKhachSan(@PathVariable String maKhachSan, @RequestBody KhachSanDTO khachsan){
        try {
            KhachSan ks = qlks.suaKhachSan(maKhachSan, khachsan);
            if(ks != null){
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{maKhachSan}")
    public ResponseEntity<KhachSan> xoaKhachSan(@PathVariable String maKhachSan){
        try {
            qlks.xoaKhachSan(maKhachSan);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get most rated hotel
    @GetMapping("/most-rated")
    public ResponseEntity<List<KhachSanDTO>> getTopRated(){
        try{
            List<Object[]> result=ksr.findHighestRateKS();
            List <KhachSanDTO> ks=result.stream().map(obj->{
                KhachSanDTO dto=new KhachSanDTO();
                dto.setMaKhachSan((String) obj[0]);
                dto.setHinhAnh((String) obj[1]);
                dto.setTenKhachSan((String) obj[2]);
                dto.setDiemSoTB((BigDecimal) obj[3]);
                return dto;
            }).collect(Collectors.toList());
            if(ks.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            else return ResponseEntity.status(HttpStatus.OK).body(ks);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get Detail Hotel + Room
    @GetMapping("/detail-Hotel/{maKhachSan}")
    public ResponseEntity<KhachSanChiTietDTO> getDetailKS(@PathVariable String maKhachSan){
        try {
            log.info("Request xem chi tiết khách sạn !!! ");
            KhachSanChiTietDTO ksDetail = khachSanService.xemChiTietKS(maKhachSan);
            return ResponseEntity.status(HttpStatus.OK).body(ksDetail);
        } catch (Exception e) {
            log.error("--->>> XEM CHI TIẾT KHÁCH SẠN KHÔNG THÀNH CÔNG VÌ : {}" , e.getMessage() , e.getCause());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
