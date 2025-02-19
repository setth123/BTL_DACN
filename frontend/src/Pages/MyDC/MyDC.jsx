import "./MyDC.css";
const MyDC = () => {
    const data=[
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3},
        {loaiPhong:"ABC",hinhAnh:"https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",thoiGian:"20-12-2024 to 22-12-2024",tongChiPhi:1000000,dienTich:5.6,tienIch:"abc",soNguoi:3}
    ]
    const isKM=true;
    const handleDel=(e)=>{
        e.preventDefault();
        var isDel=confirm("Are you sure you want to delete");
        if(isDel)alert("Huỷ thành công");
    }
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
                            <div >
                                <span><img src="./Assets/area.svg" alt="area" /></span>
                                Diện tích: <span style={{fontWeight:"bold",color:"rgb(0, 140, 255)"}}>{item.dienTich}</span>
                            </div>
                            <div>
                                <span><img src="./Assets/comfort.svg" alt="comfort" /></span>
                                Tiện nghi: <span style={{fontWeight:"bold",color:"rgb(0, 140, 255)"}}>{item.tienIch}</span>
                            </div>
                            <div>
                                <span><img src="./Assets/user-blue.svg" alt="num" /></span>
                                Số người: <span style={{fontWeight:"bold",color:"rgb(0, 140, 255)"}}>{item.soNguoi}</span>
                            </div>
                            <div>
                                <span><img src="./Assets/date.svg" alt="date" /></span>
                                Thời gian: <span style={{fontWeight:"bold",color:"rgb(0, 140, 255)"}}>{item.thoiGian}</span>
                            </div>
                        </div>
                        <div id="rp3">
                            {isKM&&(
                                <div><i>*Đã áp dụng khuyến mãi</i></div>
                            )}
                            <h3>{item.tongChiPhi.toLocaleString("vi-VN")} VNĐ</h3>
                        </div>
                        <div id="rp4">
                            <button onClick={handleDel}>Huỷ đặt phòng</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyDC