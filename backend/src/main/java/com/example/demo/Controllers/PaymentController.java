package com.example.demo.Controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.HoaDon;
import com.example.demo.Repositories.HoaDonRepository;
import com.example.demo.Services.VNPayService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Value("${frontend.success-url:http://localhost:3000/checkout-success}")
    private String successUrl;

    @Value("${frontend.fail-url:http://localhost:3000/checkout-fail}")
    private String failUrl;
    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private HoaDonRepository hdr;

    @GetMapping("/return")
    public void handleReturn(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String responseCode=queryParams.get("vnp_ResponseCode");
        int hoaDonID=Integer.parseInt(queryParams.get("orderInfo"));
        
        HoaDon hd=hdr.findByHoaDonID(hoaDonID).orElse(null);
        if(!vnPayService.isValidChecksum(queryParams, queryParams.get("vnp_SecureHash"))){
            response.sendRedirect(failUrl);
            return;
        }
        if("00".equals(responseCode)){
            response.sendRedirect(successUrl+"?invoiceId="+hd.getHoaDonID());
        }
        else{
            hdr.delete(hd);
            response.sendRedirect(failUrl);
        }

    }

}
