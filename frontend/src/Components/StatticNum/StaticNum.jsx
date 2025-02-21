import './StaticNum.css'

const StaticNum = ({icon,number,description}) => {
    return (
        <div id="staticsNum">
            <h1><span><img src={icon} alt="icon" /></span>{number}</h1>
            <p>{description}</p>
        </div>
    )
}

export default StaticNum