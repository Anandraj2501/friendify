import { useState } from "react";
import "./Register.css";
import Login from "./Login";
import Signup from "./Signup";
const Authentication = () => {
    const [haveAccount, setHaveAccount] = useState(true);
    return (
        <div className="authentication-body">
            <div className="auth-body-left-container">
                {haveAccount ?
                    (
                        <div className="greet">
                            <span className="hello">Hello !</span>
                            <span className="greet-child2">Don't have an account</span>
                            <button className="register-button" onClick={()=>setHaveAccount(!haveAccount)}>Create an account</button>
                        </div>
                    ) :
                    (
                        <div className="greet">
                            <span className="hello">Hello !</span>
                            <span className="greet-child2">Already have an account</span>
                            <button className="register-button login-button" onClick={()=>setHaveAccount(!haveAccount)}>Login</button>
                        </div>
                    )
                }
            </div>
            <div className="auth-body-right-container">
                {
                    haveAccount?
                    (
                        <Login/>
                    ):
                    (
                        <Signup/>
                    )
                }
            </div>
        </div>
    )
}

export default Authentication;