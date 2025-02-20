import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import KhuyenMai from './Pages/KhuyenMai/KhuyenMai';
import MyDC from './Pages/MyDC/MyDC';
import DatPhong from './Pages/DatPhong/HoaDon/DatPhong';
import DPTC from './Pages/DatPhong/DPTC/DPTC';
import AHomePage from './Pages/Admin/HomePage/HomePage';

const App=()=>{
  const location=useLocation();
  const hide=location.pathname.startsWith("/admin")||location.pathname.startsWith("/login")||location.pathname.startsWith("/register");
  return(
    <>
      {!hide && <NavBar user={true}/>}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/khuyenMai" element={<KhuyenMai/>}/>
        <Route path="/mydc" element={<MyDC/>}/>
        <Route path="/datPhong" element={<DatPhong/>}/>
        <Route path="/dptc" element={<DPTC/>}/>
        <Route path="/admin" element={<AHomePage/>}/>
      </Routes>
    </>
  )
}

export default App
