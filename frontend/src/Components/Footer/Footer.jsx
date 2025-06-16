// Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo-row">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/a/ad89f39fe62c8b500e6f9a25fa4427d8.svg"
            alt="Traveloka"
            className="logo"
          />
          
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
            alt="Da Dang Ky"
            className="cert-icon"
          />
        </div>
      </div>

      <div className="footer-columns">
        <div className="footer-column">
          <h4>Về Traveloka</h4>
          <ul>
            <li>Cách đặt chỗ</li>
            <li>Liên hệ chúng tôi</li>
            <li>Trợ giúp</li>
            <li>Tuyển dụng</li>
            <li>Về chúng tôi</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Sản phẩm</h4>
          <ul>
            <li>Khách sạn</li>
            <li>Vé máy bay</li>
            <li>Vé xe khách</li>
            <li>Đưa đón sân bay</li>
            <li>Cho thuê xe</li>
            <li>Hoạt động & Vui chơi</li>
            <li>Du thuyền</li>
            <li>Biệt thự</li>
            <li>Căn hộ</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Khác</h4>
          <ul>
            <li>Traveloka Affiliate</li>
            <li>Traveloka Blog</li>
            <li>Chính Sách Quyền Riêng</li>
            <li>Điều khoản & Điều kiện</li>
            <li>Đăng ký nơi nghỉ của bạn</li>
            <li>Đăng ký doanh nghiệp hoạt động du lịch của bạn</li>
            <li>Khu vực báo chí</li>
            <li>Quy chế hoạt động</li>
            <li>Vulnerability Disclosure Program</li>
            <li>APAC Travel Insights</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Theo dõi chúng tôi trên</h4>
          <div className="social-icons">
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/6/6904cd2e74ef73120833cff12185a320.svg" alt="Facebook" />
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/6/62a2fc240d7e00b05d0d6f6b4e785110.svg" alt="Instagram" />
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/4/471f17c1510d49a98bec08a48b84c607.svg" alt="TikTok" />
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/b/b593add66303beb2a0cae9e96963e68b.svg" alt="YouTube" />
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/b/b71b3d4a793c24ce189336b1540cf5ed.svg" alt="Telegram" />
          </div>
          <p className="title">Tải ứng dụng Traveloka</p>
          <div className="store-buttons">
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/f/f519939e72eccefffb6998f1397901b7.svg" alt="Google Play" />
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v4.6.0/1/18339f1ae28fb0c49075916d11b98829.svg" alt="App Store" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Công ty TNHH Travel ABC Việt Nam. Mã số DN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, P Võ Thị Sáu, Q3, TP HCM</p>
        <p>Copyright © 2025 Travel ABC. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;