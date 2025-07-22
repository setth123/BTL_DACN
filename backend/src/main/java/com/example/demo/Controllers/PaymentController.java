package com.example.demo.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.VNPayService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, String> body) {
        String url = vnPayService.createPaymentUrl(body);
        return ResponseEntity.ok(Map.of("url", url));
    }

    @GetMapping("/return")
    public ResponseEntity<?> handleReturn(@RequestParam Map<String, String> queryParams) {
        return ResponseEntity.ok(queryParams);
    }
}
