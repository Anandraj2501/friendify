
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import useLogin from '../utils/useLogin';
import { useEffect, useState } from 'react';

const Login = ()=>{
    const {LoginError, loading,signIn} = useLogin();
    const navigate = useNavigate();


    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    
    const handleChange = (e) =>{
        const {name,value} = e.target;
        console.log(name,value);

        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    const handleLogin = async() =>{
        if(!formData.email||!formData.password){
            toast.error("Please provide all details");
            return;
        }
        try{
            const data = await signIn(formData);
            console.log(data,"user");
            // navigate("/");
        }catch(error){
            
        }
    }

    useEffect(() => {
        if (LoginError) {
            toast.error(LoginError);
        }
    }, [LoginError]);

    return (
        <div className="auth-container Login">
                <div className="auth-wrapper">
                    <span className="auth-greet">
                        Welcome Back!
                    </span>
                    <span className="auth-greet2">
                        Sign in to continue
                    </span>
                    <form className="form" onSubmit={(e)=>e.preventDefault()}>
                        <div className="labels">Email</div>
                        <input type="text" name='email' placeholder="user@mail.com" className="email-container text-container" onChange={(e)=>handleChange(e)}/>
                        <div className="labels">Password</div>
                        <input type="password" name='password' placeholder="password@123" className="password-container text-container" onChange={(e)=>handleChange(e)}/>
                        <button className="auth-button" onClick={handleLogin}>{loading ? <span>loading... </span> : <span>Sign In</span>}</button>
                    </form>

                </div>
                <ToastContainer/>
        </div>
    )
}
export default Login;