
import './KhuyenMai.css'
const KhuyenMai = () => {
    const kmData=[
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024",mucKhuyenMai:50,giaoDichToiThieu:5000000}
    ]
    //const reverse=
    return (
        <div>
            <h2 >Khuyến mãi mới nhất</h2>
            <div id="kmBoxs">
                {
                    kmData.map((item,index)=>(
                        <div key={index} id='km'>
                            <img src="/assets/khuyenmai.webp" alt="km"/>
                            <div style={{fontWeight:"bold",fontSize:25}}>{item.maKhuyenMai}</div>
                            <div style={{display:"flex",gap:"1vw"}}>
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p style={{fontWeight:"bold"}}>{item.thoiGian}</p>
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
   
            <h2>Khuyến mãi sắp hết hạn</h2>
            <div id="kmBoxs">
                {
                    kmData.map((item,index)=>(
                        <div key={index} id='km'>
                            <img src="/assets/khuyenmai.webp" alt="km"/>
                            <div style={{fontWeight:"bold",fontSize:25}}>{item.maKhuyenMai}</div>
                            <div style={{display:"flex",gap:"1vw"}}>
                                <div>
                                    <p>Thời gian khuyến mãi</p>
                                    <p style={{fontWeight:"bold"}}>{item.thoiGian}</p>
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