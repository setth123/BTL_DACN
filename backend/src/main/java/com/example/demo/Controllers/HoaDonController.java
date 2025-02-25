package com.example.demo.Controllers;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.HoaDon;
import com.example.demo.Repositories.HoaDonRepository;
import com.example.demo.Services.HoaDonService;

@RestController
@RequestMapping("/api/hoa-don")
public class HoaDonController {
    @Autowired
    HoaDonService hds;
    @Autowired
    HoaDonRepository hdr;
    //get all
    @GetMapping("/{maNguoiDung}")
    public ResponseEntity<List<HoaDonDTO>> getAllHD(@PathVariable String maNguoiDung){
        try{
            List<Object[]> result=hdr.findHDKMStatus(maNguoiDung);
            List<HoaDonDTO> hd=result.stream().map(obj->{
                HoaDonDTO dto=new HoaDonDTO();
                dto.setMaPhong((String) obj[0]);
                dto.setLoaiPhong((String) obj[1]);
                dto.setSoNguoi((Integer) obj[2]);
                dto.setSoNguoi((Integer) obj[3]);
                dto.setDienTich((BigDecimal) obj[4]);
                dto.setTienIch((String) obj[5]);
                dto.setNgayNhanPhong(((Date) obj[6]).toLocalDate());
                dto.setNgayTraPhong(((Date) obj[7]).toLocalDate());
                dto.setTongChiPhi((BigDecimal) obj[8]);
                dto.setKhuyenMaiState((Boolean) obj[9]);
                return dto;
            }).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(hd);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
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
