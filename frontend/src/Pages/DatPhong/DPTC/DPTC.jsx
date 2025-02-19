import "./DPTC.css"
import {QRCodeSVG} from "qrcode.react";

const DPTC = () => {
    const hd={maHD:"HD2423"}
    const user={hoTen:"Nguyễn Văn A",soDienThoai:"0123456789",email:"nguyenVanA@gmail.com"}
    const room={loaiPhong:"ABC",ngayNhanPhong:"20/12/2024",ngayTraPhong:"21/12/2024",soNgay:3,chiPhi:5000000}
    const price={kM:1000000,chiPhiDuTinh:15000000,tongChiPhi:14000000}

    const text=`Mã hoá đơn: ${hd.maHD} \n
                Khách hàng Họ tên: ${user.hoTen}, Số điện thoại: ${user.soDienThoai}, Email: ${user.email}\n
                Phòng Loại phòng: ${room.loaiPhong}, Ngày nhận phòng: ${room.ngayNhanPhong}, Ngày trả phòng: ${room.ngayTraPhong}, Chi phí 1 ngày :${room.chiPhi}\n
                Chi phí Chi phí dự tính: ${price.chiPhiDuTinh}, Mức khuyến mãi: ${price.kM}, Tổng chi phí: ${price.tongChiPhi}`
                   

    return (
        <div id="dptc">
            <h1>Hoá đơn thanh toán</h1>
            <i>*Sử dụng mã QR để check-in tại khách sạn</i>

            <div id="bill">
                <i>Mã hoá đơn: {hd.maHD}</i>
                <h3>Khách hàng</h3>
                <div id="customer">
                    <p>Tên đầy đủ: <b>{user.hoTen}</b></p>
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
                        <td>{room.loaiPhong}</td>
                        <td>{room.ngayNhanPhong}</td>
                        <td>{room.ngayTraPhong}</td>
                        <td>{room.soNgay}</td>
                        <td>{room.chiPhi.toLocaleString("vn-VN")} VNĐ</td>
                    </tr>
                </table>
                <div id="billPrice" style={{marginTop:"5vh",marginBottom:"5vh"}}>
                    <div id="bp">
                        <p>Chi phí dự tính:</p>
                        <b><p>{price.chiPhiDuTinh.toLocaleString("vn-VN")} VNĐ</p></b>
                    </div>
                    <div id="bp">
                        <p>Mức khuyến mãi:</p>
                        <b><p>{price.kM.toLocaleString("vn-VN")} VNĐ</p></b>
                    </div>
                    <div id="bp">
                        <p>Tổng chi phí:</p>
                        <b><p>{price.tongChiPhi.toLocaleString("vn-VN")} VNĐ</p></b> 
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