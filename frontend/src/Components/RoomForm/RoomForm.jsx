import { useState } from 'react';
import ANavBar from '../ANavBar/ANavBar';
import EditBtn from '../editBtn/editBtn';
import './RoomForm.css';
import { useNavigate, useParams } from 'react-router-dom';

const RoomForm = ({title,btn,data={},type="t1"}) => {
    const navigate=useNavigate();
    const {roomId}=useParams();
    const [formDT,setFormData]=useState({
        loaiPhong:data.loaiPhong||"",
        hinhAnh:data.hinhAnh||"",
        soNguoi:data.soNguoi||"",
        dienTich:data.dienTich||"",
        tienIch:data.tienIch||"",
        giaPhong:data.giaPhong||"",
        soPhongTrong:data.soPhongTrong||"",
        maKhachSan:data.maKhachSan||""
    })
    const handleChange=(e)=>{
        setFormData({
            ...formDT,
            [e.target.name]:e.target.value,
            maKhachSan:"KS45600000000001"
        })
    }
    const restart=()=>{
        setFormData({
            maPhong:data.maPhong,
            loaiPhong:data.loaiPhong,
            hinhAnh:data.hinhAnh,
            soNguoi:data.soNguoi,
            dienTich:data.dienTich,
            tienIch:data.tienIch,
            giaPhong:data.giaPhong,
            soPhongTrong:data.soPhongTrong,
            maKhachSan:data.maKhachSan
        })
    }
    const handleAdd=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify(formDT));
        console.log(formDT);
        try{
            const res=await fetch("http://localhost:8080/api/phong/",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formDT)
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            alert("Thêm thành công");
            navigate("/admin/room")
        }
        catch(e){
            console.log("Error while fetching: ",e);
            restart();
        }
    }
    const handleUpdate=async(maPhong)=>{
        try{
            const res=await fetch(`http://localhost:8080/api/phong/${maPhong}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formDT)
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            alert("Cập nhật thành công");
            navigate("/admin/room")
        }
        catch(e){
            console.log("Error while fetching: ",e);
            restart();
        }
    }
    return (
        <div id="roomForm">
            <ANavBar/>
            <div>
                <h1>{title}</h1>
                <div style={{display:"flex",gap:"3vw"}}>
                    <div id="rooms1">
                        <div id="rInp">
                            <label for="loaiPhong">Loại phòng</label>
                            <input type="text" name="loaiPhong" value={formDT.loaiPhong} onChange={handleChange}/>
                        </div>
                        <div id="rInp">
                            <label for="soNguoi">Số người</label>
                            <input type="number" min={1}  name="soNguoi" value={formDT.soNguoi} onChange={handleChange} />
                        </div>
                        <div id="rInp">
                            <label for="giaPhong">Giá phòng (VNĐ)</label>
                            <input type="number" name="giaPhong" value={formDT.giaPhong} onChange={handleChange} min={0}/>
                        </div>
                        <div id="rInp">
                            <label>Mã khách sạn</label>
                            <label><b>{data.maKhachSan}</b></label>
                        </div>
                    </div>
                    <div id="rooms2">
                        <div id="rInp">
                            <label for="hinhAnh">URL Hình ảnh</label>
                            <input type="text" name='hinhAnh' value={formDT.hinhAnh} onChange={handleChange}/>
                        </div>
                        <div id="rInp">
                            <label for="dienTich">Diện tích (m2)</label>
                            <input type="number" min={0} step={0.01} name="dienTich" value={formDT.dienTich} onChange={handleChange}/>
                        </div>
                        <div id="rInp">
                            <label for="soPhongTrong">Số phòng trống</label>
                            <input type="number" name="soPhongTrong" value={formDT.soPhongTrong} onChange={handleChange}/>
                        </div>
                        {type==='t2'&&<div id="rInp">
                            <label>Mã phòng</label>
                            <label><b>{data.maPhong}</b></label>
                        </div>}
                    </div>
                    <div id="rInp">
                            <label for="tienIch">Tiện ích</label>
                            <textarea name="tienIch" value={formDT.tienIch} onChange={handleChange} rows={5}  style={{width:"25vw",resize:"vertical"}}/>
                    </div>
            </div>
                <div style={{display:"flex", gap:"3vw",marginTop:"3vh",marginLeft:"23vw",paddingBottom:"2vh"}}>
                    {type==="t1"?(
                        <EditBtn text={btn} color={"rgb(67, 106, 233)"} hoverColor={"rgb(32, 79, 233)"} fontSize='x-large' func={handleAdd}/>
                    ):(
                        <EditBtn text={btn} color={"rgb(67, 106, 233)"} hoverColor={"rgb(32, 79, 233)"} fontSize='x-large' func={()=>handleUpdate(roomId)}/>
                    )}
                    <EditBtn text="Đặt lại" color={"red"} hoverColor={"rgb(82, 3, 3)"} fontSize='x-large' func={restart}/>
                </div>
            </div>
        </div>
    )
}

export default RoomForm