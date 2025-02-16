import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import KhuyenMai from './Pages/KhuyenMai/KhuyenMai';
import MyDC from './Pages/MyDC/MyDC';

const App=()=>{
  return(
    <>
      <Router>
      <NavBar user={true}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/khuyenMai" element={<KhuyenMai/>}/>
          <Route path="/mydc" element={<MyDC/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
