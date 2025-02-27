import './StaticTable.css';

const StaticTable = ({title,data=[],col=[],maxHeight="30vh",maxWidth="35vw"}) => {
    return (
        <div id="StaticTable">
            <h1>{title}</h1>
            <div id="staticTableContainer" style={{marginBottom:"1vh",overflowY:"auto",maxHeight:maxHeight,overflowX:"auto",maxWidth:maxWidth}}>
                <table >
                    <tr>
                        {col.map((item,index)=>(
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                {data.map((item,index)=>(
                    <tr key={index}>
                        {Object.keys(item).map((key)=>(
                            <td key={key}>{item[key]}</td>
                        ))}
                    </tr>
                ))}
                </table>
            </div>
        </div>
    )
}

export default StaticTable