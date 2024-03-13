import { useState } from "react";
import { BACKENDURL } from "./BACKENDURL";
import  axios  from "axios";

const useSignup = () =>{
    const [loading,setLoading] = useState(false);
    const [signUpError,setSignUperror] = useState(null);

    const signup = async(formData)=>{
        setLoading(true);
        try {
            const response = await axios.post(`${BACKENDURL}/signup`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(response.status===201){
                setLoading(false);
                return true;
            }
            
        }catch(error){
            setLoading(false);
            setSignUperror(error.response.data.error);
            throw error.response.data.error;
        }
    }
    return {signup,loading,signUpError};
}

export default useSignup;