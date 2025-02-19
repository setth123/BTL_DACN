import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import KhuyenMai from './Pages/KhuyenMai/KhuyenMai';
import MyDC from './Pages/MyDC/MyDC';
import DatPhong from './Pages/DatPhong/HoaDon/DatPhong';
import DPTC from './Pages/DatPhong/DPTC/DPTC';

const App=()=>{
  return(
    <>
      <Router>
      <NavBar user={true}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/khuyenMai" element={<KhuyenMai/>}/>
          <Route path="/mydc" element={<MyDC/>}/>
          <Route path="/datPhong" element={<DatPhong/>}/>
          <Route path="/dptc" element={<DPTC/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
