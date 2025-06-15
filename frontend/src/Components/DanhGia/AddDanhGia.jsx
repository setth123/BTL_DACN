import { useState } from "react";

function AddDanhGia({ maKhachSan, onAddSuccess }) {
    const [noiDung, setNoiDung] = useState("");
    const [diem, setDiem] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const accessTokenData = JSON.parse(localStorage.getItem("accessToken"));
        const accessToken = accessTokenData?.token;
        const maNguoiDung = accessTokenData?.claims?.maNguoiDung;

        if (!accessToken) {
            setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
            setIsSubmitting(false);
            return;
        }

        const res = await fetch(`http://localhost:8080/api/danhgia/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                maKhachSan,
                maNguoiDung,
                noiDungDanhGia: noiDung,
                soDiem: diem,
            }),
        });

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(`Lỗi ${res.status}: ${msg}`);
        }

        setNoiDung("");
        setDiem(5);
        onAddSuccess();
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{padding: "12px 16px",backgroundColor: "#fff",margin: "auto",boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",fontFamily: "Arial, sans-serif",maxWidth: "95%",}}>
            <textarea
                value={noiDung}
                onChange={(e) => setNoiDung(e.target.value)}
                placeholder="Viết cảm nhận của bạn về khách sạn..."
                required
                rows={3}
                style={{width: "98%",padding: "10px",borderRadius: "6px",border: "1px solid #ccc",resize: "vertical",fontSize: "14px",marginBottom: "12px",fontFamily:'inherit',fontSize:'inherit'}}
            />

            <div
                style={{display: "flex",alignItems: "center",gap: "12px",marginBottom: "12px",
                }}
            >
                <label htmlFor="diem" style={{ fontWeight: "500" }}>
                    Điểm đánh giá:
                </label>
                <select id="diem" value={diem} onChange={(e) => setDiem(Number(e.target.value))}
                    style={{padding: "6px 10px",borderRadius: "6px",border: "1px solid #ccc",fontSize: "14px",}}
                >
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                            {n} ⭐
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                style={{backgroundColor: "#006ce4",color: "#fff",border: "none",padding: "8px 16px",borderRadius: "6px",cursor: "pointer",fontSize: "14px",fontWeight: "bold",transition: "background-color 0.2s ease",
                }}
            >
                {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>

            {error && (
                <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
                    {error}
                </p>
            )}
        </form>
    );
}

export default AddDanhGia;
