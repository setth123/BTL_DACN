import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import KhuyenMai from './Pages/KhuyenMai/KhuyenMai';
import MyDC from './Pages/MyDC/MyDC';
import DatPhong from './Pages/DatPhong/HoaDon/DatPhong';
import DPTC from './Pages/DatPhong/DPTC/DPTC';
import AHomePage from './Pages/Admin/HomePage/HomePage';
import Room from './Pages/Admin/Room/Room';
import RoomForm from './Components/RoomForm/RoomForm';
import HotelDetail from './Pages/HotelDetail/HotelDetail';
import SearchResult from './Pages/SearchResult/SearchResult';
import AuthForm from './Components/AuthForm/AuthForm';
import AdminKhuyenMai from './Pages/Admin/AdminKhuyenMai/AdminKhuyenMai';
import { useEffect } from 'react';
import { checkAndRemoveExpiredToken } from './helper/auth';

const App=()=>{
  useEffect(()=>{
    checkAndRemoveExpiredToken();
  },[])
  const location=useLocation();
  const hide=location.pathname.startsWith("/admin")||location.pathname.startsWith("/login")||location.pathname.startsWith("/register");
  return(
    <>
      {!hide &&<NavBar user={true}/>}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/hotel/:hotelId" element={<HotelDetail/>}/>
        <Route path="/khuyenMai" element={<KhuyenMai/>}/>
        <Route path="/mydc" element={<MyDC/>}/>
        <Route path="/datPhong/:phongID" element={<DatPhong/>}/>
        <Route path="/dptc/:hoaDonID" element={<DPTC/>}/>
        <Route path="/search-result" element={<SearchResult/>}/>
        <Route path="/admin/khuyenMai" element={<AdminKhuyenMai/>}/>
        <Route path="/admin" element={<AHomePage/>}/>
        <Route path="/admin/login" element={<AuthForm isLogin={true} isUser={false}/>}/>
        <Route path="/register" element={<AuthForm isLogin={false} isUser={true}/>}/>
        <Route path="/login" element={<AuthForm isLogin={true} isUser={true}/>}/>
        <Route path="/admin/hotel/:hotelId/room" element={<Room/>}/>
        <Route path="/admin/hotel/:hotelId/room/add" element={<RoomForm title={"Thêm phòng mới"} btn={"Thêm"}/>}/>
        <Route path="/admin/hotel/:hotelId/room/update/:roomId" element={<RoomForm title={"Cập nhật thông tin phòng"} btn={"Lưu"} type='t2'/>}/>
      </Routes>
    </>
  )
}

export default App
