package com.example.demo.Services;

import com.example.demo.Entities.Phong;

import java.util.List;

public interface TimKiemDSPhongService {
    List<Phong> getRoomsByIds(List<String> roomsId);
}
