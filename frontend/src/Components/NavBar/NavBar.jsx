import './NavBar.css'
import userAvatar from '../../../assets/userAvatar.svg';
import { useNavigate } from 'react-router-dom';
import { toDatetimeLocalString } from '../../helper/dtOutput';

const NavBar = () => {
    const token=JSON.parse(localStorage.getItem('accessToken'));
    const user=token?token.claims:null;
    const navigate=useNavigate();
    const now = new Date();
    const tomorrow = new Date(now); 
    tomorrow.setDate(now.getDate() + 1);

    const params = new URLSearchParams({
        location: "Hà Nội",
        checkIn: toDatetimeLocalString(now),
        checkOut: toDatetimeLocalString(tomorrow),
        guests: "1",
    }).toString();
    return (
        <div className="navbar">
            {/* Logo */}
            <div id="logo" onClick={()=>navigate("/")}>Travel</div>

            {/* Navbar */}
            <ul>
                <li><a href="/khuyenMai">Khuyến mãi</a></li>
                {user&&<li><a href="/mydc">Đặt chỗ của tôi</a></li>}
                <li><a href="/register">Đăng ký</a></li>
                <li><a href={`/search-result?${params}`}>Khách sạn</a></li>
            </ul>
            {user?(
                <div style={{display:"flex",gap:"2vw",alignItems: "center" }}>
                    <div id="avatar">
                        <img src={userAvatar} alt="User Logo"/>
                        <div>{user.tenDangNhap}</div>
                    </div>
                    <button onClick={()=>{
                        if(user){
                            localStorage.removeItem('accessToken');
                        }
                            navigate("/login");
                            window.location.reload();
                    }}>{user?"Đăng xuất":"Đăng nhập"}</button>
                </div>
                ):(
                    <button onClick={()=>navigate("/login")}>Đăng nhập</button>
                )
            }
        </div>
    )
}

export default NavBar