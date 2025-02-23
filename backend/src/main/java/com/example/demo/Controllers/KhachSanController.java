package com.example.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.KhachSanDTO;
import com.example.demo.Repositories.KhachSanRepository;

@RestController
@RequestMapping("/api/khach-san")
public class KhachSanController {
    @Autowired
    KhachSanRepository ksr;
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
}
