import { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import PostsContainer from "./PostsContainer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SchedulePostsContainer from "./SchedulePostsContainer";
import UserProfile from "./UserProfile";

const MainContainer = () => {
    // const token = useSelector((state) => state.auth);
    const {token} = useSelector(state=>state.userDetails);
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate])


    return (
        <div className="main-container">
            <LeftSidebar />
            <Routes>
                <Route path="/" element={<PostsContainer />} />
                <Route path="/schedulePost" element={<SchedulePostsContainer />} />
                <Route path="/userProfile/:id" element={<UserProfile />} />
            </Routes>
            {/* <HandGestureControl/> */}
        </div>
    );

}
export default MainContainer;