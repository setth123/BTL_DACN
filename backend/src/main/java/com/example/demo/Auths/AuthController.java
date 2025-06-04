package com.example.demo.Auths;

import com.example.demo.Auths.Impl.ImplAuthService;
import com.example.demo.DTO.AdminDTO;
import com.example.demo.DTO.NguoiDungDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping()
public class AuthController {
    private final ImplAuthService implAuthService;
    public AuthController(ImplAuthService implAuthService) {
        this.implAuthService = implAuthService;
    }

    @PostMapping("/user/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest loginRequest) {
        JwtResponseDTO response = implAuthService.login(loginRequest);

        return ResponseEntity.ok(Map.of(
                "message", "Đăng nhập thành công!",
                "accessToken", response.getAccess_token(),
                "refreshToken", response.getRefresh_token()
        ));
    }

    @PostMapping("/user/dang-ki")
    public ResponseEntity<?> registerUser(@RequestBody NguoiDungDTO registerUserRequest) {
        if (implAuthService.dangKy(registerUserRequest)) {
            return ResponseEntity.ok().body("{\"status\": \"success\", \"message\": \"Đăng ký thành công!\"}");
        }
        return ResponseEntity.badRequest().body("{\"status\": \"error\", \"message\": \"Đăng ký thất bại!\"}");
    }

    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody AdminDTO adminDTO) {
        if (implAuthService.adminLogin(adminDTO)){
            return ResponseEntity.status(HttpStatus.OK).body("Dang Nhap Thanh Cong");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sai tai khoan mat khau");
    }
}
