package com.example.demo.Services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.HotelWithRoomsDTO;
import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchHotelService {
    private final KhachSanRepository ksRepository;

    public List<HotelWithRoomsDTO> searchHotels(String diaChi, int soNguoi, LocalDate ngayNhanPhong, LocalDate ngayTraPhong) {
        List<Object[]> results = ksRepository.findAvailableHotelsWithRooms(diaChi, soNguoi, ngayNhanPhong, ngayTraPhong);
        
        Map<String, HotelWithRoomsDTO> hotelMap = new HashMap<>();

        for (Object[] row : results) {
            KhachSan ks = new KhachSan();
            ks.setMaKhachSan((String) row[0]);
            ks.setTenKhachSan((String) row[1]);
            ks.setHinhAnh((String) row[2]);
            ks.setDiemSoTB((BigDecimal) row[3]);
            ks.setDiaChiCT((String) row[4]);
            ks.setTienIch((String) row[5]);
            ks.setThongTinGT((String) row[6]);
            String roomId = (String) row[7];
            
            hotelMap.putIfAbsent(ks.getMaKhachSan(), new HotelWithRoomsDTO(ks));
            hotelMap.get(ks.getMaKhachSan()).getRoomIds().add(roomId);
        }

        return new ArrayList<>(hotelMap.values());
    }
}
