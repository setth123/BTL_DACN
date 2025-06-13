import StaticTable from "../../../Components/StaticTable/StaticTable";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import "./Room.css";
import EditBtn from "../../../Components/editBtn/editBtn";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const Room = () => {
    const {hotelId}=useParams();
   const fetchData=async()=>{
        try{
            const res=await fetch(`http://localhost:8080/api/phong/${hotelId}`);
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            return res.json();
        }
        catch(err){
            console.log("Error while fetching: ",err);
        }
    }
    const navigate=useNavigate();
    const queryClient=useQueryClient();

    const {data,error,isLoading}=useQuery({
        queryKey:["adminRooms"],
        queryFn:fetchData,
    })
    if(isLoading) return <p>Loading...</p>
    if(error)return <p>Error while fetching: {error.message}</p>
    const confirmDel=async(row)=>{
        var cDel=confirm("Bạn có chắc chắn muốn xoá phòng này");
        if(cDel){
            try{
                const token=JSON.parse(localStorage.getItem('accessToken'))?.token;
                const res=await fetch(`http://localhost:8080/api/phong/${row.maPhong}`,{
                    method: "DELETE",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${token}`
                    },
                })
                if(!res.ok){
                    throw new Error(`Error API: ${res.status} ${res.statusText}`);
                }
                queryClient.setQueryData(["adminRooms"],(oldData)=>{
                    if(!oldData)return [];
                    return oldData.filter((item)=>item.maPhong!=row.maPhong);
                })
                alert("Xoá thành công");
            }
            catch(e){
                console.log("Error while fetching: ",e);
            }
        }
    }
    const handleUpdate=(row)=>{
        localStorage.setItem("adminCurRoom",JSON.stringify(row));
        navigate(`/admin/hotel/${hotelId}/room/update/${row.maPhong}`);
    }
    const handleAdd=()=>{
        navigate(`/admin/hotel/${hotelId}/room/add`);
    }
    return (
        <div style={{display:"flex",height:"100vh",gap:"1vw"}}>
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