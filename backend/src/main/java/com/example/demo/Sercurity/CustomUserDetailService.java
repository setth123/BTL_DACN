package com.example.demo.Sercurity;

import com.example.demo.Entities.NguoiDung;
import com.example.demo.Repositories.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final NguoiDungRepository nguoiDungRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tìm kiếm người dùng dựa trên email hoặc tên đăng nhập
        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByEmailOrTenDangNhap(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với tên đăng nhập hoặc email: " + username));

        // Lấy danh sách quyền (role) của người dùng
        Set<GrantedAuthority> authorities = Set.of(new SimpleGrantedAuthority("USER"));

        // Trả về đối tượng UserDetails
        return new User(nguoiDung.getTenDangNhap(), nguoiDung.getMatKhau(), authorities);
    }
}
