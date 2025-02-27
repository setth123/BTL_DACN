import "./HomePage.css";
import StaticNum from "../../../Components/StatticNum/StaticNum";
import StaticTable from "../../../Components/StaticTable/StaticTable";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error API: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (e) {
        console.error("Error while fetching:", e);
        throw e;
    }
};
const AHomePage = () => {
    const { data: hotelData, error: errorHT, isLoading: isLoadingHT } = useQuery({
        queryKey: ["adminHotels"],
        queryFn: () => fetchData("http://localhost:8080/api/khach-san/")
    });

    const { data: kmData, error: errorKM, isLoading: isLoadingKM } = useQuery({
        queryKey: ["adminKMs"],
        queryFn: () => fetchData("http://localhost:8080/api/khuyen-mai/")
    });

    const { data: roomData, error: errorRoom, isLoading: isLoadingRoom } = useQuery({
        queryKey: ["adminAllRooms"],
        queryFn: () => fetchData("http://localhost:8080/api/phong/")
    });

    const { data: ndData, error: errorNd, isLoading: isLoadingNd } = useQuery({
        queryKey: ["adminNDs"],
        queryFn: () => fetchData("http://localhost:8080/api/nguoi-dung/")
    });

    if (isLoadingHT || isLoadingKM || isLoadingRoom || isLoadingNd) {
        return <p>Loading...</p>;
    }

    if (errorHT || errorKM || errorRoom || errorNd) {
        return <p>Error while fetching data. Please try again.</p>;
    }
    return (
        <div id="adminHome">
            <ANavBar/>
            <div >
                <div style={{display:"flex",gap:"5vw"}}>
                    <StaticNum icon={"./Assets/user-blue.svg"} number={ndData.length} description={"Số người dùng"}/>
                    <StaticNum icon={"./Assets/hotel.svg"}number={hotelData.length} description={"Số khách sạn"}/>
                    <StaticNum icon={"./Assets/room.svg"} number={roomData.length} description={"Số phòng"}/>
                    <StaticNum icon={"./Assets/voucher.svg"} number={kmData.length} description={"Số khuyến mãi"}/>
                </div>
                <div id="tableBox">
                    <div style={{display:"flex",gap:"5vw",marginBottom:"2vh"}}>
                        <StaticTable title={"Số người dùng"} col={["Mã người dùng","Tên đăng nhập","Email","Số điện thoại"]} data={ndData}/>
                        <StaticTable title={"Số phòng"} col={["Mã phòng","Loại phòng","Hình ảnh","Số người","Diện tích","Tiện ích","Giá phòng","Số phòng trống"]} data={roomData}/>
                    </div>
                    <div style={{display:"flex",gap:"5vw",marginBottom:"5vh"}}>
                        <StaticTable title={"Số khách sạn"} col={["Mã khách sạn","Tên khách sạn","Hình ảnh","Điểm số trung bình","Địa chị chi tiết","Thông tin giới thiệu","Tiện ích"]} data={hotelData}/>
                        <StaticTable title={"Số khuyến mãi"} col={["Mã khuyến mãi","Ngày bắt đầu","Ngày kết thúc","Mức khuyến mãi","Giao dịch tối thiểu"]} data={kmData}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AHomePage;