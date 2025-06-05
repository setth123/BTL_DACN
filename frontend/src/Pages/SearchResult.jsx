import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar/SearchBar.jsx";

const SearchResult = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const diaChi = searchParams.get("location");
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
        const soNguoi = searchParams.get("guests");

        const formatDate = (dateString) => dateString?.split("T")[0];
        const params = new URLSearchParams({
          diaChi,
          soNguoi,
          ngayNhanPhong: formatDate(checkIn),
          ngayTraPhong: formatDate(checkOut),
        });

        const res = await fetch(`http://localhost:8080/api/hotels/search?${params.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const hotelData = await res.json();

        // Với mỗi khách sạn, gọi POST /api/rooms/by-ids để lấy thông tin phòng
        const hotelsWithPrices = await Promise.all(
          hotelData.map(async (hotel) => {
              const roomIds = hotel.roomIds || [];
            if (roomIds.length === 0) {
              return { ...hotel, giaThapNhat: null };
            }

            const resRooms = await fetch("http://localhost:8080/api/phong/getlistroom", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(roomIds),
            });

            if (!resRooms.ok) throw new Error("Failed to fetch rooms");

            const rooms = await resRooms.json();
            console.log(rooms);
            const prices = rooms.map((room) => room.giaPhong).filter(Boolean);
            const giaThapNhat = prices.length > 0 ? Math.min(...prices) : null;

            return { ...hotel, giaThapNhat };
          })
        );

        setHotels(hotelsWithPrices);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách khách sạn.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ width: "60%", margin: "auto" }}>
        <h5 style={{ marginTop: "40px" }}>
          Kết quả tìm kiếm cho khu vực {searchParams.get("location")}
        </h5>
        {hotels.length === 0 ? (
          <div>Không tìm thấy khách sạn phù hợp.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {hotels.map((hotel, index) => (
              <li
                key={hotel.maKhachSan || index}
                style={{
                  display: "flex",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={hotel.hinhAnh || "https://via.placeholder.com/160x120?text=No+Image"}
                  alt={hotel.tenKhachSan}
                  style={{
                    width: 160,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginRight: 16,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{hotel.tenKhachSan}</h3>
                  <div style={{ color: "#555", marginBottom: 4 }}>
                    📍 {hotel.diaChi}
                  </div>
                  <div style={{ color: "#007BFF", fontWeight: "bold" }}>
                    ⭐ {hotel.diemSoTB || "Chưa có đánh giá"}
                  </div>
                  <div style={{ marginTop: 4, color: "green" }}>
                    💰 Giá thấp nhất:{" "}
                    {hotel.giaThapNhat !== null
                      ? hotel.giaThapNhat.toLocaleString() + "₫"
                      : "Không có phòng"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
