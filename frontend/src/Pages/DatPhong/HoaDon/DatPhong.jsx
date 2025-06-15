import { useNavigate } from "react-router-dom";
import "./DatPhong.css"
import { useEffect, useState } from "react";
import { formatDate } from "../../../helper/dtOutput";

const DatPhong = () => {
    const hotelInfor = JSON.parse(localStorage.getItem("hotelInfor"));
    const datPhongInfo = JSON.parse(localStorage.getItem("datPhongInfor") || "{}");
    const token=JSON.parse(localStorage.getItem('accessToken'));
    const user=token?token.claims:null;
    const navigate=useNavigate();
    useEffect(() => {
        if (!user) {
          alert("Vui lòng đăng nhập");
          navigate("/login"); 
        }
      }, [user,navigate]);
    if (!user) return null;
    const room={maPhong: datPhongInfo.maPhong 
        ,tenKhachSan: datPhongInfo.tenKhachSan 
        ,ngayNhanPhong: datPhongInfo.ngayNhan
        ,ngayTraPhong:  datPhongInfo.ngayTra
        ,hinhAnh: datPhongInfo.hinhAnh 
        ,loaiPhong: datPhongInfo.loaiPhong 
        ,tienNghi:datPhongInfo.tienNghi
        ,soNguoi: datPhongInfo.soNguoi
        ,soNgay: datPhongInfo.soNgay
        ,giaPhong: datPhongInfo.giaPhong };
    const [filled,setFilled]=useState({
        soDienThoai:true,
        email:true
    })
    const [userDT,setUserDT]=useState({
        hoTen:"",
        soDienThoai:user.soDienThoai,
        email:user.email,
        maKhuyenMai:""
    })
    const handleChange=(e)=>{
        const {id,value}=e.target;
        setUserDT((prev) => ({
            ...prev,
            [id]: value,
        }));
    
        setFilled((prev) => ({
            ...prev,
            [id]: false, 
        }));
    }
    const handleDP=async()=>{
        const validateEmail = (email) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
        const validatePhone = (phone) => /^(0|\+84)[0-9]{9}$/.test(phone);
        const validateName = (name) => /^[a-zA-ZÀ-Ỹà-ỹ]+(?:\s[a-zA-ZÀ-Ỹà-ỹ]+)+$/.test(name);

        let errors=[];
        if (!validateName(userDT.hoTen)) errors.push("⚠️ Họ tên phải có ít nhất hai từ và không chứa số.");
        if (!validateEmail(userDT.email)) errors.push("⚠️ Email không hợp lệ.");
        if (!validatePhone(userDT.soDienThoai)) errors.push("⚠️ Số điện thoại không hợp lệ.");
        if(errors.length>0){
            alert(errors.join("\n"));
            return;
        }
        const dpForm={ngayNhanPhong:formatDate(room.ngayNhanPhong),ngayTraPhong:formatDate(room.ngayTraPhong),hoTenKH:userDT.hoTen,maPhong:room.maPhong,maKhuyenMai:userDT.maKhuyenMai,maNguoiDung:user.maNguoiDung};
        try{
            const res=await fetch(`http://localhost:8080/api/hoa-don`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token.token}`
                },
                body:JSON.stringify(dpForm)
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            let data=await res.json();
            data.loaiPhong=room.loaiPhong;
            data.soNgay=room.soNgay;
            data.chiPhi=room.giaPhong;
            alert("Đặt phòng thành công");
            navigate(`/dptc/${data.hoaDonID}`,{state:data});
        }
        catch(err){
            console.log("Error while fetching: ",err);
        }
    }
    
    return (
        <div>
            <h2 style={{marginTop:"2vh",marginBottom:"3vh"}}>Đặt phòng khách sạn</h2>
            <i style={{marginLeft:"1vw"}}>*Hãy chắc chắn tất cả thông tin trên trang này là chính xác trước khi tiến hành đặt phòng</i>

            <div id="dpContainer">
                <div id="sec1" >
                    <div id="warning">
                        <h2 >
                            <span><img src="/Assets/warning.svg" alt="warning" /></span>
                        Thông báo quan trọng</h2>
                        <div style={{marginLeft:"2vw"}}>
                            <span><img src="/Assets/document.svg" alt="document" /></span>
                            <b>Giấy tờ bắt buộc</b>
                            <div style={{marginLeft:"5vw",fontSize:"larger",color:"#4b4a4a"}}>Khi nhận phòng, bạn cần cung cấp CMND/CCCD. <br/> Các giấy tờ cần thiết có thể ở dạng bản mềm.</div>
                        </div>
                    </div>

                    <div id="ctlh" style={{marginTop: "10vh"}}>
                        <h2 >Chi tiết liên hệ</h2>
                        <div id="form">
                            <div id="inp" >
                                <label for="hoTen">Tên đầy đủ (Nhâp tên như trên CMND/hộ chiếu)</label>
                                <input style={{width:"95%"}} type="text" id="hoTen" onChange={handleChange} placeholder="VD: Nguyễn Văn A" />
                            </div>
                            <div id="fRow" style={{display:"flex",gap:"1vw"}}>
                                <div id="inp">
                                    <label for="soDienThoai">Số điện thoại</label>
                                    <input type="text" value={userDT.soDienThoai} id="soDienThoai" onChange={handleChange} placeholder="Ví dụ: 0123456789" style={{backgroundColor:`${filled.soDienThoai&& "#FAFFBD"}`}} readOnly/>
                                </div>
                                <div id="inp">
                                    <label for="email">Email</label>
                                    <input type="text" value={userDT.email} id="email" onChange={handleChange} placeholder="Ví dụ: nguyenVanA@gmail.com" style={{backgroundColor:`${filled.email&& "#FAFFBD"}`}} readOnly/>
                                </div>
                            </div>
                            <div id="inp" >
                                <label for="maKhuyenMai">Mã khuyến mãi (Nếu có)</label>
                                <input style={{width:"95%"}} type="text" onChange={handleChange} id="maKhuyenMai" placeholder="Ví dụ: KM0123" />
                            </div>
                        </div>
                    </div>

                    <button id="dpBtn" onClick={handleDP}>Đặt phòng</button>
                </div>
                {/* sec2 */}
                <div id="sec2">
                    <div id="dpHt">
                        <h3><span><img src="/Assets/hotel.svg" alt="hotel" /></span>
                            {hotelInfor.tenKhachSan}
                        </h3>
                            <div>Ngày nhận phòng: <b>{room.ngayNhan}</b></div>
                            <div>Ngày trả phòng: <b>{room.ngayTra}</b></div>
                    </div>
                    <img style={{width:"30vw",height:"25vh"}} src={room.hinhAnh} alt="room" />
                    <div id="dpR">
                        <h3 style={{backgroundColor:""}}>{room.loaiPhong}</h3>
                        <p><span><img src="/Assets/comfort.svg" alt="comfort" /></span>Tiện nghi: <b>{room.tienNghi}</b></p>
                        <p><span><img src="/Assets/user-blue.svg" alt="num" /></span>Số người :<b>{room.soNguoi}</b></p>
                        <p><span><img src="/Assets/date.svg" alt="date" /></span>Số ngày: <b>{room.soNgay}</b></p>
                        <p>Giá phòng: <b>{datPhongInfo.giaPhong.toLocaleString("vn-VN")} VNĐ</b></p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DatPhong