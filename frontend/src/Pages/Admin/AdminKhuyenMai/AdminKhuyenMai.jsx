import { useEffect, useState } from "react";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import "./AdminKhuyenMai.css";

const AdminKhuyenMai = () => {
    const token = JSON.parse(localStorage.getItem('accessToken'))?.token;
    const admin = token ? token.claims : null;
    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        maKhuyenMai: "",
        ngayBD: "",
        ngayKT: "",
        mucKhuyenMai: "",
        giaoDichToiThieu: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (admin === null) {
            alert("Vui lòng đăng nhập");
            window.location.href = "/admin/login";
        } else {
            fetchList();
        }
    }, []);

    const fetchList = async () => {
        const res = await fetch("http://localhost:8080/api/khuyen-mai/");
        const data = await res.json();
        setList(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isEdit) {
                // Sửa khuyến mãi
                res = await fetch(`http://localhost:8080/api/khuyen-mai/${form.maKhuyenMai}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(form),
                });
                if (res.ok) {
                    alert("Cập nhật khuyến mãi thành công!");
                } else {
                    alert("Cập nhật thất bại!");
                }
            } else {
                // Thêm mới khuyến mãi
                res = await fetch("http://localhost:8080/api/khuyen-mai/addKM", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(form),
                });
                if (res.ok) {
                    alert("Thêm khuyến mãi thành công!");
                } else {
                    alert("Thêm khuyến mãi thất bại!");
                }
            }
            setForm({
                maKhuyenMai: "",
                ngayBD: "",
                ngayKT: "",
                mucKhuyenMai: "",
                giaoDichToiThieu: "",
            });
            setIsEdit(false);
            fetchList();
        } catch (error) {
            alert("Có lỗi xảy ra khi gửi dữ liệu!");
        }
    };

    const handleDelete = async (maKhuyenMai) => {
        if (window.confirm("Bạn chắc chắn muốn xóa?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/khuyen-mai/${maKhuyenMai}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    alert("Xóa khuyến mãi thành công!");
                    fetchList();
                } else {
                    alert("Xóa khuyến mãi thất bại!");
                }
            } catch (error) {
                alert("Có lỗi xảy ra khi xóa!");
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (isEdit) {
    //         // Sửa khuyến mãi
    //         await fetch(`http://localhost:8080/api/khuyen-mai/${form.maKhuyenMai}`, {
    //             method: "PUT",
    //             body: JSON.stringify(form),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //     } else {
    //         // Thêm mới khuyến mãi
    //         await fetch("http://localhost:8080/api/khuyen-mai/addKM", {
    //             method: "POST",
    //             body: JSON.stringify(form),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //     }
    //     setForm({
    //         maKhuyenMai: "",
    //         ngayBD: "",
    //         ngayKT: "",
    //         mucKhuyenMai: "",
    //         giaoDichToiThieu: "",
    //     });
    //     setIsEdit(false);
    //     fetchList();
    // };

    // const handleEdit = (km) => {
    //     setForm({
    //         maKhuyenMai: km.maKhuyenMai,
    //         ngayBD: km.ngayBD,
    //         ngayKT: km.ngayKT,
    //         mucKhuyenMai: km.mucKhuyenMai,
    //         giaoDichToiThieu: km.giaoDichToiThieu,
    //     });
    //     setIsEdit(true);
    // };

    // const handleDelete = async (maKhuyenMai) => {
    //     if (window.confirm("Bạn chắc chắn muốn xóa?")) {
    //         await fetch(`http://localhost:8080/api/khuyen-mai/${maKhuyenMai}`, { 
    //             method: "DELETE" , 
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //          });
    //         fetchList();
    //     }
    // };
    
    const handleEdit = (km) => {
        setForm({
            maKhuyenMai: km.maKhuyenMai,
            ngayBD: km.ngayBD ? km.ngayBD.toString() : "",
            ngayKT: km.ngayKT ? km.ngayKT.toString() : "",
            mucKhuyenMai: km.mucKhuyenMai,
            giaoDichToiThieu: km.giaoDichToiThieu,
        });
        setIsEdit(true);
    };

    return (
        <div id="adminKhuyenMai">
            <ANavBar />
            <div className="admin-km-container">
                <h2>Quản lý khuyến mãi</h2>
                <form className="admin-km-form" onSubmit={handleSubmit}>
                    <input
                        name="maKhuyenMai"
                        placeholder="Mã khuyến mãi"
                        value={form.maKhuyenMai}
                        onChange={handleChange}
                        required
                        disabled={isEdit}
                    />
                    <input
                        name="ngayBD"
                        type="date"
                        placeholder="Ngày bắt đầu"
                        value={form.ngayBD}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="ngayKT"
                        type="date"
                        placeholder="Ngày kết thúc"
                        value={form.ngayKT}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="mucKhuyenMai"
                        type="number"
                        placeholder="Mức khuyến mãi (%)"
                        value={form.mucKhuyenMai}
                        onChange={handleChange}
                        min={1}
                        max={100}
                        required
                    />
                    <input
                        name="giaoDichToiThieu"
                        type="number"
                        placeholder="Giao dịch tối thiểu (VNĐ)"
                        value={form.giaoDichToiThieu}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                    <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
                    {isEdit && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEdit(false);
                                setForm({
                                    maKhuyenMai: "",
                                    ngayBD: "",
                                    ngayKT: "",
                                    mucKhuyenMai: "",
                                    giaoDichToiThieu: "",
                                });
                            }}
                        >
                            Hủy
                        </button>
                    )}
                </form>
                <table className="admin-km-table">
                    <thead>
                        <tr>
                            <th>Mã KM</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Mức khuyến mãi (%)</th>
                            <th>Giao dịch tối thiểu (VNĐ)</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((km) => (
                            <tr key={km.maKhuyenMai}>
                                <td>{km.maKhuyenMai}</td>
                                <td>{km.ngayBD}</td>
                                <td>{km.ngayKT}</td>
                                <td>{km.mucKhuyenMai}%</td>
                                <td>{km.giaoDichToiThieu?.toLocaleString("vi-VN")}</td>
                                <td>
                                    <button onClick={() => handleEdit(km)}>Sửa</button>
                                    <button onClick={() => handleDelete(km.maKhuyenMai)} style={{ marginLeft: 8, color: "red" }}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminKhuyenMai;