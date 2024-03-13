import React, { useState } from 'react'

const useValidation = () => {
    const [error,setError] = useState({});
    const validateEmail = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setError(prevError=>({
                ...prevError,
                email:"Invalid email format"
            }))
            // return false
        }
        else{
            setError(prevError=>({
                ...prevError,
                email:""
            }))
            // return true
        }
    }

    const validatePassword = (password)=>{
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passwordPattern.test(password)){
            setError(prevError=>({
                ...prevError,
                password:"Password format is incorrect"
            }))
            // return false
        }
        else{
            setError(prevError=>({
                ...prevError,
                password:""
            }))
            // return true
        }
    }

    return{
        error,
        validateEmail,
        validatePassword
    }
}

export default useValidation;
