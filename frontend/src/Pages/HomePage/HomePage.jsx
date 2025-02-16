import './HomePage.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
const HomePage = () => {
    const ksData=[
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"}
    ]
    const kmData=[
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024"},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024"},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024"},
        {maKhuyenMai:"0123525",thoiGian:"20-12-2024 to 22-12-2024"}
    ]
    return (
        <div id="home">
            <SearchBar/>
            <div style={{display:"flex"}}>
                <h1>Khuyến mãi mới</h1>
                <a href="/khuyenmai">Xem thêm &#8594;</a>
            </div>
            <div id="kmBoxs">
                {
                    kmData.map((item,index)=>(
                        <div key={index}>
                            <img src="/assets/khuyenmai.webp" alt="km"/>
                            <p style={{fontWeight:"bold"}}>{item.maKhuyenMai}</p>
                            <p>Thời gian khuyến mãi</p>
                            <p style={{fontWeight:"bold"}}>{item.thoiGian}</p>
                        </div>
                    ))
                }
            </div>
            <div id="hotel">
                <h1>Khách sạn nổi bật</h1>
                <div id="htBoxs">
                    {
                        ksData.map((item,index)=>(
                            <div key={index} id="ht">
                                <img src={item.hinhAnh} alt="khachsan" />
                                <p style={{fontWeight:"bold"}}>{item.tenKhachSan}</p>
                                <p>Điểm số trung bình</p>
                                <p style={{fontWeight:"bold"}}>{item.diemSoTB}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage