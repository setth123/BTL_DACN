package com.example.demo.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.ApDungKhuyenMai;
import com.example.demo.Entities.HoaDon;
import com.example.demo.Entities.KhuyenMai;
import com.example.demo.Entities.Phong;
import com.example.demo.Repositories.ApDungKhuyenMaiRepository;
import com.example.demo.Repositories.HoaDonRepository;
import com.example.demo.Repositories.KhuyenMaiRepository;
import com.example.demo.Repositories.NguoiDungRepository;
import com.example.demo.Repositories.PhongRepository;

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

    public Boolean isEmptyRoom(String maPhong,LocalDate ngayNhanPhong ,LocalDate ngayTraPhong){
        return pr.isEmptyRoom(maPhong, ngayNhanPhong, ngayTraPhong).equals(1);
    }

    public ResponseEntity<HoaDon> taoHD(HoaDonDTO hoaDonDTO){
        try{
            if(!isEmptyRoom(hoaDonDTO.getMaPhong(), hoaDonDTO.getNgayNhanPhong(), hoaDonDTO.getNgayTraPhong())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            HoaDon hd=new HoaDon();
            hd.setNgayNhanPhong(hoaDonDTO.getNgayNhanPhong());
            hd.setNgayTraPhong(hoaDonDTO.getNgayTraPhong());
            hd.setHoTenKH(hoaDonDTO.getHoTenKH());
            hd.setNguoiDung(ndr.findById(hoaDonDTO.getMaNguoiDung()).orElse(null));
            hd.setPhong(pr.findById(hoaDonDTO.getMaPhong()).orElse(null));
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
                
                Integer isUsed=kmhdr.existsByNguoiDungAndKhuyenMai(hoaDonDTO.getMaNguoiDung(),hoaDonDTO.getMaKhuyenMai());
                if(Objects.equals(isUsed, 1))dk3=false;
                BigDecimal discount = BigDecimal.ZERO;
                if (dk1 && dk2 && dk3) {
                    discount = hd.getChiPhiDuTinh().multiply(km.getMucKhuyenMai()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                }
                System.out.println(discount);
                hd.setTongChiPhi(hd.getChiPhiDuTinh().subtract(discount));
                
                hdr.save(hd);
                ApDungKhuyenMai kmhd=new ApDungKhuyenMai();
                kmhd.setHoaDon(hd);
                kmhd.setKhuyenMai(km);
                kmhdr.save(kmhd);
                p.setSoPhongTrong(p.getSoPhongTrong()-1);
                pr.save(p);
            }
            return ResponseEntity.status(HttpStatus.OK).body(hd);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //huy phong
    public ResponseEntity<String> huyPhong(Integer maHoaDon,String maPhong){
        try{
            HoaDon hd=hdr.findByHoaDonID(maHoaDon).orElse(null);
            Phong p=pr.findById(maPhong).orElseThrow();
            if(hd.getNgayNhanPhong().isBefore(LocalDate.now().plusDays(7))){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khong the huy dat phong");
            }
            ApDungKhuyenMai kmhd=kmhdr.findByHoaDon_hoaDonID(maHoaDon).orElse(null);
            if(kmhd!=null){
                kmhdr.delete(kmhd);
            }
            hdr.delete(hd);
            p.setSoPhongTrong(p.getSoPhongTrong()+1);
            pr.save(p);
            return ResponseEntity.status(HttpStatus.OK).body("Xoa thanh cong");
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
