import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import PostTitle from "./PostTitle";
import CommentsContainer from "./CommentsContainer";
import { useState } from "react";

const SinglePost = () => {
    const [showComment,setShowComment] = useState(false);
    return (
        <div className="each-posts">
            <div className="profile-pic">
                <div className="profile-icon">
                    <img className="profile-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="logo" />
                </div>
                <div className="profile-info">
                    <span className="profile-name">Anand Raj</span>
                    <span className="post-time">5 mins ago</span>
                </div>
                <div className="option">
                    <BsThreeDotsVertical className="three-dots" />
                </div>
            </div>

            <PostTitle title={"Learning New Things Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, modi? Unde illum consequatur tenetur, incidunt dolore magni ratione quam obcaecati"} />

            <div className="post-info-container">
                <div className="post-image-contaienr">
                    <img className="post-img" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="" />
                </div>
                <div className="post-like-share-container">
                    <div className="like-comment-container">
                        <FaRegHeart className="like-logo" />
                        <span className="likes">400</span>
                        <LuMessageSquare className="comment-logo" onClick={() => setShowComment(!showComment)} />
                        <span className="comments">300</span>
                    </div>
                    <div className="share-container">
                        <span className="share">Share<IoIosShareAlt className="share-logo" /></span>
                    </div>
                </div>
            </div>
            <CommentsContainer showComment={showComment} />
        </div>
    )
}
export default SinglePost;