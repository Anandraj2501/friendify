import axios from "axios";
import { BACKENDURL } from "./BACKENDURL";

const handleLike = async(postId,setIsLiked,token,setLikesCount)=>{
    console.log(postId,token);
    try{
        const response = await axios.put(`${BACKENDURL}/likepost`,{postId},{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response);
        if(response.status===200){
            setIsLiked(true);
            setLikesCount(prevCount => prevCount+1);
        }
    }catch(error){
        console.log(error);
        setIsLiked(false);
    }
}

export default handleLike;