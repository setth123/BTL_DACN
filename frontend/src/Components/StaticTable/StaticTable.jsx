import './StaticTable.css';

const StaticTable = ({ title, data = [], col = [], maxHeight = "50vh", maxRow = 5 }) => {
    return (
        <div className="static-table-wrapper">
            <h2 className="table-title">{title}</h2>
            <div className="static-table-container" style={{ maxHeight}}>
                <table>
                    <thead style={{ backgroundColor: "#E3F0FB", color: "#1976D2" }}>
                        <tr>
                            {col.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, maxRow).map((item, index) => (
                            <tr key={index}>
                                {Object.keys(item).map((key) => (
                                    <td key={key}>{item[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaticTable;