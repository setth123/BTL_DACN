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
        @RequestParam(required = false) String diaChi,
        @RequestParam(required = false) Integer soNguoi,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayNhanPhong,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngayTraPhong) {

        // Kiểm tra null hoặc rỗng
        if (diaChi == null || diaChi.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Địa chỉ không được để trống");
        }

        if (soNguoi == null) {
            return ResponseEntity.badRequest().body("Số người không được để trống");
        }

        if (soNguoi <= 0) {
            return ResponseEntity.badRequest().body("Số người phải lớn hơn 0");
        }

        if (ngayNhanPhong == null || ngayTraPhong == null) {
            return ResponseEntity.badRequest().body("Ngày nhận phòng và ngày trả phòng không được để trống");
        }

        // Kiểm tra ngày
        if (ngayNhanPhong.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Ngày nhận phòng không thể là ngày trong quá khứ");
        }

        if (ngayTraPhong.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Ngày trả phòng không thể là ngày trong quá khứ");
        }

        if (ngayTraPhong.isBefore(ngayNhanPhong)) {
            return ResponseEntity.badRequest().body("Ngày trả phòng phải sau hoặc bằng ngày nhận phòng");
        }

        // Kiểm tra địa chỉ chứa số
        if (diaChi.matches(".*\\d.*")) {
            return ResponseEntity.badRequest().body("Địa chỉ không được chứa số");
        }

        // Kiểm tra địa chỉ chứa ký tự đặc biệt (cho phép chữ cái, khoảng trắng và dấu thông dụng)
        if (!diaChi.matches("^[\\p{L}\\s,.-]+$")) {
            return ResponseEntity.badRequest().body("Địa chỉ không được chứa ký tự đặc biệt");
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
