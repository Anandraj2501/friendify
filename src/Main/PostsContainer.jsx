import "./Main.css"
import { IoIosSearch } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { GoDeviceCameraVideo } from "react-icons/go";
import SinglePost from "./SinglePost";
import { useContext, useEffect } from "react";
import { ModalContext } from "../utils/Context";
import PostModal from "./PostModal";
import StoryContainer from "./StoryContainer";

const PostsContainer = () => {
    const { showModal, setShowModal } = useContext(ModalContext);
    console.log(showModal);


    useEffect(() => {

        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

    }, [showModal]);


    return (
        <>
            <div className="Posts-Container">
                <div className="search-bar">
                    <IoIosSearch className="Search-icon" />
                    <input type="text" placeholder="Search...." className="search-input" />
                </div>

                <StoryContainer/>

                <div className="create-new-post-container" >
                    <div className="new-post-wrapper">
                        <div className="profile-pic">
                            <div className="profile-icon">
                                <img className="profile-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />
                            </div>
                            <span className="post-write" onClick={() => setShowModal(true)}>What are you Thinking...</span>
                        </div>
                        <div className="multiple-inputs">
                            <div className="cameras-container">
                                <CiCamera className="camera" onClick={() => setShowModal(true)}/>
                                <GoDeviceCameraVideo className="camera" onClick={() => setShowModal(true)}/>
                            </div>
                            <div className="share-button">
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
                <SinglePost />


            </div>
            {showModal &&
                <PostModal />}

        </>
    )
}

export default PostsContainer;