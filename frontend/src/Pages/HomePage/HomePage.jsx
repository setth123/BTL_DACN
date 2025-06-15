import './HomePage.css'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { useEffect, useState } from 'react'
import { dateConnect } from '../../helper/dtOutput'
import { toDatetimeLocalString } from '../../helper/dtOutput';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [htData, setHtData] = useState([]);
    const [vData, setVData] = useState([]);
    const navigate = useNavigate();
    //search default params
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ksResponse = (await fetch("http://localhost:8080/api/khach-san/most-rated"));
                const kmResponse = (await fetch("http://localhost:8080/api/khuyen-mai/userHome"));
                if (!ksResponse.ok || !kmResponse.ok) {
                    throw new Error(`Error API: ${ksResult.status} ${ksResult.statusText}`);
                }
                const ksResult = await ksResponse.json();
                const kmResult = await kmResponse.json();
                setHtData(ksResult)
                setVData(kmResult.map(item => ({
                    ...item,
                    thoiGian: dateConnect(item.ngayBD, item.ngayKT)
                })));
            }
            catch (err) {
                console.log("Error fetching", err);
                setHtData([]);
                setVData([]);
            }
        }
        fetchData();
    }, [])
    return (
        <div id="home">
            <SearchBar ddiaChi={"Hà Nội"} dcheckIn={toDatetimeLocalString(now)} dcheckOut={toDatetimeLocalString(tomorrow)} dsoNguoi={"1"} />
            <div style={{ maxWidth: "90%", margin: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3vh" }}>
                    <h4 style={{margin: "2vh 0 2vh 2vh" , whiteSpace: "nowrap", color: "#168FFE" }}>Khuyến mãi mới</h4>
                    <a href="/khuyenmai" style={{ textDecoration: "none", margin: 0, marginRight: "1vw", whiteSpace: "nowrap" }}>Xem thêm &#8594;</a>
                </div>
                <div id="kmBoxs">
                    {vData.map((item, index) => (
                        <div key={index}>
                            <img src="/assets/sales-promotion-poster.jpg" alt="km" />
                            <p>Mã KM: <span style={{ fontWeight: "bold" }}>{item.maKhuyenMai}</span></p>
                            <p>Thời gian khuyến mãi</p>
                            <p style={{ fontWeight: "bold" }}>{item.thoiGian}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: "90%", margin: "auto", marginTop: "6vh" }}>
                <h4 style={{ textAlign: "left", margin: "2vh 0 2vh 2vh", color: "#168FFE" }}>Khách sạn nổi bật</h4>
                <div id="htBoxs">
                    {htData.map((item, index) => (
                        <div key={index} id="ht" style={{ cursor: "pointer" }} onClick={() => {
                            navigate(`/hotel/${item.maKhachSan}`, { state: { id: item.maKhachSan } });
                        }}>
                            <img src={item.hinhAnh} alt="khachsan" />
                            <p style={{ fontWeight: "bold" }}>{item.tenKhachSan}</p>
                            <p>Điểm số trung bình</p>
                            <p style={{ fontWeight: "bold" }}>{item.diemSoTB}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomePage
