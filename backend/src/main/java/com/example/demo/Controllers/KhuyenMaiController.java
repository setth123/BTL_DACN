package com.example.demo.Controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.Services.KhuyenMaiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.KhuyenMaiDTO;
import com.example.demo.Entities.KhuyenMai;
import com.example.demo.Repositories.KhuyenMaiRepository;

@RestController
@RequestMapping("/api/khuyen-mai")
@Slf4j
@RequiredArgsConstructor
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiRepository kmr;

    @Autowired
    private  KhuyenMaiService khuyenMaiService ;
    
    //get all khuyen mai
    @GetMapping("/")
    public ResponseEntity<List<KhuyenMai>> getKhuyenMais(){
        try{
            List<KhuyenMai> kms=kmr.findAll();
            if(kms.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            else return ResponseEntity.status(HttpStatus.OK).body(kms);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //get top 4 khuyen mai
    @GetMapping("/userHome")
    public ResponseEntity<List<KhuyenMaiDTO>> get4KhuyenMais(){
        try{
            List <Object[]> result=kmr.findLatestKM();
            List<KhuyenMaiDTO> kms = result.stream().map(obj->{
                KhuyenMaiDTO dto=new KhuyenMaiDTO();
                dto.setMaKhuyenMai((String) obj[0]);
                dto.setNgayBD(((Date) obj[1]).toLocalDate());
                dto.setNgayKT(((Date) obj[2]).toLocalDate());
                return dto;
            }).collect(Collectors.toList());

            if(kms.isEmpty())return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            else return ResponseEntity.status(HttpStatus.OK).body(kms);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // API thêm khuyến mãi
    @PostMapping("/addKM")
    public ResponseEntity<KhuyenMaiDTO> addKhuyenMai(@RequestBody KhuyenMaiDTO khuyenMaiDTO) {
        try
        {
            log.info("Request thêm thông tin khuyến mãi !!! ");
            khuyenMaiService.themKhuyenMai(khuyenMaiDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e)
        {
            log.error("--->>> Không thể thêm được thông tin khuyến mãi vì : {}" , e.getMessage() , e.getCause());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //API xóa khuyến mãi
    @DeleteMapping("/{maKhuyenMai}")
    public ResponseEntity<KhuyenMaiDTO> xoaKhuyenMai(@PathVariable String maKhuyenMai) {
        try {
            log.info("Request xóa thông tin khuyến mãi !!! ");
            khuyenMaiService.xoaKhuyenMai(maKhuyenMai);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e) {
            log.info("--->>> Không thể xóa được thông tin khuyến mãi vì : {}" , e.getMessage() , e.getCause());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //API sửa khuyến mãi
    @PutMapping("/{maKhuyenMai}")
    public ResponseEntity<KhuyenMaiDTO> xoaKhuyenMai(@PathVariable String maKhuyenMai , @RequestBody KhuyenMaiDTO khuyenMaiDTO) {
        try {
            log.info("Request sửa thông tin khuyến mãi !!! ");
            khuyenMaiService.suaKhuyenMai(maKhuyenMai , khuyenMaiDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch (Exception e) {
            log.info("--->>> Không thể sửa được thông tin khuyến mãi vì : {}" , e.getMessage() , e.getCause());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/userKM")
    public ResponseEntity<List<KhuyenMai>> getUserKM(){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(kmr.findAllByNgayKTLessThanEqualOrderByNgayBDDesc(LocalDate.now()));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
