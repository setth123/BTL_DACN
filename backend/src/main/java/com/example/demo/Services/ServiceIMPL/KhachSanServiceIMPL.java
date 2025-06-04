package com.example.demo.Services.ServiceIMPL;

import com.example.demo.DTO.KhachSanChiTietDTO;
import com.example.demo.DTO.PhongDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Services.KhachSanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KhachSanServiceIMPL implements KhachSanService {

    private final KhachSanRepository khachSanRepository;

    public KhachSanChiTietDTO xemChiTietKS(String maKhachSan) {
        // Lấy thông tin khách sạn
        KhachSanChiTietDTO khachSanChiTiet = khachSanRepository.findKhachSanById1(maKhachSan);

        if (khachSanChiTiet == null) {
            return null; // Trả về null nếu không tìm thấy khách sạn
        }

        // Lấy danh sách phòng
        List<PhongDTO> phongs = khachSanRepository.findPhongsByKhachSan(maKhachSan);

        // Gán danh sách phòng vào DTO chi tiết khách sạn
        khachSanChiTiet.setPhongs(phongs);

        return khachSanChiTiet;
    }
}
