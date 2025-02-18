import "./MyDC.css";
const MyDC = () => {
    const data=[
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3}
    ]
    const isKM=true;
    return (
        <div>
            <h2>Các phòng đã đặt</h2>
            <i style={{marginTop:"1vh",marginLeft:"1vw"}}>*Các phòng có thể được huỷ miễn phí trước 1 tuần</i>
            <div id="roomContainer">
                {data.map((item,index)=>(<div key={index} id="room">
                        <div id="rp1">
                            <img src={item.hinhAnh} alt="room" />
                        </div>
                        <div id="rp2">
                            <h2>{item.loaiPhong}</h2>
                            <div>Diện tích: {item.dienTich}</div>
                            <div>Tiện nghi: {item.tienIch}</div>
                            <div>Số người: {item.soNguoi}</div>
                            <div>Thời gian: {item.thoiGian}</div>
                        </div>
                        <div id="rp3">
                            {isKM&&(
                                <div>Đã áp dụng khuyến mãi</div>
                            )}
                            <h3>{item.tongChiPhi.toLocaleString("vi-VN")} VNĐ</h3>
                        </div>
                        <div id="rp4">
                            <button onClick={()=>alert("Huỷ thành công")}>Huỷ đặt phòng</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyDC