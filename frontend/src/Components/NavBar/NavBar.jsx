import './NavBar.css'

const NavBar = () => {
    return (
        <div style={{display:"flex",marginTop:'10px',marginLeft:'30px'}}>
            {/* logo */}
            <div id="logo" style={{fontFamily:'Tahoma',color:'Red',fontSize:'45px',fontWeight:'bold'}}>
                Travel
            </div>
            {/* pages nav */}
            <div id="nav" style={{display:'flex'}}>
                <li><a href="#">Khuyen mai</a></li>
                <li><a href="#">Dat cho cua toi</a></li>
                <li><a href="#">Dang ky</a></li>
            </div>
            {/* login or username */}
            <button style={{backgroundColor:'blue',color:'white',fontSize:'20px',fontWeight:'bold',textAlign:'center'}}>
                Dang nhap
            </button>
        </div>
    )
}

export default NavBar