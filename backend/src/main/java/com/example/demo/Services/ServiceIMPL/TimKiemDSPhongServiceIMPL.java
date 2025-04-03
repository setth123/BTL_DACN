package com.example.demo.Services.ServiceIMPL;

import com.example.demo.Entities.Phong;
import com.example.demo.Repositories.PhongRepository;
import com.example.demo.Services.TimKiemDSPhongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimKiemDSPhongServiceIMPL implements TimKiemDSPhongService {

    private final PhongRepository phongRepository;

    @Override
    public List<Phong> getRoomsByIds(List<String> roomsIds) {
        return phongRepository.findAllById(roomsIds);
    }
}
