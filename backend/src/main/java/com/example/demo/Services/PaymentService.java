package com.example.demo.Services;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.Entities.HoaDon;

public class PaymentService {
    String vnp_TmnCode = "2QXUI4J4";
    String vnp_HashSecret = "SECRETKEY";
    String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    String vnp_ReturnUrl = "http://localhost:3000/payment-return"; 

    public ResponseEntity<?> createPaymentLink(HoaDon hd){
        try{
            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", "2.1.0");
            vnp_Params.put("vnp_Command", "pay");
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", hd.getTongChiPhi().multiply(BigDecimal.valueOf(100)).toBigInteger().toString()); // x100
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_TxnRef", String.valueOf(hd.getHoaDonID()));
            vnp_Params.put("vnp_OrderInfo", "Thanh toán hóa đơn #" + hd.getHoaDonID());
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
            vnp_Params.put("vnp_IpAddr", "127.0.0.1");
            vnp_Params.put("vnp_CreateDate", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
    
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
    
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
    
            for (String fieldName : fieldNames) {
                String value = vnp_Params.get(fieldName);
                if (value != null && !value.isEmpty()) {
                    hashData.append(fieldName).append('=').append(value).append('&');
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.UTF_8))
                         .append('=')
                         .append(URLEncoder.encode(value, StandardCharsets.UTF_8))
                         .append('&');
                    }
            }
    
            // Remove trailing &
            String queryString = query.substring(0, query.length() - 1);
            String rawHash = hashData.substring(0, hashData.length() - 1);
            String secureHash = hmacSHA512(vnp_HashSecret, rawHash);
            queryString += "&vnp_SecureHash=" + secureHash;
    
            String paymentUrl = vnp_Url + "?" + queryString;
    
            Map<String, Object> result = new HashMap<>();
            result.put("hoaDon", hd);
            result.put("paymentUrl", paymentUrl);
    
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac hmac512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmac512.init(secretKey);
        byte[] hashBytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : hashBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
