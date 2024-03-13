import { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import PostsContainer from "./PostsContainer";

import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const MainContainer = () => {
    const token = useSelector((state) => state.auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token) {
            navigate("/login"); 
        }
    },[token,navigate])
   

    return (
        <div className="main-container">
            <LeftSidebar />
            <PostsContainer />
        </div>
    ); 
    
}
export default MainContainer;