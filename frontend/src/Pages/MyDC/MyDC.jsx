import "./MyDC.css";
import {useQuery} from "@tanstack/react-query"
const MyDC = () => {
    const fetchData=async()=>{
        try{
            const res=await fetch("http://localhost:8080/api/hoa-don/");
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            const data=await res.json();
            return data;
        }
        catch(err){
            console.log("Error while fetching: ",err);
        }
    }
    const isKM=true;
    const {data,error,isLoading}=useQuery({
        queryKey:["ndMyDC"],
        queryFn:fetchData
    })
    const handleDel=async(e)=>{
        e.preventDefault();
        var isDel=confirm("Are you sure you want to delete");
        if(isDel){
            try{
                const res=await fetch(`http://localhost:8080/hoa-don/${''}/${''}`)
                alert("Xoá thành công");
            }
            catch(err){
                console.log("Error while fetching: ",err);
            }
        }
    }
    if(isLoading) return <p>Loading...</p>
    if(error)return <p>Error while fetching: {error.message}</p>
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