import "./DPTC.css"
import {QRCodeSVG} from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";

const DPTC = () => {
    const {hoaDonID}=useParams();
    const location=useLocation();
    const user=localStorage.getItem('user')||{maNguoiDung:"ND10000000000001",email:"user1@example.com",soDienThoai:"0123456789",tenDangNhap:"user1"};
    const hd=location.state||{};
    const ttHD={maHD:hoaDonID,hoTen:hd.hoTenKH,soDienThoai:user.soDienThoai,email:user.email,loaiPhong:hd.loaiPhong,ngayNhanPhong:hd.ngayNhanPhong,ngayTraPhong:hd.ngayTraPhong,soNgay:hd.soNgay,chiPhi:hd.chiPhi,chiPhiDuTinh:hd.chiPhiDuTinh,tongChiPhi:hd.tongChiPhi}

    const text=`Mã hoá đơn: ${ttHD.maHD} \n
                Khách hàng Họ tên: ${ttHD.hoTen}, Số điện thoại: ${ttHD.soDienThoai}, Email: ${ttHD.email}\n
                Phòng Loại phòng: ${ttHD.loaiPhong}, Ngày nhận phòng: ${ttHD.ngayNhanPhong}, Ngày trả phòng: ${ttHD.ngayTraPhong}, Chi phí 1 ngày :${ttHD.chiPhi}\n
                Chi phí Chi phí dự tính: ${ttHD.chiPhiDuTinh}, Mức khuyến mãi: ${ttHD.chiPhiDuTinh-ttHD.tongChiPhi}, Tổng chi phí: ${ttHD.tongChiPhi}`
    return (
        <div id="dptc" style={{marginTop:"3vh"}}>
            <h1 >Hoá đơn thanh toán</h1>
            <i>*Sử dụng mã QR để check-in tại khách sạn</i>

            <div id="bill">
                <i>Mã hoá đơn: {ttHD.maHD}</i>
                <h3>Khách hàng</h3>
                <div id="customer">
                    <p>Tên đầy đủ: <b>{ttHD.hoTen}</b></p>
                    <p>Số điện thoại: <b>{ttHD.soDienThoai}</b></p>
                    <p>Email: <b>{ttHD.email}</b></p>
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
                        <td>{ttHD.loaiPhong}</td>
                        <td>{ttHD.ngayNhanPhong}</td>
                        <td>{ttHD.ngayTraPhong}</td>
                        <td>{ttHD.soNgay}</td>
                        <td>{ttHD.chiPhi.toLocaleString("vn-VN")} VNĐ</td>
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