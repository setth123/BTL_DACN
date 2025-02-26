import { useNavigate } from "react-router-dom"
import "./ANavBar.css"
const ANavBar = () => {
    const navigate=useNavigate();
    return (
        <div id="adminNav">
            <h1 style={{display:"flex",alignItems:"center"}} onClick={()=>navigate("/admin")}><span><img src="/assets/menu-admin.svg" alt="menu" /></span>Dashboard</h1>
            <p id="admin"><span><img src="/assets/user-blue.svg" alt="admin" /></span>Xin chào, username</p>
            <p><span><img src="/assets/hotel.svg" alt="hotel" /></span>Khách sạn</p>
            <p><span><img src="/assets/voucher.svg" alt="km" /></span>Khuyến mãi</p>
            <p><span><img src="/assets/logout.svg" alt="logout" />Đăng xuất</span></p>
        </div>
    )
}

export default ANavBar