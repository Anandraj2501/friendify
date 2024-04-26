import "./Main.css";
import { GoHome } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../utils/useLogout";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const {logout} = useLogout();
    const {userId} = useSelector(state => state.userDetails);

    // Function to handle click on link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="LeftSideBar-Container">
            <div className="LeftBar-wrapper">
                <div className="Links-Container">
                    <Link to="/"> <div onClick={() => handleLinkClick("home")}><GoHome className={activeLink === "home" ? "active-link" : "inactive-link"} /></div></Link>
                    <Link to="/schedulePost"> <div onClick={() => handleLinkClick("calendar")}><IoCalendarOutline className={activeLink === "calendar" ? "active-link" : "inactive-link"} /></div></Link>
                    <div onClick={() => handleLinkClick("mail")}><IoMailOutline className={activeLink === "mail" ? "active-link" : "inactive-link"} /></div>
                    <Link to={`/userprofile/${userId}`}><div onClick={() => handleLinkClick("profile")}><CgProfile className={activeLink === "profile" ? "active-link" : "inactive-link"} /></div></Link>
                </div>
                <div className="Logout-Container" onClick={() => handleLinkClick("logout")}>
                    <LuLogOut className={activeLink === "logout" ? "active-link" : "inactive-link"} onClick={logout}/>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;