package com.example.demo.Controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.KhachSanChiTietDTO;
import com.example.demo.DTO.KhachSanDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Services.KhachSanService;
import com.example.demo.Services.QLKhachSanService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> themKhachSan(@RequestBody KhachSanDTO khachsan) {
        try {
            KhachSan ks = qlks.themKhachSan(khachsan);
            if(ks != null){
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(Map.of("message", "Thêm thành công!", "detail", ks));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Thêm thất bại! Dữ liệu không hợp lệ."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi hệ thống khi thêm khách sạn."));
        }
    }

    @PutMapping("/edit/{maKhachSan}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> suaKhachSan(@PathVariable String maKhachSan, @RequestBody KhachSanDTO khachsan) {
        try {
            KhachSan ks = qlks.suaKhachSan(maKhachSan, khachsan);
            if (ks != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Sửa thành công!");
                response.put("detail", ks);
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Sửa thất bại! Dữ liệu không hợp lệ."));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("message", "Lỗi hệ thống khi sửa khách sạn."));
        }
    }

    @DeleteMapping("/delete/{maKhachSan}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, String>> xoaKhachSan(@PathVariable String maKhachSan){
        try {
            qlks.xoaKhachSan(maKhachSan);
            String message = "Xóa thành công khách sạn " + maKhachSan;
            return ResponseEntity.ok(Map.of("message", message));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(404)
                    .body(Map.of("message", "Không tìm thấy khách sạn có mã " + maKhachSan));
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(Map.of("message", "Lỗi hệ thống khi xóa khách sạn có mã " + maKhachSan));
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
