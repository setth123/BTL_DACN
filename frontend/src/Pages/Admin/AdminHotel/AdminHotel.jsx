import ANavBar from "../../../Components/ANavBar/ANavBar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";    

function AdminHotel() {
    const [hotelId, setHotelId] = useState(null);
    const [formData, setFormData] = useState({
        tenKhachSan: "",
        diemSoTB: 0,
        diaChiCT: "",
        thongTinGT: "",
        tienIch: "",
        hinhAnh: ""
    });
    
    const accessTokenData = JSON.parse(localStorage.getItem("accessToken"));
    const accessToken = accessTokenData?.token;
    
    const { data: hotels, isLoading, error, refetch } = useQuery({
        queryKey: ["hotels"],
        queryFn: async () => {
            const res = await fetch('http://localhost:8080/api/khach-san');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = hotelId ? "PUT" : "POST";
        const url = hotelId
            ? `http://localhost:8080/api/khach-san/edit/${hotelId}`
            : `http://localhost:8080/api/khach-san/add`;

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });

        setFormData({
            tenKhachSan: "",
            diaChiCT: "",
            thongTinGT: "",
            tienIch: "",
            hinhAnh: "",
            diemSoTB: 0,
        });
        setHotelId(null);
        await refetch();
        alert(hotelId ? "Cập nhật khách sạn thành công!" : "Thêm khách sạn thành công!");
    };

    const handleEdit = (hotel) => {
        setHotelId(hotel.maKhachSan);
        setFormData({
            tenKhachSan: hotel.tenKhachSan,
            diaChiCT: hotel.diaChiCT,
            thongTinGT: hotel.thongTinGT,
            tienIch: hotel.tienIch,
            hinhAnh: hotel.hinhAnh,
            diemSoTB: hotel.diemSoTB || 0,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách sạn này không?")) {
            await fetch(`http://localhost:8080/api/khach-san/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            await refetch();
            alert("Xóa khách sạn thành công!");
        }
    };



    if (isLoading) return <div>Đang tải danh sách khách sạn...</div>;
    if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu!</div>;

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <div style={{ width: "250px" }}>
                <ANavBar />
            </div>

            <div style={{ flex: 1, padding: "20px" }}>
                <h1 style={{ textAlign: "center", color: "#1976D2" }}>
                    Quản lý khách sạn
                </h1>

                <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="text" name="tenKhachSan" value={formData.tenKhachSan} onChange={handleInputChange} placeholder="Tên khách sạn" required/>
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="text" name="diaChiCT" value={formData.diaChiCT} onChange={handleInputChange} placeholder="Địa chỉ" required
                        />
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="text" name="thongTinGT" value={formData.thongTinGT} onChange={handleInputChange} placeholder="Giới thiệu"
                        />
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="text" name="tienIch" value={formData.tienIch} onChange={handleInputChange} placeholder="Tiện ích"
                        />
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="text" name="hinhAnh" value={formData.hinhAnh} onChange={handleInputChange} placeholder="URL hình ảnh"
                        />
                        <input style={{padding: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
                            type="number" name="diemSoTB" value={formData.diemSoTB} onChange={handleInputChange} placeholder="Điểm số"
                            min="0"
                            max="10"
                            step={0.1} required
                        />
                    </div>
                    <button type="submit" style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#1976D2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        {hotelId ? "Cập nhật khách sạn" : "Thêm khách sạn"}
                    </button>
                </form>

                <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 8px #0001", border: "1px solid #0001" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#E3F0FB", color: "#1976D5" }}>
                            <th style={{ paddingTop: "10px", paddingBottom: "10px" }}>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Điểm</th>
                            <th>Địa chỉ</th>
                            <th>Giới thiệu</th>
                            <th>Tiện ích</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.sort((a,b) => {
                            return b.maKhachSan.localeCompare(a.maKhachSan);
                        }).map((hotel) => (
                            <tr key={hotel.maKhachSan} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                                <td>
                                    <img
                                        src={hotel.hinhAnh}
                                        alt={hotel.tenKhachSan}
                                        style={{ width: "100px", height: "70px", objectFit: "cover" }}
                                    />
                                </td>
                                <td>{hotel.tenKhachSan}</td>
                                <td>{hotel.diemSoTB}</td>
                                <td>{hotel.diaChiCT}</td>
                                <td>{hotel.thongTinGT}</td>
                                <td>{hotel.tienIch}</td>
                                <td>
                                    <button
                                        style={{ marginRight: "10px", backgroundColor: "#1976D2", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                        onClick={() => handleEdit(hotel)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        style={{ marginRight: "10px", marginTop: "2px",backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                        onClick={() => handleDelete(hotel.maKhachSan)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHotel;