import axios from "axios";
import { BACKENDURL } from "./BACKENDURL";


const getUsers = async (searchText,token) => {
    if(searchText===""){
        return;
    }
    
    try {
        const users = await axios.get(`${BACKENDURL}/searchusers?searchParam=${searchText}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        
        return users.data;
    }catch(error){
    }
}

export default getUsers;