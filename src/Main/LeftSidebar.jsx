import "./Main.css";
import { GoHome } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";

const LeftSidebar = () => {
    const [activeLink, setActiveLink] = useState("home");

    // Function to handle click on link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="LeftSideBar-Container">
            <div className="LeftBar-wrapper">
                <div className="Links-Container">
                    <div onClick={() => handleLinkClick("home")}><GoHome className={activeLink === "home" ? "active-link" : "inactive-link"}/></div>
                    <div onClick={() => handleLinkClick("calendar")}><IoCalendarOutline className={activeLink === "calendar" ? "active-link" : "inactive-link"}/></div>
                    <div onClick={() => handleLinkClick("mail")}><IoMailOutline className={activeLink === "mail" ? "active-link" : "inactive-link"}/></div>
                    <div onClick={() => handleLinkClick("profile")}><CgProfile className={activeLink === "profile" ? "active-link" : "inactive-link"}/></div>
                </div>
                <div className="Logout-Container" onClick={() => handleLinkClick("logout")}>
                <LuLogOut className={activeLink === "logout" ? "active-link" : "inactive-link"}/>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;