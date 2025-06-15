import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import search from "../../../assets/search.svg";

const SearchBar = ({ddiaChi,dcheckIn,dcheckOut,dsoNguoi}) => {

  const [location, setLocation] = useState(ddiaChi);
  const [checkIn, setCheckIn] = useState(dcheckIn);
  const [checkOut, setCheckOut] = useState(dcheckOut);
  const [guests, setGuests] = useState(Number(dsoNguoi));

  const navigate = useNavigate();
  const locations = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
    "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
    "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
    "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
    "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
    "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
    "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
    "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
    "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
    "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  const locationOptions = locations.map(loc => ({
    value: loc,
    label: loc
  }));

  return (
    <div id="container">
      <div className="search-box">
        <h4>Địa điểm</h4>
        <Select
          options={locationOptions}
          value={locationOptions.find(option => option.value === location)} 
          placeholder="Chọn địa điểm"
          onChange={(selected) => setLocation(selected.value)}
          menuPortalTarget={document.body}
          maxMenuHeight={200}
          styles={{
            control: (base, state) => ({
              ...base,
              minHeight: '25px',
              height: '25px',
              fontSize: '12px',
              borderRadius: '12px',
              borderColor: state.isFocused ? '#007bff' : '#ccc',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#007bff'
              }
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '0 8px'
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '25px'
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: '4px'
            }),
            menu: (base) => ({
              ...base,
              maxHeight: 200,
              overflowY: 'auto',
              zIndex: 9999
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            })
          }}
        />
      </div>

      <div className="search-box">
        <h4>Thời gian</h4>
        <div className="inp">
          <input type="datetime-local" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          <span> - </span>
          <input type="datetime-local" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
      </div>

      <div className="search-box">
        <h4>Số người</h4>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <button
        className="search-box search-button"
        onClick={() => {
          localStorage.setItem("checkIn", checkIn);
          localStorage.setItem("checkOut", checkOut);
          const params = new URLSearchParams({
            location,
            checkIn,
            checkOut,
            guests
          }).toString();
          navigate(`/search-result?${params}`);
        }}
      >
        <img src={search} alt="search" />
      </button>
    </div>
  );
};

export default SearchBar;
