import './NavBar.css'
import userAvatar from '../../../assets/userAvatar.svg';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const token=JSON.parse(localStorage.getItem('accessToken'));
    const user=token?token.claims:null;
    const navigate=useNavigate();
    return (
        <div className="navbar">
            {/* Logo */}
            <div id="logo" onClick={()=>navigate("/")}>Travel</div>

            {/* Navbar */}
            <ul>
                <li><a href="/khuyenMai">Khuyến mãi</a></li>
                {user&&<li><a href="/mydc">Đặt chỗ của tôi</a></li>}
                <li><a href="#">Đăng ký</a></li>
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