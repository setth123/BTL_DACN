import './editBtn.css'
const EditBtn = ({text,color,hoverColor}) => {
    return (
        <button id="updateBtn" style={{backgroundColor:color}}
            onMouseEnter={(e)=>{e.target.style.backgroundColor=hoverColor}}
            onMouseLeave={(e)=>{e.target.style.backgroundColor=color}}
        >{text}</button>
    )
}

export default EditBtn;