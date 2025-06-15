import { useNavigate } from "react-router-dom"
import "./ANavBar.css"
const ANavBar = () => {
    const navigate=useNavigate();
    const token=JSON.parse(localStorage.getItem('accessToken'));
    const admin=token?token.claims:null;
    console.log(admin)
    if(admin===null){
        alert("Vui lòng đăng nhập");
        navigate("/admin/login");
    }
    return (
        <div id="adminNav">
            <h1 style={{display:"flex",alignItems:"center"}} onClick={()=>navigate("/admin")}><span><img src="/assets/menu-admin.svg" alt="menu" /></span>Dashboard</h1>
            <p id="admin"><span><img src="/assets/user-blue.svg" alt="admin" /></span>Xin chào, {admin.adminName}</p>
            <p onClick={() => navigate("/admin/hotel/manager")} style={{cursor: "pointer"}}><span><img src="/assets/hotel.svg" alt="hotel" /></span>Khách sạn</p>
            {/* <p><span><img src="/assets/voucher.svg" alt="km" /></span>Khuyến mãi</p> */}
            <p onClick={() => navigate("/admin/khuyenMai")} style={{cursor: "pointer"}}>
                <span><img src="/assets/voucher.svg" alt="km" /></span>Khuyến mãi
            </p>
            <p onClick={()=>{
                localStorage.removeItem('accessToken');
                navigate("/admin/login");
                window.location.reload();
            }}><span><img src="/assets/logout.svg" alt="logout"/>Đăng xuất</span></p>
        </div>
    )
}

export default ANavBar