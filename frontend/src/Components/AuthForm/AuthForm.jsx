import { useNavigate } from 'react-router-dom';
import './AuthForm.css'
import { useEffect } from 'react';
const AuthForm = ({isLogin=true,isUser=true}) => {
    const navigate=useNavigate();
    useEffect(()=>{
        if(isUser&& isLogin){
            if (!localStorage.getItem('accessToken')) return;
            const token=JSON.parse(localStorage.getItem('accessToken'));
            if(token){
                navigate("/");
            }
        }
        else if(!isUser && isLogin){
            if (!localStorage.getItem('adminToken')) return;
            const token=JSON.parse(localStorage.getItem('adminToken'));
            if(token)navigate("/admin");
        }
    },[])   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const validateEmail = (email) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
        const validatePhone = (phone) => /^(0|\+84)[0-9]{9}$/.test(phone);

        const account=e.target.account.value;
        const password = e.target.password.value;
        //exception
        let errors=[];
        if(!isLogin){
            const confirmPassword=e.target.confirmPassword.value;

            //exception
            if(password!==confirmPassword){
                errors.push("⚠️ Mật khẩu không khớp");
            }
            if(isUser){
                if (!validateEmail(account)) errors.push("⚠️ Email không hợp lệ.");
            }
            const phone=e.target.phone.value;
            if (!validatePhone(phone)) errors.push("⚠️ Số điện thoại không hợp lệ.");
            const accName=e.target.name.value;
            if(errors.length>0){
                alert(errors.join("\n"));
                return;
            }
            const authForm={tenDangNhap:accName,email:account,soDienThoai:phone,matKhau:password};
            //handling
            try{
                const res=await fetch("http://localhost:8080/api/auth/user/register",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(authForm)
                })
                if(!res.ok){
                    throw new Error(`Error API: ${res.status} ${res.statusText}`);
                }
                alert("Đăng ký thành công, hãy đăng nhập");
                navigate("/login");
            }
            catch(err){
                console.log("Error while fetching: ",err);
            }
        }
        else{
            //exception
            if(isUser){
                if (!validateEmail(account)) errors.push("⚠️ Email không hợp lệ.");
            }
            if(errors.length>0){
                alert(errors.join("\n"));
                return;
            }

            //handling
            const authForm={username:account,password:password};
            try{
                const res=await fetch(`http://localhost:8080/api/auth/${isUser?"user":"admin"}/login`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(authForm)
                })
                if(!res.ok){
                    throw new Error(`Error API: ${res.status} ${res.statusText}`);
                }
                const token=await res.json();
                if(isUser)localStorage.setItem("accessToken",JSON.stringify(token));
                else localStorage.setItem("adminToken",JSON.stringify(token));
                alert("Đăng nhập thành công");
                navigate(isUser?"/":"/admin/");
            }
            catch(err){
                console.log("Error while fetching: ",err);
            }
        }

    }
    return (
        <div id="auth-container">
            <div id="auth-form">
                <h2>
                    <span><img src="/assets/userAvatar.svg" alt="admin"/></span>
                    {isLogin?"Đăng nhập":"Đăng ký"} {!isUser?"(Quản trị viên)":""}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div id="auth-group">
                        <input type="text" name="account" placeholder={isUser?"Nhập email: ":"Nhập tên đăng nhập"} id="auth-field" required/>
                    </div>
                    <div id="auth-group">
                        <input type="password" name="password" placeholder="Nhập mật khẩu" id="auth-field" required/>
                    </div>
                    {!isLogin&&(
                        <>
                            <div id="auth-group">
                                <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" id="auth-field" required/>
                            </div>
                            <div id="auth-group">
                                <input type="text" name="name" placeholder="Nhập tên đăng nhập" id="auth-field" required/>
                            </div>
                            <div id="auth-group">
                                <input type="text" name="phone" placeholder="Nhập số điện thoại" id="auth-field" required/>
                            </div>
                        </>
                    )}
                    <button type="submit" id="auth-submit">
                        {isLogin?"Đăng nhập" : "Đăng ký"}
                    </button>
                </form>
                <p id="toggle-text">
                   {isUser&&((isLogin) ? "Chưa có tài khoản?" : "Đã có tài khoản?")}{" "}
                   {isUser&&(
                    <a href={isLogin?`/register`:`/login`}>{isLogin?"Đăng ký":"Đăng nhập"}</a>
                   )}
                </p>
            </div>
        </div>
    )
}

export default AuthForm
