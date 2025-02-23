package com.example.demo.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.HoaDon;
import com.example.demo.Entities.Phong;
import com.example.demo.Entities.KhuyenMai;
import com.example.demo.Entities.NguoiDung;
import com.example.demo.Entities.ApDungKhuyenMai;
import com.example.demo.Repositories.PhongRepository;
import com.example.demo.Repositories.HoaDonRepository;
import com.example.demo.Repositories.ApDungKhuyenMaiRepository;
import com.example.demo.Repositories.KhuyenMaiRepository;
import com.example.demo.Repositories.NguoiDungRepository;

@Service
public class HoaDonService {
    @Autowired
    PhongRepository pr;
    @Autowired
    KhuyenMaiRepository kr;
    @Autowired
    ApDungKhuyenMaiRepository kmhdr;
    @Autowired
    HoaDonRepository hdr;
    @Autowired 
    NguoiDungRepository ndr;
    public ResponseEntity<HoaDon> taoHD(HoaDonDTO hoaDonDTO){
        try{
            HoaDon hd=new HoaDon();
            hd.setNgayNhanPhong(hoaDonDTO.getNgayNhanPhong());
            hd.setNgayTraPhong(hoaDonDTO.getNgayTraPhong());
            hd.setHoTenKH(hoaDonDTO.getHoTenKH());
            Phong p=pr.findById(hoaDonDTO.getMaPhong()).orElseThrow();
            hd.setChiPhiDuTinh(p.getGiaPhong().multiply(BigDecimal.valueOf(ChronoUnit.DAYS.between(hd.getNgayNhanPhong(),hd.getNgayTraPhong()))));
    
            KhuyenMai km=kr.findById(hoaDonDTO.getMaKhuyenMai()).orElse(null);
            if(km!=null){
                Boolean dk1=true;
                Boolean dk2=true;
                Boolean dk3=true;
                if(LocalDate.now().isBefore(km.getNgayBD())||LocalDate.now().isAfter(km.getNgayKT())){
                    dk1=false;
                }
                if(hd.getChiPhiDuTinh().compareTo(km.getGiaoDichToiThieu())<0){
                    dk2=false;
                }
                
                ApDungKhuyenMai kmhd_o=kmhdr.findByMaNguoiDung(hoaDonDTO.getMaNguoiDung()).orElse(null);
                if(kmhd_o!=null)dk3=false;
                if(dk1 && dk2 && dk3){
                     BigDecimal discount = hd.getChiPhiDuTinh()
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP) // Chia 100 với 2 chữ số thập phân
                    .multiply(km.getMucKhuyenMai());
                    hd.setTongChiPhi(hd.getChiPhiDuTinh().subtract(discount));
                }
                
                ApDungKhuyenMai kmhd=new ApDungKhuyenMai();
                NguoiDung nd=ndr.findById(hoaDonDTO.getMaNguoiDung()).orElse(null);
                kmhd.setNguoiDung(nd);
                kmhd.setKhuyenMai(km);
                kmhdr.save(kmhd);
    
            }
            return ResponseEntity.status(HttpStatus.OK).body(hd);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //huy phong
    public ResponseEntity<String> huyPhong(String maNguoiDung,String maPhong){
        try{
            HoaDon hd=hdr.findByMaNguoiDungAndMaPhong(maNguoiDung, maPhong).orElse(null);
            if(hd.getNgayNhanPhong().isBefore(LocalDate.now().plusDays(7))){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khong the huy dat phong");
            }
            ApDungKhuyenMai kmhd=kmhdr.findByMaNguoiDung(maNguoiDung).orElse(null);
            if(kmhd!=null){
                kmhdr.delete(kmhd);
            }
            hdr.delete(hd);
            return ResponseEntity.status(HttpStatus.OK).body("Xoa thanh cong");
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
