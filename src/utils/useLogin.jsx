import { useState } from "react";
import  axios  from "axios";
import { BACKENDURL } from "./BACKENDURL";
import {useDispatch} from "react-redux";
import { addData } from "./userProfileSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [LoginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const signIn = async(formData) => {
        console.log(formData);
        try {
            setLoading(true);
            const response = await axios.post(`${BACKENDURL}/signin`, formData,{
                headers:{
                    "Content-type":"application/json"
                }
            });
            if(response.status===200){
                setLoading(false);
                console.log(response)
                dispatch(addData(response.data));
                localStorage.setItem("userData",JSON.stringify(response.data));
                navigate("/");
                return response.data.token;
            }

        } catch (error) {
            console.log("galat pass");
            setLoading(false);
            setLoginError(error.response.data.error);
            throw error.response.data.error;
        }

    }
    return{signIn,LoginError,loading}

}

export default useLogin;