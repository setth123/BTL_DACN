import './editBtn.css'
const EditBtn = ({text,color,hoverColor,func,fontSize="large"}) => {
    return (
        <button id="updateBtn" style={{backgroundColor:color,fontSize:fontSize}}
            onMouseEnter={(e)=>{e.target.style.backgroundColor=hoverColor}}
            onMouseLeave={(e)=>{e.target.style.backgroundColor=color}}
            onClick={func}>
                {text}
            </button>
    )
}

export default EditBtn;