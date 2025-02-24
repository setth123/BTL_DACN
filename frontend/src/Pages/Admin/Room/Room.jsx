import StaticTable from "../../../Components/StaticTable/StaticTable";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import "./Room.css";
import EditBtn from "../../../Components/editBtn/editBtn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Room = () => {
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    useEffect(() =>{
        const fetchData=async()=>{
            try{
                const res=await fetch("http://localhost:8080/api/phong/");
                if(!res.ok){
                    throw new Error(`Error API: ${res.status} ${res.statusText}`);
                }
                setData(await res.json());
            }
            catch(err){
                console.log("Error while fetching: ",err);
            }
        }
        fetchData();
    },[]);
    const confirmDel=async(row)=>{
        var cDel=confirm("Bạn có chắc chắn muốn xoá phòng này");
        if(cDel){
            const res=await fetch(`http://localhost:8080/api/phong/${row.maPhong}`,{
                method: "DELETE"
            })
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            setData(await res.json())
            alert("Xoá thành công");
        }
    }
    const handleUpdate=(row)=>{
        navigate(`/admin/room/update/${row.maPhong}`);
    }
    const handleAdd=()=>{
        navigate("/admin/room/add");
    }
    return (
        <div style={{display:"flex",height:"100vh",gap:"2vw"}}>
            <ANavBar/>
            <div style={{marginTop:"10vh"}}>
            <div style={{marginBottom:"5vh"}}>
                <EditBtn color={"green"} text={"Thêm mới"} hoverColor={"rgb(2, 82, 2)"} func={handleAdd}/>
            </div>
            <StaticTable title={"Danh sách phòng"} 
                col={["Mã phòng", "Loại Phòng", "Hình Ảnh", "Số Người", "Diện tích (m2)", "Tiện ích","Giá Phòng (VNĐ)","Số phòng trống","Cập nhật","Xoá"]}
                data={data.map(item=>({
                    ...item,
                    giaPhong: new Intl.NumberFormat('vi-VN').format(item.giaPhong),
                    update: (
                        <EditBtn text={"Sửa"} color={"rgb(67, 106, 233)"} hoverColor={"rgb(32, 79, 233)"} func={()=>handleUpdate(item)}/>
                    ),
                    del:(
                        <EditBtn text={"Xoá"} color={"red"} hoverColor={"rgb(82, 3, 3)"} func={()=>confirmDel(item)}/>
                    )
                }))}
                maxWidth="200vw" />
            </div>

        </div>
    )
}

export default Room