import "./HomePage.css";
import StaticNum from "../../../Components/StatticNum/StaticNum";
import StaticTable from "../../../Components/StaticTable/StaticTable";
import ANavBar from "../../../Components/ANavBar/ANavBar";
const AHomePage = () => {
    const data=[
        {"ABC":1,"XYZ":2,"MNP":3},
        {"ABC":2,"XYZ":4,"MNP":6},
        {"ABC":3,"XYZ":5,"MNP":7}
    ]
    return (
        <div id="adminHome">
            <ANavBar/>
            <div>
                <div style={{display:"flex",gap:"5vw"}}>
                    <StaticNum icon={"./Assets/user-blue.svg"} number={30} description={"Người đã đăng ký"}/>
                    <StaticNum icon={"./Assets/warning.svg"}number={30} description={"abc"}/>
                    <StaticNum icon={"./Assets/user-blue.svg"} number={30} description={"abc"}/>
                    <StaticNum icon={"./Assets/user-blue.svg"} number={30} description={"abc"}/>
                </div>
                <div id="tableBox">
                    <div style={{display:"flex",gap:"5vw",marginBottom:"5vh"}}>
                        <StaticTable title={"Số người dùng"} col={["ABC","XYZ","MNP"]} data={data}/>
                        <StaticTable title={"Số người dùng"} col={["ABC","XYZ","MNP"]} data={data}/>
                    </div>
                    <div style={{display:"flex",gap:"5vw",marginBottom:"5vh"}}>
                        <StaticTable title={"Số người dùng"} col={["ABC","XYZ","MNP"]} data={data}/>
                        <StaticTable title={"Số người dùng"} col={["ABC","XYZ","MNP"]} data={data}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AHomePage;