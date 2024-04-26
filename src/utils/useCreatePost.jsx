import { useState } from "react"
import axios from "axios";
import { BACKENDURL } from "./BACKENDURL";
import { useSelector } from "react-redux";

const useCreatePost = () => {
    const {token} = useSelector(state=>state.userDetails);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (data) => {
        try {
            for (var [key, value] of data.entries()) {
                console.log(key, value);
            }
            setLoading(true);
            const response = await axios.post(`${BACKENDURL}/createpost`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
            }
            })
        setLoading(false);
        return true;
    } catch (error) {
        setLoading(false);
        setError(error.response.data.error);
        throw error.response.data.error;
    }
}
return { loading, error, createPost };
}

export default useCreatePost;