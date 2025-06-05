//// filepath: frontend/src/Pages/HotelDetail/HotelDetail.jsx
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import './HotelDetail.css'; // Assuming you have a CSS file for styling

// const fetchHotel = async (id) => {
//     const res = await fetch(`http://localhost:8080/api/khach-san/${id}`);
//     // const res = await fetch(`http://localhost:8080/api/khach-san/KS45600000000002`);
//     if (!res.ok) throw new Error("Không tìm thấy khách sạn");
//     return res.json();
// };

const fetchHotel = async (id) => {
    const res = await fetch(`http://localhost:8080/api/khach-san/detail-Hotel/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy khách sạn");
    return res.json();
};

const HotelDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dqReceived = location.state?.dateAndQuantity || [];
    console.log("Received hotel data:", dqReceived);
    const { hotelId } = useParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ["hotelDetail", hotelId],
        queryFn: () => fetchHotel(hotelId),
        enabled: !!hotelId,
    });

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi khi tải dữ liệu khách sạn.</p>;

    console.log(data);

    return (
    <div>
        <h2>{data.tenKhachSan}</h2>
        <div className="hotel-detail-row">
            <img src="/assets/khuyenmai.webp" alt={data.tenKhachSan} />
            <div className="hotel-detail-info diaChiCT">
                <p>Địa chỉ: <span>{data.diaChiCT}</span></p>
            </div>
            <div className="hotel-detail-info diemSoTB">
                <p>Điểm số TB: <span>{data.diemSoTB}</span></p>
            </div>
            <div className="hotel-detail-info tienIch">
                <p>Tiện ích: <span>{data.tienIch}</span></p>
            </div>
        </div>
        <div className="hotel-detail-intro">
            Thông tin giới thiệu: {data.thongTinGT}
        </div>

        {/* Hiển thị danh sách phòng */}
        <h3>Danh sách phòng</h3>
        <div className="hotel-rooms-list">
            {data.phongs && data.phongs.length > 0 ? (
                data.phongs.map((phong) => (
                    <div className="hotel-room-item" key={phong.maPhong}>
                        <img
                            src={phong.hinhAnh}
                            alt={phong.loaiPhong}
                            style={{ width: 240, height: 160, objectFit: "cover", borderRadius: 8 }}
                        />
                        <div className="hotel-room-info">
                            <div className="room-info-col">
                                <p><strong>Loại phòng:</strong> {phong.loaiPhong}</p>
                                <p><strong>Số người:</strong> {phong.soNguoi}</p>
                            </div>
                            <div className="room-info-col">
                                <p><strong>Diện tích:</strong> {phong.dienTich} m²</p>
                                <p><strong>Tiện ích:</strong> {phong.tienIch}</p>
                            </div>
                            <div className="room-info-col">
                                <p><strong>Giá phòng:</strong> {phong.giaPhong.toLocaleString()} VNĐ</p>
                                <p><strong>Số phòng trống:</strong> {phong.soPhongTrong}</p>
                            </div>
                        </div>

                        <button
                            className="btn-dat-phong"
                            onClick={() => {
                                const ngayNhan = dqReceived ? dqReceived[0] : new Date().toISOString().slice(0, 10);
                                const ngayTra = dqReceived ? dqReceived[1] : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
                                const soNgay = Math.ceil(
                                (new Date(ngayTra) - new Date(ngayNhan)) / (1000 * 60 * 60 * 24));
                                const datPhongInfo = {
                                    makhachSan: data.maKhachSan,
                                    maPhong: phong.maPhong,
                                    tenKhachSan: data.tenKhachSan,
                                    hinhAnh: phong.hinhAnh,
                                    diaChiCT: data.diaChiCT,
                                    diemSoTB: data.diemSoTB,
                                    thongTinGT: data.thongTinGT,
                                    loaiPhong: phong.loaiPhong,
                                    tenPhong: phong.loaiPhong,
                                    tienNghi: phong.tienIch,
                                    soNguoi: dqReceived? +dqReceived[2] : 1,
                                    giaPhong: phong.giaPhong,
                                    ngayNhan: dqReceived? dqReceived[0] : new Date().toISOString().slice(0, 10),
                                    ngayTra: dqReceived? dqReceived[1] : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
                                    soNgay: soNgay,
                                };
                                // Chuyển trang
                                navigate(`/datPhong/${phong.maPhong}`, {state: { datPhongInfo }});
                            }}
                        >
                            Đặt phòng
                        </button>
                        
                    </div>
                ))
            ) : (
                <p>Chưa có thông tin phòng.</p>
            )}
        </div>

    </div>
);

};

export default HotelDetail;