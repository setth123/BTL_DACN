import './NavBar.css'
import userAvatar from '../../../assets/userAvatar.svg';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const NavBar = () => {
    const token=JSON.parse(localStorage.getItem('accessToken'));
    const user=token?token.claims:null;
    const navigate=useNavigate();
    if(admin===null)navigate("/admin/login");
    return (
        <div className="navbar">
            {/* Logo */}
            <div id="logo" onClick={()=>navigate("/")}>Travel</div>

            {/* Navbar */}
            <ul>
                <li><a href="/khuyenMai">Khuyến mãi</a></li>
                <li><a href="/mydc">Đặt chỗ của tôi</a></li>
                {/* <li><a href="/hotel/KS45600000000002">Khách sạn chi tiết</a></li> */}
                <li><a href="#">Đăng ký</a></li>
            </ul>
            {user?(
                <div style={{display:"flex",gap:"2vw",alignItems: "center" }}>
                    <div id="avatar">
                        <img src={userAvatar} alt="User Logo"/>
                        <div>{user.tenDangNhap}</div>
                    </div>
                    <button onClick={()=>{
                        localStorage.removeItem('accessToken');
                        navigate("/login");
                        window.location.reload();
                    }}>Đăng xuất</button>
                </div>
                ):(
                    <button>Đăng nhập</button>
                )
            }
        </div>
    )
}

export default NavBar