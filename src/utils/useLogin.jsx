import { useState } from "react";
import  axios  from "axios";
import { BACKENDURL } from "./BACKENDURL";
import {useDispatch} from "react-redux";
import { addToken } from "./TokenSlice";

const useLogin = () => {
    const [LoginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    
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
                dispatch(addToken(response.data.token));
                localStorage.setItem("token",response.data.token);
                return response.data.token;
            }

        } catch (error) {
            setLoading(false);
            setLoginError(error.response.data.error);
            throw error.response.data.error;
        }

    }
    return{signIn,LoginError,loading}

}

export default useLogin;