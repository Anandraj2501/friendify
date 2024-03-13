import { useEffect, useState } from "react";
import useValidation from "../utils/useValidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSignup from "../utils/useSignup";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const { error, validateEmail, validatePassword } = useValidation();
    const { signup, loading, signUpError } = useSignup();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.name, e.target.value);

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "email") {
            validateEmail(value);
        }
        if (name === "password") {
            validatePassword(value);
        }
    }


    const handleSignUp = async () => {
        if(error.email || error.password || formData.name===""){
            return;
        }
        try {
            const response = await signup(formData);
            toast.success("User Created Successfully");
            navigate("/")
            console.log(signUpError);

        } catch (error) {
            
        }
    }
    useEffect(() => {
        if (signUpError) {
            toast.error(signUpError);
        }
    }, [signUpError]);


    return (
        <div className="auth-container Login">
            <div className="auth-wrapper">
                <span className="auth-greet">
                    Create New Account!
                </span>
                <span className="auth-greet2">
                    Sign in to continue
                </span>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className="labels">Name</div>
                    <input type="text" placeholder="Name" name="name" value={formData.name} className="name-container text-container" onChange={(e) => handleChange(e)} required />

                    <div className="labels">Email</div>
                    <input type="text" placeholder="user@mail.com" name="email" value={formData.email} className="email-container text-container" onChange={(e) => handleChange(e)} required />
                    {error.email && <div className="error">{error.email}</div>}

                    <div className="labels">Password</div>
                    <input type="password" placeholder="password@123" name="password" value={formData.password} className="password-container text-container" onChange={(e) => handleChange(e)} required />
                    {error.password && <div className="error">{error.password}</div>}

                    <button className="auth-button" onClick={handleSignUp}>{loading ? <span>loading... </span> : <span>Sign up</span>}</button>
                </form>

            </div>
            <ToastContainer />
        </div>
    )
}
export default Signup;