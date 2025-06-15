import DisplayDanhGia from "./DisplayDanhGia.jsx";
import AddDanhGia from "./AddDanhGia.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function DanhGia({ maKhachSan }) {
    const queryClient = useQueryClient();
    const accessToken = localStorage.getItem("accessToken");
    const {
        data: danhgias = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["danhgias", maKhachSan],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8080/api/danhgia/khachsan/${maKhachSan}`);
            if (!res.ok) throw new Error(`Error API: ${res.status} ${res.statusText}`);
            return res.json();
        },
        enabled: !!maKhachSan,
    });

    const refetchDanhGia = () => {
        queryClient.invalidateQueries(["danhgias", maKhachSan]);
    };

    return (
        <div>
            <h2>Đánh giá</h2>
            {accessToken && (
                <AddDanhGia maKhachSan={maKhachSan} onAddSuccess={refetchDanhGia} />
            )}


            {isLoading ? (
                <p>Đang tải đánh giá...</p>
            ) : error ? (
                <p>Đã xảy ra lỗi khi tải đánh giá.</p>
            ) : (
                <DisplayDanhGia ratings={danhgias} />
            )}
        </div>
    );
}

export default DanhGia;
