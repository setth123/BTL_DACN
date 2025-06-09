
import { useEffect, useState } from 'react'
import './KhuyenMai.css'
import { dateConnect, splitKMArr } from '../../utils/dtOutput';
import { useQuery } from '@tanstack/react-query';
const KhuyenMai = () => {
    const [oldKM,setOldKM]=useState([])
    const [newKM,setNewKM]=useState([])
    const getKM=async()=>{
        try{
            const res=await fetch("http://localhost:8080/api/khuyen-mai/")
            if(!res.ok){
                throw new Error(`Error API: ${res.status} ${res.statusText}`);
            }
            const data=await res.json();
            const {l,r}=splitKMArr(data);
            setOldKM(r);
            setNewKM(l);
            return data;
        }
        catch(e){
            console.log("Error while fetching: ",e);
        }
    }
    const {data,error,isLoading}=useQuery({
        queryKey:["ndKM"],
        queryFn:getKM
    })
    if(isLoading) return <p>Loading...</p>
    if(error)return <p>Error while fetching: {error.message}</p>
    return (
        <div>
            <h2 style={{marginBottom:"2vh",marginTop:"1vh"}}>Khuyến mãi mới nhất</h2>
            <div id="kmBoxs">
                {
                    newKM.map((item,index)=>(
                        <div key={index} id='km'>
                            <img src="/assets/sales-promotion-poster.jpg" alt="km"/>
                            <div style={{fontWeight:"bold",fontSize:25}}>{item.maKhuyenMai}</div>
                            <div style={{display:"flex",gap:"1vw"}}>
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p style={{fontWeight:"bold"}}>{dateConnect(item.ngayBD,item.ngayKT)}</p>
                                </div>
                                <div>
                                    <p>Giao dịch tối thiểu</p>
                                    <p style={{fontWeight:"bold"}}>{item.giaoDichToiThieu.toLocaleString("vi-VN")} VNĐ</p>
                                </div>
                            </div>
                            <div>Mức khuyến mãi: <span style={{fontWeight:"bolder",fontSize:20,color:"rgb(1, 34, 63)"}}>{item.mucKhuyenMai} %</span></div>
                        </div>
                    ))
                }
            </div>
   
            <h2 style={{marginBottom:"2vh"}}>Khuyến mãi sắp hết hạn</h2>
            <div id="kmBoxs">
                {
                    oldKM.map((item,index)=>(
                        <div key={index} id='km'>
                            <img src="/assets/sales-promotion-poster.jpg" alt="km"/>
                            <div style={{fontWeight:"bold",fontSize:25}}>{item.maKhuyenMai}</div>
                            <div style={{display:"flex",gap:"1vw"}}>
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p style={{fontWeight:"bold"}}>{dateConnect(item.ngayBD,item.ngayKT)}</p>
                                </div>
                                <div>
                                    <p>Giao dịch tối thiểu</p>
                                    <p style={{fontWeight:"bold"}}>{item.giaoDichToiThieu.toLocaleString("vi-VN")} VNĐ</p>
                                </div>
                            </div>
                            <div>Mức khuyến mãi: <span style={{fontWeight:"bolder",fontSize:20,color:"rgb(1, 34, 63)"}}>{item.mucKhuyenMai} %</span></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default KhuyenMai
