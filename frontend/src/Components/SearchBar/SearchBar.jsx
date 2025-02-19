import { useState } from "react"
import "./SearchBar.css"
import search from "../../../assets/search.svg";
const SearchBar = () => {
    const [location,setLocation]=useState("");
    const [checkIn,setCheckIn]=useState(new Date());
    const [checkOut,setCheckOut]=useState(new Date());
    const locations=["Hà Nội", "Đà Nẵng","TP Hồ Chí Minh","Huế","Quảng Ninh", "Ninh Bình"];
    return (
        <div id="container">
            <div id="location" className="search-box">
                <h3>Địa điểm</h3>
                <select onChange={(e) => setLocation(e.target.value)} >
                    <option value="" disabled>Chọn địa điểm</option>
                    {locations.map((loc)=>(
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

        <div id="time" className="search-box">
            <h3>Thời gian</h3>
            <div className="inp">
            <input type="datetime-local" />
            <span> - </span>
            <input type="datetime-local" />
            </div>
        </div>

        <div id="guest" className="search-box">
            <h3>Số người</h3>
            <input type="number" min="1" />
        </div>

        <button className="search-box search-button">
            <img src={search} alt="search" />
        </button>
    </div>
    )
}
export default SearchBar