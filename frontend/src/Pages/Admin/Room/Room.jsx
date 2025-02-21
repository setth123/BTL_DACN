import StaticTable from "../../../Components/StaticTable/StaticTable";
import ANavBar from "../../../Components/ANavBar/ANavBar";
import "./Room.css";
import EditBtn from "../../../Components/editBtn/editBtn";
const Room = () => {

    const confirmDel=(e)=>{
        e.preventDefault();
        var cDel=confirm("Bạn có chắc chắn muốn xoá phòng này");
        if(cDel)alert("Xoá thành công");
    }

    const delBtn=<EditBtn text={"Xoá"} color={"red"} hoverColor={"rgb(82, 3, 3)"} func={confirmDel}/>
    const updateBtn=<EditBtn text={"Sửa"} color={"rgb(67, 106, 233)"} hoverColor={"rgb(32, 79, 233)"}/>;
    const data=[
        {maPhong:"P01",loaiPhong:"Luxury",hinhAnh:"abc",soNguoi:3,dienTich:5.2,tienIch:"xyz",giaPhong:1000000,soPhongTrong:2,update:updateBtn,del:delBtn},
        {maPhong:"P01",loaiPhong:"Luxury",hinhAnh:"abc",soNguoi:3,dienTich:5.2,tienIch:"xyz",giaPhong:1000000,soPhongTrong:2,update:updateBtn,del:delBtn},
        {maPhong:"P01",loaiPhong:"Luxury",hinhAnh:"abc",soNguoi:3,dienTich:5.2,tienIch:"xyz",giaPhong:1000000,soPhongTrong:2,update:updateBtn,del:delBtn},
        {maPhong:"P01",loaiPhong:"Luxury",hinhAnh:"abc",soNguoi:3,dienTich:5.2,tienIch:"xyz",giaPhong:1000000,soPhongTrong:2,update:updateBtn,del:delBtn},
        {maPhong:"P01",loaiPhong:"Luxury",hinhAnh:"abc",soNguoi:3,dienTich:5.2,tienIch:"xyz",giaPhong:1000000,soPhongTrong:2,update:updateBtn,del:delBtn}
    ]

    return (
        <div style={{display:"flex",height:"100vh",gap:"2vw"}}>
            <ANavBar/>
            <div style={{marginTop:"10vh"}}>
            <div style={{marginBottom:"5vh"}}>
                <EditBtn color={"green"} text={"Thêm mới"} hoverColor={"rgb(2, 82, 2)"}/>
            </div>
            <StaticTable title={"Danh sách phòng"} 
                col={["Mã phòng", "Loại Phòng", "Hình Ảnh", "Số Người", "Diện tích (m2)", "Tiện ích","Giá Phòng (VNĐ)","Số phòng trống","Cập nhật","Xoá"]}
                data={data.map(item=>({
                    ...item,
                    giaPhong: new Intl.NumberFormat('vi-VN').format(item.giaPhong)
                }))}
                maxWidth="200vw" />
            </div>

        </div>
    )
}

export default Room