import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDURL } from "../utils/BACKENDURL";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addData } from "../utils/userProfileSlice";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { token, userId } = useSelector(state => state.userDetails);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const getposts = async () => {
        const userId = id || userId;
        try {
            const data = await axios.get(`${BACKENDURL}/userProfile/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            setUserDetails(data.data.user)

            setData(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getposts();
    }, [])
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };
    const handleChange = async (e) => {
        setLoading(true);
        const form = new FormData();
        console.log(e.target.files[0]);

        form.append("image", e.target.files[0]);
        try {
            // Make API call to update profile picture
            const response = await axios.post(`${BACKENDURL}/changepic`, form, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const updatedLocalStorage = {
                    ...JSON.parse(localStorage.getItem("userData")),
                    profilePic: response.data.data
                };
                localStorage.setItem("userData", JSON.stringify(updatedLocalStorage));
                setLoading(false);
                console.log(response.data.data);
                toast.success("Profile Pic Updated");
                getposts();
            }
            // Optionally update local state or Redux state with new profile picture URL
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    return (
        <>
            <div className="userprofile-container">
                <div className="userprofile">
                    <div className="img-container" onMouseLeave={handleDropdownToggle}>
                        <img src={userDetails?.profilePic} alt="user-image" className="user-profile-image" onMouseEnter={handleDropdownToggle} />
                        {showDropdown && (
                            <div className="dropdown">
                                <button onClick={() => document.getElementById('imageInput').click()}>{loading ? <span>loading... </span> : <span>Change Profile Picture</span>}</button>
                                <input type="file" id="imageInput" name='image' style={{ display: 'none' }} onChange={(e) => handleChange(e)} accept="image/*" />
                            </div>
                        )}
                        <span className="username">{userDetails?.name}</span>
                    </div>
                    <div className="ff-container">
                        <span className="total-posts">{data?.length}<span> Posts</span></span>
                        <span className="friends">100 <span> Friends</span></span>
                    </div>
                </div>
                { data?.length>0 ?(
                    <div className="all-posts">
                        {
                            data.map((each) => (
                                <div className="posts" key={each._id}>
                                    <img className="upr-post-img" src={each.image} alt="post" />
                                </div>
                            ))
                    }

                    </div>):(<div>No posts</div>)
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default UserProfile;