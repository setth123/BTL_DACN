package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.HoaDon;
import com.example.demo.Services.HoaDonService;

@RestController
@RequestMapping("/api/hoa-don")
public class HoaDonController {
    @Autowired
    HoaDonService hds;
    //datphong
    @PostMapping("/")
    public ResponseEntity<HoaDon> createHoaDon(@RequestBody HoaDonDTO hoaDonDTO){
        try{
            return hds.taoHD(hoaDonDTO);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //huyphong
    @DeleteMapping("/{maNguoiDung}/{maPhong}")
    public ResponseEntity<String> deleteHoaDon(@PathVariable String maNguoiDung,@PathVariable String maPhong){
        try{
            return hds.huyPhong(maNguoiDung,maPhong);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
