import axios from "axios";
import { BACKENDURL } from "./BACKENDURL";

const handleunlike = async(postId,setIsLiked,token,setLikesCount) => {
    console.log(postId,token);
    try{
        const response = await axios.put(`${BACKENDURL}/unlikepost`,{postId},{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response);
        if(response.status===200){
            setIsLiked(false);
            setLikesCount(prevCount => prevCount-1);
        }
    }catch(error){
        console.log(error);
        setIsLiked(true);
    }
}

export default handleunlike
