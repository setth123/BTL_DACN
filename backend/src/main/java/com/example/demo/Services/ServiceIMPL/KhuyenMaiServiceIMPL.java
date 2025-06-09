package com.example.demo.Services.ServiceIMPL;

import com.example.demo.DTO.KhuyenMaiDTO;
import com.example.demo.Entities.KhuyenMai;
import com.example.demo.Repositories.KhuyenMaiRepository;
import com.example.demo.Services.KhuyenMaiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KhuyenMaiServiceIMPL implements KhuyenMaiService {

    @Autowired
    private  KhuyenMaiRepository khuyenMaiRepository;
    
    @Override
    public void themKhuyenMai(KhuyenMaiDTO request) {
        KhuyenMai km = KhuyenMai.builder()
                .maKhuyenMai("KM"+java.util.UUID.randomUUID().toString().substring(0, 14));
                .ngayBD(request.getNgayBD())
                .ngayKT(request.getNgayKT())
                .mucKhuyenMai(request.getMucKhuyenMai())
                .giaoDichToiThieu(request.getGiaoDichToiThieu())
                .build();

        khuyenMaiRepository.save(km);
        log.info("--->>> Thêm thông tin khuyến mãi mới thành công ");
    }

    @Override
    public void xoaKhuyenMai(String maKhuyenMai) {
        KhuyenMai km = khuyenMaiRepository.findById(maKhuyenMai).orElseThrow(() -> new RuntimeException("Khuyến mãi không tồn tại"));
        khuyenMaiRepository.delete(km);

        log.info("--->>> Xóa thành công khuyến mãi có Id : {}" , maKhuyenMai);
    }

    @Override
    public void suaKhuyenMai(String maKhuyenMai, KhuyenMaiDTO request) {
        KhuyenMai km = khuyenMaiRepository.findById(maKhuyenMai).orElseThrow(() -> new RuntimeException("Khuyến mãi không tồn tại"));
        km.setNgayBD(request.getNgayBD());
        km.setNgayKT(request.getNgayKT());
        km.setMucKhuyenMai(request.getMucKhuyenMai());
        km.setGiaoDichToiThieu(request.getGiaoDichToiThieu());

        khuyenMaiRepository.save(km);
        log.info("--->>> Sửa thành công khuyến mãi có Id : {}" , maKhuyenMai);
    }
}
