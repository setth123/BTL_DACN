import './HomePage.css'
const HomePage = () => {
    const ksData=[
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"},
        {hinhAnh:"",tenKhachSan:"KhachSan1",diemSoTB:"7.5"}
    ]
    return (
        <div id="voucher">
            <div style={{display:"flex"}}>
                <h1>Khuyến mãi mới</h1>
                <a href="/khuyenmai">Xem thêm &#8594;</a>
            </div>
            <div id="kmBoxs">
                <div>
                    <img src="/assets/khuyenmai.webp" alt="km"/>
                    <p style={{fontWeight:"bold"}}>KhuyenMai1</p>
                    <p>Thoi gian khuyen mai</p>
                    <p></p>
                </div>
                <div>
                    <img src="/assets/khuyenmai.webp" alt="km"/>
                    <p style={{fontWeight:"bold"}}>KhuyenMai1</p>
                    <p>Thoi gian khuyen mai</p>
                    <p></p>
                </div>
                <div>
                    <img src="/assets/khuyenmai.webp" alt="km"/>
                    <p style={{fontWeight:"bold"}}>KhuyenMai1</p>
                    <p>Thoi gian khuyen mai</p>
                    <p></p>
                </div>
                <div>
                    <img src="/assets/khuyenmai.webp" alt="km"/>
                    <p style={{fontWeight:"bold"}}>KhuyenMai1</p>
                    <p>Thoi gian khuyen mai</p>
                    <p></p>
                </div>
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