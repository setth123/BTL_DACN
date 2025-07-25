package com.example.demo.Services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Config.VNPayConfig;

@Service
public class VNPayService {
    @Autowired
    private VNPayConfig config;

    public String createPaymentUrl(Map<String, String> input) {
        try {
            String vnp_TxnRef = String.valueOf(System.currentTimeMillis());
            String vnp_OrderInfo = input.get("orderInfo");
            String orderType = "billpayment";
            String vnp_Amount = String.valueOf(Integer.parseInt(input.get("amount")) * 100);
            String vnp_Locale = input.getOrDefault("locale", "vn");
            String vnp_BankCode = input.getOrDefault("bankCode", "");
            String vnp_IpAddr = "127.0.0.1"; // Có thể lấy từ HttpServletRequest

            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", config.getVersion());
            vnp_Params.put("vnp_Command", config.getCommand());
            vnp_Params.put("vnp_TmnCode", config.getTmnCode());
            vnp_Params.put("vnp_Amount", vnp_Amount);
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
            vnp_Params.put("vnp_OrderType", orderType);
            vnp_Params.put("vnp_Locale", vnp_Locale);
            vnp_Params.put("vnp_ReturnUrl", config.getReturnUrl());
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
            vnp_Params.put("vnp_CreateDate", new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));

            if (!vnp_BankCode.isEmpty()) {
                vnp_Params.put("vnp_BankCode", vnp_BankCode);
            }

            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            for (String fieldName : fieldNames) {
                String value = vnp_Params.get(fieldName);
                if (value != null && value.length() > 0) {
                    hashData.append(fieldName).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));
                    query.append(fieldName).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII.toString()));
                    if (!fieldName.equals(fieldNames.get(fieldNames.size() - 1))) {
                        hashData.append('&');
                        query.append('&');
                    }
                }
            }

            String secureHash = hmacSHA512(config.getHashSecret(), hashData.toString());
            query.append("&vnp_SecureHash=").append(secureHash);

            return config.getPayUrl() + "?" + query.toString();

        } catch (Exception e) {
            throw new RuntimeException("Create VNPay URL failed", e);
        }
    }

    public boolean isValidChecksum(Map<String, String> params, String receivedHash) {
        Map<String, String> sortedParams = new TreeMap<>();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (!entry.getKey().equals("vnp_SecureHash") && !entry.getKey().equals("vnp_SecureHashType")) {
                sortedParams.put(entry.getKey(), entry.getValue());
            }
        }

        StringBuilder data = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            data.append(entry.getKey()).append('=').append(entry.getValue()).append('&');
        }
        data.setLength(data.length() - 1); 

        try {
            String hash = hmacSHA512(config.getHashSecret(), data.toString());
            return hash.equalsIgnoreCase(receivedHash);
        } catch (Exception e) {
            return false;
        }
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac hmac512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmac512.init(secretKey);
        byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hash = new StringBuilder();
        for (byte b : bytes) {
            hash.append(String.format("%02x", b));
        }
        return hash.toString();
    }
}
