import './NavBar.css'
import userAvatar from '../../../assets/userAvatar.svg';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const NavBar = () => {
    const queryClient=useQueryClient();
    const user=localStorage.getItem('user')||{maNguoiDung:"ND10000000000001",email:"user1@example.com",soDienThoai:"0123456789",tenDangNhap:"user1"};
    const navigate=useNavigate();
    return (
        <div className="navbar">
            {/* Logo */}
            <div id="logo" onClick={()=>navigate("/")}>Travel</div>

            {/* Navbar */}
            <ul>
                <li><a href="/khuyenMai">Khuyến mãi</a></li>
                <li><a href="/mydc">Đặt chỗ của tôi</a></li>
                <li><a href="#">Đăng ký</a></li>
            </ul>
            {user?(
                <div style={{display:"flex",gap:"2vw",alignItems: "center" }}>
                    <div id="avatar">
                        <img src={userAvatar} alt="User Logo"/>
                        <div>{user.tenDangNhap}</div>
                    </div>
                    <button>Đăng xuất</button>
                </div>
                ):(
                    <button>Đăng nhập</button>
                )
            }
        </div>
    )
}

export default NavBar