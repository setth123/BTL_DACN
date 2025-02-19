import { useNavigate } from "react-router-dom";
import "./DatPhong.css"

const DatPhong = () => {
    const data={loaiPhong:"ABC",soNgay:3,giaPhong:5000000};
    const pData={tenKhachSan:"XYZ",ngayNhanPhong:"20/12/2024",ngayTraPhong:"24/12/2024",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",soNguoi:2,tienNghi:"lmao"}
    const chiPhi=data.giaPhong*data.soNgay;

    const navigate=useNavigate();
    const handleDP=(e)=>{
        e.preventDefault;
        alert("Đặt phòng thành công");
        navigate("/dptc");
    }
    return (
        <div>
            <h2>Đặt phòng khách sạn</h2>
            <i style={{marginLeft:"1vw"}}>*Hãy chắc chắn tất cả thông tin trên trang này là chính xác trước khi tiến hành đặt phòng</i>

            <div id="dpContainer">
                <div id="sec1" >
                    <div id="warning">
                        <h2 >
                            <span><img src="./Assets/warning.svg" alt="warning" /></span>
                        Thông báo quan trọng</h2>
                        <div style={{marginLeft:"2vw"}}>
                            <span><img src="./Assets/document.svg" alt="document" /></span>
                            <b>Giấy tờ bắt buộc</b>
                            <div style={{marginLeft:"5vw",fontSize:"larger",color:"#4b4a4a"}}>Khi nhận phòng, bạn cần cung cấp CMND/CCCD. <br/> Các giấy tờ cần thiết có thể ở dạng bản mềm.</div>
                        </div>
                    </div>

                    <div id="ctlh" style={{marginTop: "10vh"}}>
                        <h2 >Chi tiết liên hệ</h2>
                        <div id="form">
                            <div id="inp" >
                                <label for="fullName">Tên đầy đủ (Nhâp tên như trên CMND/hộ chiếu)</label>
                                <input style={{width:"100%"}} type="text" id="fullName" placeholder="VD: Nguyễn Văn A" />
                            </div>
                            <div id="fRow" style={{display:"flex",gap:"1vw"}}>
                                <div id="inp">
                                    <label for="sdt">Số điện thoại</label>
                                    <input type="text" id="sdt" placeholder="Ví dụ: 0123456789" />
                                </div>
                                <div id="inp">
                                    <label for="email">Email</label>
                                    <input type="text" id="email" placeholder="Ví dụ: nguyenVanA@gmail.com" />
                                </div>
                            </div>
                            <div id="inp" >
                                <label for="km">Mã khuyến mãi (Nếu có)</label>
                                <input style={{width:"100%"}} type="text" id="fullName" placeholder="Ví dụ: KM0123" />
                            </div>
                        </div>
                    </div>

                    <div id="cpdt" style={{marginTop:"3vh"}}>
                        <h2>Chi phí dự tính</h2>
                        <div id="cp" >
                            <p style={{fontWeight:"normal"}}>{data.loaiPhong} ({data.soNgay} đêm)</p>
                            <p>{chiPhi.toLocaleString("vn-VN")} VNĐ</p>
                        </div>
                    </div>
                    <button id="dpBtn" onClick={handleDP}>Đặt phòng</button>
                </div>
                {/* sec2 */}
                <div id="sec2">
                    <div id="dpHt">
                        <h3><span><img src="./Assets/hotel.svg" alt="hotel" /></span>
                            {pData.tenKhachSan}
                        </h3>
                            <div>Ngày nhân phòng: <b>{pData.ngayNhanPhong}</b></div>
                            <div>Ngày trả phòng: <b>{pData.ngayTraPhong}</b></div>
                    </div>
                    <img style={{width:"30vw",height:"25vh"}} src={pData.hinhAnh} alt="room" />
                    <div id="dpR">
                        <h3 style={{backgroundColor:""}}>{data.loaiPhong}</h3>
                        <p><span><img src="./Assets/comfort.svg" alt="comfort" /></span>Tiện nghi: <b>{pData.tienNghi}</b></p>
                        <p><span><img src="./Assets/user-blue.svg" alt="num" /></span>Số người :<b>{pData.soNguoi}</b></p>
                        <p><span><img src="./Assets/date.svg" alt="date" /></span>Số ngày: <b>{data.soNgay}</b></p>
                        <p>Giá phòng: <b>{data.giaPhong.toLocaleString("vn-VN")} VNĐ</b></p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DatPhong