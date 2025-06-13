import { useEffect, useState } from "react";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import "./AdminKhuyenMai.css";

const AdminKhuyenMai = () => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const admin = token ? token.claims : null;
    const [list, setList] = useState([]);
    const [form, setForm] = useState({ ten: "", moTa: "", phanTram: "", id: null });
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
        // Gọi API lấy danh sách khuyến mãi
        const res = await fetch("http://localhost:8080/api/khuyenmai");
        const data = await res.json();
        setList(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            // Sửa khuyến mãi
            await fetch(`http://localhost:8080/api/khuyenmai/${form.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        } else {
            // Thêm mới khuyến mãi
            await fetch("http://localhost:8080/api/khuyenmai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        }
        setForm({ ten: "", moTa: "", phanTram: "", id: null });
        setIsEdit(false);
        fetchList();
    };

    const handleEdit = (km) => {
        setForm({ ten: km.ten, moTa: km.moTa, phanTram: km.phanTram, id: km.id });
        setIsEdit(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa?")) {
            await fetch(`http://localhost:8080/api/khuyenmai/${id}`, { method: "DELETE" });
            fetchList();
        }
    };

    return (
        <div id="adminKhuyenMai">
            <ANavBar />
            <div className="admin-km-container">
                <h2>Quản lý khuyến mãi</h2>
                <form className="admin-km-form" onSubmit={handleSubmit}>
                    <input
                        name="ten"
                        placeholder="Tên khuyến mãi"
                        value={form.ten}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="moTa"
                        placeholder="Mô tả"
                        value={form.moTa}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phanTram"
                        placeholder="Phần trăm giảm (%)"
                        type="number"
                        min={1}
                        max={100}
                        value={form.phanTram}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
                    {isEdit && (
                        <button type="button" onClick={() => { setIsEdit(false); setForm({ ten: "", moTa: "", phanTram: "", id: null }); }}>
                            Hủy
                        </button>
                    )}
                </form>
                <table className="admin-km-table">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Phần trăm giảm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((km) => (
                            <tr key={km.id}>
                                <td>{km.ten}</td>
                                <td>{km.moTa}</td>
                                <td>{km.phanTram}%</td>
                                <td>
                                    <button onClick={() => handleEdit(km)}>Sửa</button>
                                    <button onClick={() => handleDelete(km.id)} style={{ marginLeft: 8, color: "red" }}>Xóa</button>
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