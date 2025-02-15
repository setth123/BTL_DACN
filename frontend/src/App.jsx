import './App.css'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import KhuyenMai from './Pages/KhuyenMai/KhuyenMai';

const App=()=>{
  return(
    <>
      <Router>
      <NavBar user={true}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/khuyenMai" element={<KhuyenMai/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
