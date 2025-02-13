package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.HoaDon;

@RestController
@RequestMapping("/api/hoa-don")
public class HoaDonController {
    //datphong
    @PostMapping("/")
    public HoaDon createHoaDon(@RequestBody HoaDonDTO hoaDonDTO){
        
    }
    //huyphong
}
