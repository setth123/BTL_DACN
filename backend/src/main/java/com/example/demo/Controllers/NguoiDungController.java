package com.example.demo.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.NguoiDungDTO;
import com.example.demo.Repositories.NguoiDungRepository;

@RestController
@RequestMapping("/api/nguoi-dung")
public class NguoiDungController {
    @Autowired
    NguoiDungRepository ndr;
    @GetMapping("/")
    public ResponseEntity<List<NguoiDungDTO>> getALLND(){
        try{
            List<Object[]> result=ndr.getAllND();
            List<NguoiDungDTO> nds=result.stream().map(obj->{
                NguoiDungDTO dto=new NguoiDungDTO();
                dto.setMaNguoiDung((String) obj[0]);
                dto.setTenDangNhap((String) obj[1]);
                dto.setEmail((String) obj[2]);
                dto.setSoDienThoai((String) obj[3]);
                return dto;
            }).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(nds);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
