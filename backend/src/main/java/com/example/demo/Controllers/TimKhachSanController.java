package com.example.demo.Controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.HotelWithRoomsDTO;
import com.example.demo.Services.SearchHotelService;

@RestController
@RequestMapping("/api/hotels")
public class TimKhachSanController {

    @Autowired
    private SearchHotelService hotelService;

    @GetMapping("/search")
    public ResponseEntity<?> searchHotels(
            @RequestParam String diaChi,
            @RequestParam int soNguoi,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayNhanPhong,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayTraPhong) {

        if (ngayNhanPhong.isAfter(ngayTraPhong)) {
            return ResponseEntity.badRequest().body("Ngày nhận phòng phải trước ngày trả phòng");
        }

        if (ngayNhanPhong.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Ngày nhận phòng không thể là ngày trong quá khứ");
        }

        try {
            List<HotelWithRoomsDTO> hotels = hotelService.searchHotels(diaChi, soNguoi, ngayNhanPhong, ngayTraPhong);

            if (hotels.isEmpty()) {
                return ResponseEntity.ok().body("Không tìm thấy khách sạn phù hợp với tiêu chí tìm kiếm");
            }

            return ResponseEntity.ok(hotels);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Đã xảy ra lỗi hệ thống: " + e.getMessage());
    }
}
