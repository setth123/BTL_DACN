function DisplayDanhGia({ ratings }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0,padding: "12px 16px",backgroundColor: "#fff",}}>
      {ratings.map((r, index) => (
        <li key={index} style={{ display: "flex", alignItems: "flex-start", borderBottom: "1px solid #ddd", padding: "16px 0", gap: "16px" }}>
          <div style={{ width: 80, textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#ccc", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
              👤
            </div>
            <div style={{ fontWeight: "bold", fontSize: 14 }}>{r.tenDangNhap}</div>
          </div>

          <div style={{ flex: 1 , marginLeft: "20px"}}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ backgroundColor: "#e6f0ff", color: "#006ce4", fontWeight: "bold", padding: "4px 8px", borderRadius: 16, display: "flex", alignItems: "center", gap: 4, fontSize: 14 }}>
                ⭐ {r.soDiem?.toFixed(1)}/5
              </div>
            </div>

            <p style={{ fontSize: 14, color: "#333", marginBottom: 8 }}>{r.noiDungDanhGia}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0071c2", fontSize: 13, cursor: "pointer" }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}>
              👍
              <span>Đánh giá này hữu ích không?</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DisplayDanhGia;