import "./DPTC.css"
import {QRCodeSVG} from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";

const DPTC =async ({paymentType}) => {
    const {hoaDonID}=useParams();
    const[ttHD,setTTHD]=useState(null);
    try{
        const res=await fetch(`http://localhost:8080/api/hoa-don/HD/${hoaDonID}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token.token}`
            }
        })
        const hdDt=await res.json();
        setTTHD(hdDt);
    }
    catch(err){
        console.log("Error while fetching ",err);
    }
    const user=localStorage.getItem('user')||{maNguoiDung:"ND10000000000001",email:"user1@example.com",soDienThoai:"0123456789",tenDangNhap:"user1"};
    const additionalInfo=localStorage.getItem("phongInfo");
    localStorage.removeItem("phongInfo");
    const text=`Mã hoá đơn: ${ttHD.maHD} \n
                Khách hàng Họ tên: ${ttHD.hoTen}, Số điện thoại: ${user.soDienThoai}, Email: ${user.email}\n
                Phòng Loại phòng: ${additionalInfo.loaiPhong}, Ngày nhận phòng: ${ttHD.ngayNhanPhong}, Ngày trả phòng: ${ttHD.ngayTraPhong}, Chi phí 1 ngày :${additionalInfo.chiPhi}\n
                Chi phí Chi phí dự tính: ${ttHD.chiPhiDuTinh}, Mức khuyến mãi: ${ttHD.chiPhiDuTinh-ttHD.tongChiPhi}, Tổng chi phí: ${ttHD.tongChiPhi} (${paymentType})`
    return (
        <div id="dptc" style={{marginTop:"3vh"}}>
            <h1 >Hoá đơn thanh toán</h1>
            <i>*Sử dụng mã QR để check-in tại khách sạn</i>

            <div id="bill">
                <i>Mã hoá đơn: {ttHD.maHD}</i>
                <h3>Khách hàng</h3>
                <div id="customer">
                    <p>Tên đầy đủ: <b>{ttHD.hoTen}</b></p>
                    <p>Số điện thoại: <b>{user.soDienThoai}</b></p>
                    <p>Email: <b>{user.email}</b></p>
                </div>
                <table id="roomBill" style={{marginTop: "5vh"}} >
                    <tr>
                        <th>Loại phòng</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Số ngày</th>
                        <th>Chi phí 1 ngày</th>
                    </tr>
                    <tr>
                        <td>{additionalInfo.loaiPhong}</td>
                        <td>{ttHD.ngayNhanPhong}</td>
                        <td>{ttHD.ngayTraPhong}</td>
                        <td>{ttHD.soNgay}</td>
                        <td>{additionalInfo.chiPhi.toLocaleString("vn-VN")} VNĐ</td>
                    </tr>
                </table>
                <div id="billPrice" style={{marginTop:"5vh",marginBottom:"5vh"}}>
                    <div id="bp">
                        <p>Chi phí dự tính:</p>
                        <b><p>{ttHD.chiPhiDuTinh.toLocaleString("vn-VN")} VNĐ</p></b>
                    </div>
                    <div id="bp">
                        <p>Mức khuyến mãi:</p>
                        <b><p>{(ttHD.chiPhiDuTinh-ttHD.tongChiPhi).toLocaleString("vn-VN")} VNĐ</p></b>
                    </div>
                    <div id="bp">
                        <p>Tổng chi phí:</p>
                        {paymentType==="Prepaid"&&<i>Giảm giá 10% khi trả trước</i>}
                        <b><p>{ttHD.tongChiPhi.toLocaleString("vn-VN")} VNĐ</p></b> 
                    </div>
                </div>
                <div id="qr" style={{display:"flex",justifyContent:"center"}}>
                    {text&&<QRCodeSVG value={text} size={200} level="H"/>}
                </div>
            </div>
        </div>
    )
}

export default DPTC