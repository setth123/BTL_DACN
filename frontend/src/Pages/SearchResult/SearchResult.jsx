import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";

const SearchResult = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [dateAndQuantity, setDQ] = useState([]);

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
        setDQ([formatDate(checkIn), formatDate(checkOut), soNguoi]);
        const params = new URLSearchParams({
          diaChi,
          soNguoi,
          ngayNhanPhong: formatDate(checkIn),
          ngayTraPhong: formatDate(checkOut),
        });

        const res = await fetch(`http://localhost:8080/api/hotels/search?${params.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const contentType = res.headers.get("content-type");
        let hotelData;

        if (contentType && contentType.includes("application/json")) {
          hotelData = await res.json();
        } else {
          // Nếu backend trả về chuỗi không phải JSON, coi như không có khách sạn
          setHotels([]);
          setLoading(false);
          return;
        }

        // Với mỗi khách sạn, gọi POST /api/rooms/by-ids để lấy thông tin phòng
        const hotelsWithPrices = await Promise.all(
          hotelData.map(async (hotel) => {
            console.log(hotel);
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

  const navigate = useNavigate();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <SearchBar/>
      <div style={{ width: "60%", margin: "auto" }}>
        <h5 style={{ marginTop: "40px" }}>
          Kết quả tìm kiếm cho khu vực {searchParams.get("location")}
        </h5>
        {hotels.length === 0 ? (
          <div>Không tìm thấy khách sạn phù hợp.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {hotels.map((hotel, index) => (
              console.log(hotel),
              <li
              onClick={() => navigate(`/hotel/${hotel.maKhachSan}`, { state: { dateAndQuantity , roomIds: hotel.roomIds, id: hotel.maKhachSan } })}
                key={hotel.maKhachSan || index}
                style={{
                  cursor: "pointer", 
                  display: "flex",
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  padding: 15,
                  marginBottom: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: "0 0 240px", marginRight: 32 }}>
                  <img
                    src={
                      hotel.hinhAnh
                    }
                    alt={hotel.tenKhachSan}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "left" }}>
                  <span style={{ margin: "0 0 16px 25px", padding: 0, fontSize: 20, color: "#333" }}>
                    <strong>{hotel.tenKhachSan}</strong>
                  </span>

                  <div style={{ color: "#666", marginBottom: 16 }}>
                    📌 <strong>Địa chỉ:</strong> {hotel.diaChi}
                  </div>

                  <div style={{ color: "#444", marginBottom: 16 }}>
                    ⭐ <strong>Điểm đánh giá:</strong> {hotel.diemSoTB} / 5
                  </div>

                  {hotel.tienIch.length > 0 && (
                    <div style={{ marginTop: 2 }}>
                      🧰 <strong>Tiện ích:</strong>{" "}
                      <span style={{ color: "#555" }}>
                        {hotel.tienIch}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ textAlign: "right", minWidth: 180 }}>
                  <div style={{ color: "green", fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>
                    💰{" "}
                    {hotel.giaThapNhat !== null
                      ? hotel.giaThapNhat.toLocaleString() + " VND / đêm"
                      : "Không có phòng"}
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    * Chưa bao gồm thuế và khuyến mãi
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
