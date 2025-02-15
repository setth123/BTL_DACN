import './NavBar.css'
import userAvatar from '../../../assets/userAvatar.svg';
import { useNavigate } from 'react-router-dom';

const NavBar = ({user}) => {
    const navigate=useNavigate();
    return (
        <div className="navbar">
            {/* Logo */}
            <div id="logo" onClick={()=>navigate("/")}>Travel</div>

            {/* Navbar */}
            <ul>
                <li><a href="/khuyenMai">Khuyến mãi</a></li>
                <li><a href="#">Đặt chỗ của tôi</a></li>
                <li><a href="#">Đăng ký</a></li>
            </ul>
            {user?(
                <div style={{display:"flex",gap:"2vw",alignItems: "center" }}>
                    <div id="avatar">
                        <img src={userAvatar} alt="User Logo"/>
                        <div>username</div>
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