package com.example.demo.Services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.DTO.HoaDonDTO;
import com.example.demo.Entities.ApDungKhuyenMai;
import com.example.demo.Entities.HoaDon;
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

    @PostMapping("/hoa-don")
    public ResponseEntity<?> taoHD(@RequestBody HoaDonDTO hoaDonDTO) {
        try {
            // Validate dữ liệu
            if (hoaDonDTO.getHoTenKH() == null || !hoaDonDTO.getHoTenKH().matches("^[\\p{L} .'-]+$")) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Họ tên không hợp lệ"));
            }
            if (hoaDonDTO.getEmail() == null || !hoaDonDTO.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Email không hợp lệ"));
            }
            if (hoaDonDTO.getSoDienThoai() == null || !hoaDonDTO.getSoDienThoai().matches("^0\\d{9}$")) {
                hoaDonDTO.setSoDienThoai("0123456789");
            }
            
            // Kiểm tra phòng
            Phong phong = pr.findById(hoaDonDTO.getMaPhong())
                           .orElse(null);
            if (phong == null) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Phòng không tồn tại"));
            }
            
            // Kiểm tra ngày
            if (hoaDonDTO.getNgayNhanPhong() == null || hoaDonDTO.getNgayTraPhong() == null ||
                hoaDonDTO.getNgayNhanPhong().isAfter(hoaDonDTO.getNgayTraPhong()) ||
                hoaDonDTO.getNgayNhanPhong().isBefore(LocalDate.now())) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Ngày nhận/trả phòng không hợp lệ"));
            }
            
            // Kiểm tra phòng trống
            if (!isEmptyRoom(hoaDonDTO.getMaPhong(), hoaDonDTO.getNgayNhanPhong(), hoaDonDTO.getNgayTraPhong())) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Phòng đã được đặt trong khoảng thời gian này"));
            }
            
            // Tạo hóa đơn
            HoaDon hd = new HoaDon();
            hd.setNgayNhanPhong(hoaDonDTO.getNgayNhanPhong());
            hd.setNgayTraPhong(hoaDonDTO.getNgayTraPhong());
            hd.setHoTenKH(hoaDonDTO.getHoTenKH());
            hd.setNguoiDung(ndr.findById("NDa1b2C3d4E5f6G7").orElse(null));
            hd.setPhong(phong);
            
            // Tính toán chi phí
            long soNgay = ChronoUnit.DAYS.between(hd.getNgayNhanPhong(), hd.getNgayTraPhong());
            hd.setChiPhiDuTinh(phong.getGiaPhong().multiply(BigDecimal.valueOf(soNgay)));
            hd.setTongChiPhi(hd.getChiPhiDuTinh()); // Giả sử chưa có giảm giá
            
            // Lưu dữ liệu
            hdr.save(hd);
            return ResponseEntity.status(HttpStatus.CREATED).body(hd);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", "Lỗi hệ thống khi tạo hóa đơn: " + e.getMessage()));
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
            pr.save(p);
            return ResponseEntity.status(HttpStatus.OK).body("Xoa thanh cong");
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}