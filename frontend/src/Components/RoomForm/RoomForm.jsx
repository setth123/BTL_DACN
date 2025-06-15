import { useState } from 'react';
import ANavBar from '../ANavBar/ANavBar';
import EditBtn from '../editBtn/editBtn';
import './RoomForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useQueryClient } from '@tanstack/react-query';
const RoomForm = ({title,btn,data={},type="t1"}) => {
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {hotelId,roomId}=useParams();
    let curRoom={maPhong:"",loaiPhong:"",hinhAnh:"",soNguoi:0,dienTich:0,tienIch:"",giaPhong:0,soPhongTrong:0,maKhachSan:""};
    if(type==="t2"){
        const room=JSON.parse(localStorage.getItem("adminCurRoom"));
        curRoom=room;
    }
    const [formDT,setFormData]=useState(curRoom);
    const handleChange=(e)=>{
        setFormData({
            ...formDT,
            [e.target.name]:e.target.value,
        })
    }
    const restart=()=>{
        setFormData({
            maPhong:curRoom.maPhong,
            loaiPhong:curRoom.loaiPhong,
            hinhAnh:curRoom.hinhAnh,
            soNguoi:curRoom.soNguoi,
            dienTich:curRoom.dienTich,
            tienIch:curRoom.tienIch,
            giaPhong:curRoom.giaPhong,
            soPhongTrong:curRoom.soPhongTrong,
            maKhachSan:curRoom.maKhachSan
        })
    }
    const handleAdd=async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem("adminToken").token;
        try{
            const res=await fetch("http://localhost:8080/api/phong/",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token.token}`
                },
                body:JSON.stringify(formDT)
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            const newRoom=await res.json();
            queryClient.setQueryData(["adminRooms",(oldData)=>{
                if(!oldData){return [newRoom]};
                return [...oldData,newRoom];
            }])
            queryClient.setQueryData(["adminAllRooms",(oldData)=>{
                if(!oldData){return [newRoom]};
                return [...oldData,newRoom];
            }])
            alert("Thêm thành công");
            navigate(`/admin/hotel/${hotelId}/room`)
        }
        catch(e){
            console.log("Error while fetching: ",e);
            restart();
        }
    }
    const handleUpdate=async()=>{
        try{
            const res=await fetch(`http://localhost:8080/api/phong/${roomId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify(formDT)
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            const newPhong=await res.json();
            queryClient.setQueryData(["adminRooms"],(oldData)=>{
                if(!oldData) return [newPhong];
                return oldData.map(room =>
                    room.id === newPhong.id ? newPhong : room
                );
            })
            queryClient.setQueryData(["adminAllRooms"],(oldData)=>{
                if(!oldData) return [newPhong];
                return oldData.map(room =>
                    room.id === newPhong.id ? newPhong : room
                );
            })
            alert("Cập nhật thành công");
            navigate(`/admin/hotel/${hotelId}/room`)
        }
        catch(e){
            console.log("Error while fetching: ",e);
            restart();
        }
    }
    return (
        <div id="roomForm">
            <ANavBar/>
            <div style={{marginLeft:"290px"}}>
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
                            <label><b>{hotelId}</b></label>
                        </div>
                    </div>
                    <div id="rooms2">
                        <div id="rInp">
                            <label for="hinhAnh">URL Hình ảnh</label>
                            {type=="t2"&& <img src={formDT.hinhAnh} alt="room image"/>}
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
                        <EditBtn text={btn} color={"rgb(67, 106, 233)"} hoverColor={"rgb(32, 79, 233)"} fontSize='x-large' func={handleUpdate}/>
                    )}
                    <EditBtn text="Đặt lại" color={"red"} hoverColor={"rgb(82, 3, 3)"} fontSize='x-large' func={restart}/>
                </div>
            </div>
        </div>
    )
}

export default RoomForm
