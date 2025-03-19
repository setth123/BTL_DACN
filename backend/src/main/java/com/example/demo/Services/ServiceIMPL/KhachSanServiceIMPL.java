package com.example.demo.Services.ServiceIMPL;

import com.example.demo.Entities.KhachSan;
import com.example.demo.Repositories.KhachSanRepository;
import com.example.demo.Services.KhachSanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KhachSanServiceIMPL implements KhachSanService {

    private final KhachSanRepository khachSanRepository;

    @Override
    public KhachSan xemChiTiet(String maKhachSan) {
        return khachSanRepository.findById(maKhachSan).get();
    }
}
